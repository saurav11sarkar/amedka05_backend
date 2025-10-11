import Agent from '../agent/agent.model';
import Contact from '../contact/contact.model';
import Creator from '../creator/creator.model';
import Trips from '../trips/trips.model';

const dashbordOverview = async () => {
  const creators = await Creator.find().countDocuments();
  const agent = await Agent.find().countDocuments();
  const contacts = await Contact.find().countDocuments();
  const trips = await Trips.find().countDocuments();

  return {
    creators,
    agent,
    contacts,
    trips,
  };
};

const activeCreatorsAgent = async (
  type: 'day' | 'week' | 'month' | 'year' = 'month',
) => {
  const pipelineCreator: any[] = [{ $match: { status: 'accepted' } }];
  const pipelineAgent: any[] = [{ $match: { status: 'accepted' } }];

  // --- Month Group ---
  if (type === 'month') {
    pipelineCreator.push({
      $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } },
    });
    pipelineAgent.push({
      $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } },
    });
  }

  // --- Day Group ---
  if (type === 'day') {
    pipelineCreator.push(
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    );
    pipelineAgent.push(
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    );
  }

  // --- Week Group ---
  if (type === 'week') {
    pipelineCreator.push({
      $group: { _id: { $dayOfWeek: '$createdAt' }, count: { $sum: 1 } },
    });
    pipelineAgent.push({
      $group: { _id: { $dayOfWeek: '$createdAt' }, count: { $sum: 1 } },
    });
  }

  // --- Year Group ---
  if (type === 'year') {
    pipelineCreator.push(
      { $group: { _id: { $year: '$createdAt' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    );
    pipelineAgent.push(
      { $group: { _id: { $year: '$createdAt' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    );
  }

  const [creatorsRaw, agentsRaw] = await Promise.all([
    Creator.aggregate(pipelineCreator),
    Agent.aggregate(pipelineAgent),
  ]);

  // --- Month Fix: Always 12 months ---
  if (type === 'month') {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const creators = months.map((m, i) => {
      const found = creatorsRaw.find((c) => c._id === i + 1);
      return { _id: i + 1, label: m, count: found ? found.count : 0 };
    });
    const agents = months.map((m, i) => {
      const found = agentsRaw.find((a) => a._id === i + 1);
      return { _id: i + 1, label: m, count: found ? found.count : 0 };
    });
    return { creators, agents };
  }

  // --- Week Fix: Always 7 days ---
  if (type === 'week') {
    const weekDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const creators = weekDays.map((d, i) => {
      const found = creatorsRaw.find((c) => c._id === i + 1); // Mongo dayOfWeek → Sunday=1
      return { _id: i + 1, label: d, count: found ? found.count : 0 };
    });
    const agents = weekDays.map((d, i) => {
      const found = agentsRaw.find((a) => a._id === i + 1);
      return { _id: i + 1, label: d, count: found ? found.count : 0 };
    });
    return { creators, agents };
  }

  // --- Year Fix: Always Last 5 years ---
  if (type === 'year') {
    const currentYear = new Date().getFullYear();
    const last5Years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

    const creators = last5Years.map((y) => {
      const found = creatorsRaw.find((c) => c._id === y);
      return { _id: y, label: String(y), count: found ? found.count : 0 };
    });
    const agents = last5Years.map((y) => {
      const found = agentsRaw.find((a) => a._id === y);
      return { _id: y, label: String(y), count: found ? found.count : 0 };
    });
    return { creators, agents };
  }

  return { creators: creatorsRaw, agents: agentsRaw };
};

const trips = async () => {
  const trips = await Trips.find();
  return trips;
};



const contactReport = async () => {
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  // Helper: month names
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Function to get yearly monthly trend
  const getYearlyTrend = async (year: number) => {
    const data = await Contact.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
    ]);

    // fill missing months with 0
    const monthlyReport = monthNames.map((name, index) => {
      const found = data.find((d) => d._id.month === index + 1);
      return {
        month: name,
        count: found ? found.count : 0,
      };
    });

    return monthlyReport;
  };

  // yearly totals
  const totalContacts = await Contact.countDocuments();
  const creatorCount = await Contact.countDocuments({
    selectOption: 'creator',
  });
  const agentCount = await Contact.countDocuments({ selectOption: 'agent' });

  const thisYearTrend = await getYearlyTrend(currentYear);
  const lastYearTrend = await getYearlyTrend(lastYear);

  return {
    summary: {
      totalContacts,
      creatorCount,
      agentCount,
    },
    thisYear: {
      year: currentYear,
      trend: thisYearTrend,
    },
    lastYear: {
      year: lastYear,
      trend: lastYearTrend,
    },
  };
};

export const dashboardService = {
  dashbordOverview,
  activeCreatorsAgent,
  trips,
  contactReport,
};

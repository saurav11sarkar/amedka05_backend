export interface IAgent {
  fullName: string;
  phoneNumber: string;
  email: string;
  country: string;
  designation?: string;
  brandName?: string;
  workingFrom?: string;
  status?: 'accepted' | 'rejected' | 'pending';
  image?: string;
}

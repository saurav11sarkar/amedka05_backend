export interface IContact {
  fullName: string;
  selectOption: 'creator' | 'agent';
  phoneNumber: string;
  email: string;
  message?: string;
}

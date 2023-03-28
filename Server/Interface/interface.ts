/** @format */

export interface Iuser {
  name: string;
  email: string;
  password: string;
  bloodGroup: string;
  genotype: string;
  accountNumber: number;
  history: {}[];
  wallet: {}[];
  appointment: {}[];

  // bookAppointment: {}[];
} // setting the Object Type for User

export interface IHistory {
  message: string;
  transactionRefrence: string;
  transactionType: string;
  time: string;
  amount: number;
  date: string;
} // setting the Object Type for History

export interface IWallet {
  ownerName: string;
  balance: number;
  credit: number;
  debit: number;
} // setting the Object Type for Wallet

export interface ISpecialist {
  name: string;
  email: string;
  password: string;
  profession: string;
  lience: string;
  accountNumber: number;
  history: {}[];
  wallet: {}[];
  appointment: {}[];
} // setting the Object Type for Specialist

export interface IHospital {
  name: string;
  email: string;

  password: string;
  accountNumber: number;
  history: {}[];
  wallet: {}[];
} // setting the Object Type for Specialist

export interface Iappointment {
  email: string;
  date: string;
  confirm: boolean;
  specialist: string;
  complaintBrief: string;
  specialistEmail: string;
} // setting the Object Type for Specialist

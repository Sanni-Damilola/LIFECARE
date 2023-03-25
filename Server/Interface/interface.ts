/** @format */

export interface Iuser {
  name: string;
  email: string;
  password: string;
  accountNumber: number;
  history: {}[];
  wallet: {}[];
} // setting the Object Type for User

export interface IHistory {
  message: string;
  transactionRefrence: string;
  transactionType: string;
  time: string;
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
  lience: boolean;
  accountNumber: number;
  history: {}[];
  wallet: {}[];
} // setting the Object Type for Specialist

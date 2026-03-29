
export type AppState = 'LOGIN' | 'SIGNUP' | 'FORGOT_PASSWORD' | 'ONBOARDING' | 'DASHBOARD' | 'SELLER_DASHBOARD' | 'ACTIVITY' | 'PROFILE' | 'TOPUP' | 'TOPUP_OFFLINE' | 'SCAN' | 'SCAN_ONLINE' | 'SUCCESS' | 'NOTIFICATIONS' | 'WALLET' | 'TRANSFER' | 'WITHDRAW' | 'OFFLINE_TOKENS' | 'SYNC_SCHEDULE' | 'DEVICE_MANAGEMENT' | 'CHANGE_PIN' | 'CONFIRM_PASSWORD' | 'PERSONAL_INFO' | 'HELP' | 'LIVE_SUPPORT' | 'TRANSACTION_DETAIL' | 'MONTHLY_REPORT' | 'SHOW_TOKEN' | 'TERMS' | 'PRIVACY' | 'MANAGE_ACCOUNTS';

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  isDefault?: boolean;
}

export interface Transaction {
  id: string;
  merchant: string;
  logo?: string;
  amount: number;
  date: string;
  time: string;
  type: 'PAYMENT' | 'TOPUP' | 'TRANSFER' | 'WITHDRAW';
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  password?: string;
  balance: number;
  offlineBalance: number;
  lastSynced: string;
  profileImage?: string;
  linkedAccounts: BankAccount[];
}

export interface UserDevice {
  id: string;
  model: string;
  lastUsed: string;
  isCurrent: boolean;
}


import React, { useState, useEffect, useCallback } from 'react';
import { AppState, UserProfile, Transaction } from './types';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import SellerDashboard from './pages/SellerDashboard';
import Activity from './pages/Activity';
import Profile from './pages/Profile';
import TopUp from './pages/TopUp';
import TopUpOffline from './pages/TopUpOffline';
import Wallet from './pages/Wallet';
import Transfer from './pages/Transfer';
import Withdraw from './pages/Withdraw';
import ScanOffline from './pages/ScanOffline';
import ScanOnline from './pages/ScanOnline';
import ShowToken from './pages/ShowToken';
import PaymentSuccess from './pages/PaymentSuccess';
import Notifications from './pages/Notifications';
import ConfirmPassword from './pages/ConfirmPassword';
import TransactionDetail from './pages/TransactionDetail';
import MonthlyReport from './pages/MonthlyReport';
import OfflineTokenSettings from './pages/OfflineTokenSettings';
import SyncSchedule from './pages/SyncSchedule';
import DeviceManagement from './pages/DeviceManagement';
import ChangePin from './pages/ChangePin';
import PersonalInfo from './pages/PersonalInfo';
import Help from './pages/Help';
import LiveSupport from './pages/LiveSupport';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ManageAccounts from './pages/ManageAccounts';

type AppRole = 'USER' | 'SELLER';

const App: React.FC = () => {
  // Safe LocalStorage Fetching
  const getSafeStorage = (key: string) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error(`Error parsing ${key}:`, e);
      return null;
    }
  };

  // Database & Session Management
  const [user, setUser] = useState<UserProfile | null>(() => getSafeStorage('qliq_session'));
  const [appRole, setAppRole] = useState<AppRole>(() => getSafeStorage('qliq_role') || 'USER');
  const [isOffline, setIsOffline] = useState<boolean>(() => getSafeStorage('qliq_offline_mode') || false);
  
  const [currentPage, setCurrentPage] = useState<AppState>(() => {
    const session = getSafeStorage('qliq_session');
    return session ? 'DASHBOARD' : 'LOGIN';
  });

  const [offlineSyncLimit, setOfflineSyncLimit] = useState(250000);
  const [syncSchedule, setSyncSchedule] = useState('Daily');
  const [pendingScanDestination, setPendingScanDestination] = useState<AppState | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [lastPayment, setLastPayment] = useState<any>(null);

  // Persistence Logic
  useEffect(() => {
    if (user) {
      localStorage.setItem('qliq_session', JSON.stringify(user));
      localStorage.setItem('qliq_role', JSON.stringify(appRole));
      localStorage.setItem('qliq_offline_mode', JSON.stringify(isOffline));
      
      const users: UserProfile[] = getSafeStorage('qliq_users') || [];
      const updatedUsers = users.map(u => (u.email === user.email || u.phone === user.phone) ? user : u);
      if (!users.find(u => u.email === user.email || u.phone === user.phone)) {
        updatedUsers.push(user);
      }
      localStorage.setItem('qliq_users', JSON.stringify(updatedUsers));
    } else {
      localStorage.removeItem('qliq_session');
    }
  }, [user, appRole, isOffline]);

  const handleLogin = (identifier: string, pass: string, rememberMe: boolean) => {
    const users: UserProfile[] = getSafeStorage('qliq_users') || [];
    const foundUser = users.find(u => (u.email === identifier || u.phone === identifier) && u.password === pass);
    
    if (foundUser) {
      setUser(foundUser);
      if (rememberMe) {
        localStorage.setItem('qliq_session', JSON.stringify(foundUser));
      }
      navigateTo('DASHBOARD');
      return true;
    }
    return false;
  };

  const handleSignUp = (newUser: UserProfile) => {
    const users: UserProfile[] = getSafeStorage('qliq_users') || [];
    if (users.find(u => u.email === newUser.email || u.phone === newUser.phone)) {
      return false; 
    }
    const userWithAccounts = {
      ...newUser,
      linkedAccounts: [
        { id: '1', bankName: 'BCA', accountNumber: '4821009982', accountHolder: newUser.name, isDefault: true }
      ]
    };
    const updatedUsers = [...users, userWithAccounts];
    localStorage.setItem('qliq_users', JSON.stringify(updatedUsers));
    setUser(userWithAccounts);
    navigateTo('ONBOARDING');
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem('qliq_session');
    setUser(null);
    setCurrentPage('LOGIN');
  };

  const navigateTo = useCallback((page: AppState) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const getHomePath = (): AppState => appRole === 'USER' ? 'DASHBOARD' : 'SELLER_DASHBOARD';

  const handleScanClick = () => {
    if (isOffline) {
      setPendingScanDestination(appRole === 'USER' ? 'SHOW_TOKEN' : 'SCAN');
    } else {
      setPendingScanDestination('SCAN_ONLINE');
    }
    navigateTo('CONFIRM_PASSWORD');
  };

  const handleConfirmPassword = () => {
    if (pendingScanDestination) {
      const destination = pendingScanDestination;
      setPendingScanDestination(null);
      navigateTo(destination);
    } else {
      navigateTo(getHomePath());
    }
  };

  const updateUserBalance = (updates: Partial<UserProfile>) => {
    setUser(prev => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });
  };

  const handleTransferToOffline = (amount: number) => {
    if (!user || isOffline) return;
    if (amount > user.balance) { alert("Saldo online tidak mencukupi."); return; }
    if (user.offlineBalance + amount > offlineSyncLimit) { alert("Top up melebihi batas saldo offline."); return; }

    const now = new Date();
    const timestamp = 'Hari Ini, ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    updateUserBalance({
      balance: user.balance - amount,
      offlineBalance: user.offlineBalance + amount,
      lastSynced: timestamp
    });

    setLastPayment({
      merchant: 'Top Up Token Offline',
      amount: amount,
      id: 'OFF-' + Date.now(),
      date: 'Hari Ini',
      time: 'Baru saja',
      type: 'TOPUP'
    });
    
    navigateTo('SUCCESS');
  };

  const handleSyncOffline = () => {
    if (!user || isOffline) return;
    const capacity = offlineSyncLimit - user.offlineBalance;
    if (capacity <= 0) { alert(`Saldo offline maksimal (Rp ${offlineSyncLimit.toLocaleString('id-ID')})`); return; }
    const amountToSync = Math.min(user.balance, capacity);
    if (amountToSync <= 0) { alert("Saldo online tidak mencukupi."); return; }

    const now = new Date();
    const timestamp = 'Hari Ini, ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    updateUserBalance({
      balance: user.balance - amountToSync,
      offlineBalance: user.offlineBalance + amountToSync,
      lastSynced: timestamp
    });

    return amountToSync;
  };

  const renderPage = () => {
    // Session Guard: Always check user except on auth pages
    const authPages: AppState[] = ['LOGIN', 'SIGNUP', 'FORGOT_PASSWORD', 'TERMS', 'PRIVACY'];
    if (!user && !authPages.includes(currentPage)) {
      return <Login onLogin={handleLogin} navigateTo={navigateTo} />;
    }

    switch (currentPage) {
      case 'LOGIN': return <Login onLogin={handleLogin} navigateTo={navigateTo} />;
      case 'SIGNUP': return <SignUp navigateTo={navigateTo} onSignUp={handleSignUp} />;
      case 'TERMS': return <TermsOfService navigateTo={navigateTo} />;
      case 'PRIVACY': return <PrivacyPolicy navigateTo={navigateTo} />;
      case 'FORGOT_PASSWORD': return <ForgotPassword navigateTo={navigateTo} />;
      case 'ONBOARDING': return <Onboarding onComplete={() => navigateTo(getHomePath())} />;
      case 'DASHBOARD': return user ? <Dashboard user={user} navigateTo={navigateTo} handleScanClick={handleScanClick} isOffline={isOffline} setIsOffline={setIsOffline} onSyncOffline={handleSyncOffline} onSwitchRole={setAppRole} /> : null;
      case 'SELLER_DASHBOARD': return user ? <SellerDashboard user={user} navigateTo={navigateTo} handleScanClick={handleScanClick} onSelectTransaction={(tx) => { setSelectedTransaction(tx); navigateTo('TRANSACTION_DETAIL'); }} onSwitchRole={setAppRole} /> : null;
      case 'ACTIVITY': return user ? <Activity user={user} navigateTo={navigateTo} handleScanClick={handleScanClick} appRole={appRole} onSelectTransaction={(tx) => { setSelectedTransaction(tx); navigateTo('TRANSACTION_DETAIL'); }} /> : null;
      case 'PROFILE': return user ? <Profile user={user} syncLimit={offlineSyncLimit} syncSchedule={syncSchedule} navigateTo={navigateTo} handleScanClick={handleScanClick} onLogout={handleLogout} onUpdateImage={(url) => updateUserBalance({ profileImage: url })} appRole={appRole} /> : null;
      case 'SUCCESS': return <PaymentSuccess details={lastPayment} navigateTo={navigateTo} returnTo={getHomePath()} />;
      case 'SCAN': return user ? <ScanOffline user={user} onComplete={() => {
          const amount = 150000;
          if (appRole === 'USER' && user.offlineBalance < amount) { alert('Saldo Token Offline tidak mencukupi!'); navigateTo(getHomePath()); return; }
          const newTx = { merchant: appRole === 'SELLER' ? 'Pendapatan Offline' : 'Pembayaran Merchant', amount: appRole === 'SELLER' ? amount : -amount, id: 'QLQ-OFF-' + Math.floor(Math.random() * 1000000), date: 'Hari Ini', time: 'Baru saja', type: 'PAYMENT' };
          if (appRole === 'USER') updateUserBalance({ offlineBalance: user.offlineBalance - amount });
          setLastPayment(newTx); navigateTo('SUCCESS');
        }} navigateTo={navigateTo} returnTo={getHomePath()} /> : null;
      case 'SCAN_ONLINE': return user ? <ScanOnline user={user} onComplete={(amt, merchant) => {
          if (appRole === 'USER' && user.balance < amt) { alert('Saldo Dompet tidak mencukupi!'); navigateTo(getHomePath()); return; }
          const newTx = { merchant: merchant || (appRole === 'SELLER' ? 'Pendapatan Online' : 'Kedai Kopi'), amount: appRole === 'SELLER' ? amt : -amt, id: 'QLQ-ON-' + Math.floor(Math.random() * 1000000), date: 'Hari Ini', time: 'Baru saja', type: 'PAYMENT' };
          if (appRole === 'USER') updateUserBalance({ balance: user.balance - amt });
          setLastPayment(newTx); navigateTo('SUCCESS');
        }} navigateTo={navigateTo} returnTo={getHomePath()} /> : null;
      case 'WALLET': return user ? <Wallet user={user} navigateTo={navigateTo} handleScanClick={handleScanClick} appRole={appRole} /> : null;
      case 'TOPUP': return <TopUp navigateTo={navigateTo} onConfirm={(amt) => { updateUserBalance({ balance: user!.balance + amt }); setLastPayment({amount: amt, merchant: 'Top Up Dompet', id: 'TOP-'+Date.now(), date: 'Hari Ini', time: 'Baru saja'}); navigateTo('SUCCESS'); }} />;
      case 'TOPUP_OFFLINE': return user ? <TopUpOffline user={user} syncLimit={offlineSyncLimit} navigateTo={navigateTo} onConfirm={handleTransferToOffline} /> : null;
      case 'CONFIRM_PASSWORD': return <ConfirmPassword onConfirm={handleConfirmPassword} onCancel={() => navigateTo(getHomePath())} />;
      case 'NOTIFICATIONS': return <Notifications navigateTo={navigateTo} returnTo={getHomePath()} appRole={appRole} />;
      case 'TRANSACTION_DETAIL': return selectedTransaction && user ? <TransactionDetail transaction={selectedTransaction} navigateTo={navigateTo} returnTo={getHomePath()} /> : null;
      case 'PERSONAL_INFO': return user ? <PersonalInfo user={user} navigateTo={navigateTo} onSave={(updated) => updateUserBalance(updated)} /> : null;
      case 'MANAGE_ACCOUNTS': return user ? <ManageAccounts user={user} navigateTo={navigateTo} onUpdateAccounts={(accounts) => updateUserBalance({ linkedAccounts: accounts })} /> : null;
      case 'SHOW_TOKEN': return user ? <ShowToken user={user} navigateTo={navigateTo} /> : null;
      default: return <Login onLogin={handleLogin} navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-slate-100 dark:bg-slate-900 font-sans text-black">
      <div className="w-full max-w-md bg-[#f8f9fb] dark:bg-background-dark shadow-2xl relative overflow-x-hidden min-h-screen">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;

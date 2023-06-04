import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Account} from '../interfaces/Account';
import {initialAccounts} from '../constants/initialAccounts';

interface AccountsContextValue {
  accounts: Account[];
  addAccount: (account: Account) => Account[] | void;
  deleteAccount: (codigo: string) => Account[] | void;
}

export const AccountsContext = createContext<AccountsContextValue>({
  accounts: [],
  addAccount: () => [],
  deleteAccount: () => [],
});

export const AccountsProvider = ({children}: any) => {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const storedAccounts = await AsyncStorage.getItem('accounts');
      if (!storedAccounts) {
        setAccounts(initialAccounts);
      } else {
        setAccounts(JSON.parse(storedAccounts));
      }
    } catch (error) {
      console.error('Error loading accounts:', error);
    }
  };

  const saveAccounts = async (updatedAccounts: Account[]) => {
    try {
      await AsyncStorage.setItem('accounts', JSON.stringify(updatedAccounts));
    } catch (error) {
      console.error('Error saving accounts:', error);
    }
  };

  const addAccount = (account: Account) => {
    setAccounts(prevAccounts => [...prevAccounts, account]);
  };

  const deleteAccount = (codigo: string) => {
    setAccounts(prevAccounts =>
      prevAccounts.filter(account => account.codigo !== codigo),
    );
  };

  useEffect(() => {
    saveAccounts(accounts);
  }, [accounts]);

  const contextValue: AccountsContextValue = {
    accounts: accounts,
    addAccount: addAccount,
    deleteAccount: deleteAccount,
  };

  return (
    <AccountsContext.Provider value={contextValue}>
      {children}
    </AccountsContext.Provider>
  );
};

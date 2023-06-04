import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import AccountsList from '../../components/AllAccounts/AccountsList/AccountsList';
import {AccountsContext} from '../../store/AccountsContext';
import {styles} from './styles';

function AllAccountsScreen() {
  const {accounts} = useContext(AccountsContext);
  const [filteredAccounts, setFilteredAccounts] = useState(accounts);

  const handleSearch = (text: string) => {
    const filtered = text
      ? accounts.filter(account =>
          account.nome.toLowerCase().includes(text.toLowerCase()),
        )
      : accounts;
    setFilteredAccounts(filtered);
  };

  useEffect(() => {
    handleSearch('');
  }, [accounts]);

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <AccountsList
        accounts={filteredAccounts.sort((a, b) =>
          a.codigo > b.codigo ? 1 : -1,
        )}
      />
    </View>
  );
}

export default AllAccountsScreen;

import React from 'react';
import {FlatList, ListRenderItem, Text, View} from 'react-native';
import AccountsItem from '../AccountsItem/AccountsItem';
import {Account} from '../../../interfaces/Account';
import {styles} from './styles';

interface AccountsListProps {
  accounts: Account[];
}

const AccountsList: React.FC<AccountsListProps> = ({accounts}) => {
  const renderItem: ListRenderItem<Account> = ({item}) => (
    <AccountsItem
      codigo={item.codigo}
      nome={item.nome}
      contaPai={item.contaPai}
      tipo={item.tipo}
      aceitaLancamento={item.aceitaLancamento}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Listagem</Text>
        <Text style={styles.counter}>{accounts.length} registros</Text>
      </View>
      <FlatList
        data={accounts}
        renderItem={renderItem}
        keyExtractor={item => item.codigo}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default AccountsList;

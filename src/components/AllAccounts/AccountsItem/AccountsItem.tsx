import React, {useContext, useState, memo} from 'react';
import {View, Text, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Account} from '../../../interfaces/Account';
import {AccountsContext} from '../../../store/AccountsContext';

import AccountInfoModal from '../../UI/Modals/AccountInfoModal/AccountInfoModal';
import DeleteConfirmationModal from '../../UI/Modals/DeleteConfirmationModal/DeleteConfirmationModal';
import {styles} from './styles';

const AccountsItem: React.FC<Account> = (account: Account) => {
  const {deleteAccount} = useContext(AccountsContext);

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isAccountInfoVisible, setAccountInfoVisible] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModalVisible(prevState => !prevState);
  };
  const toggleAccountInfoModal = () => {
    setAccountInfoVisible(prevState => !prevState);
  };

  const handleDelete = () => {
    deleteAccount(account.codigo);
    toggleDeleteModal();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleAccountInfoModal}>
        <View style={styles.detailsContainer}>
          <Text
            style={[
              styles.receita,
              account.tipo === 'Despesa' && styles.despesa,
            ]}>
            {account.codigo} -{' '}
          </Text>
          <Text
            style={[
              styles.receita,
              account.tipo === 'Despesa' && styles.despesa,
            ]}>
            {account.nome}
          </Text>
        </View>
      </Pressable>
      <Icon
        name="trash"
        size={24}
        color="#C4C4D1"
        onPress={toggleDeleteModal}
      />
      <DeleteConfirmationModal
        isVisible={isDeleteModalVisible}
        onConfirm={handleDelete}
        onCancel={toggleDeleteModal}
        account={account}
      />
      <AccountInfoModal
        isVisible={isAccountInfoVisible}
        onConfirm={toggleAccountInfoModal}
        account={account}
      />
    </View>
  );
};

export default memo(AccountsItem);

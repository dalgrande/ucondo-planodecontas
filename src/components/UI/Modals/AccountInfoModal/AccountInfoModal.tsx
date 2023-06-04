import React from 'react';
import {View, Text, Modal, Pressable, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {Account} from '../../../../interfaces/Account';
import {brandColors} from '../../../../constants/colors';
import {styles} from './styles';

interface AccountInfoModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  account: Account;
}

const AccountInfoModal: React.FC<AccountInfoModalProps> = ({
  isVisible,
  onConfirm,
  account,
}) => {
  const {height, width} = useWindowDimensions();
  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.container}>
        <View style={[
            styles.modalContent,
            {width: width * 0.7, height: height * 0.5},
          ]}>
          <View style={styles.iconContainer}>
            <Icon name="info" size={40} color={brandColors.primary} />
          </View>
          <Text style={styles.modalText}>Detalhes da Conta</Text>
          <Text style={styles.modalTextAccount}>Código: {account.codigo}</Text>
          <Text style={styles.modalTextAccount}>Tipo: {account.tipo}</Text>
          <Text style={styles.modalTextAccount}>Nome: {account.nome}</Text>
          <Text style={styles.modalTextAccount}>
            Aceita lançamento: {account.aceitaLancamento}
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onConfirm}>
              <Text style={styles.buttonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AccountInfoModal;

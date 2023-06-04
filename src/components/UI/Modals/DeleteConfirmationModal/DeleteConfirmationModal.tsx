import React from 'react';
import {View, Text, Modal, Pressable, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Account} from '../../../../interfaces/Account';
import {styles} from './styles';

interface DeleteConfirmationModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  account: Account;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
  account,
}) => {
  const {height, width} = useWindowDimensions();
  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.container}>
        <View
          style={[
            styles.modalContent,
            {width: width * 0.7, height: height * 0.33},
          ]}>
          <View style={styles.iconContainer}>
            <Icon name="trash" size={40} color="#FF6680" />
          </View>
          <Text style={styles.modalText}>Deseja excluir a conta:</Text>
          <Text style={styles.modalTextAccount}>
            {account.codigo} - {account.nome}?
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Não!</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onConfirm}>
              <Text style={styles.buttonText}>Com certeza</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmationModal;

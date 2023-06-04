import React from 'react';
import {View, Text, Modal, Pressable, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {brandColors} from '../../../../constants/colors';
import {styles} from './styles';

interface ErrorModalProps {
  isVisible: boolean;
  errorMessage: string;
  modalErrorTitle?: string;
  onConfirm: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isVisible,
  onConfirm,
  errorMessage,
  modalErrorTitle,
}) => {
  const {height, width} = useWindowDimensions();
  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.container}>
        <View style={[
            styles.modalContent,
            {width: width * 0.7, height: height * 0.37},
          ]}>
          <View style={styles.iconContainer}>
            <Icon name="warning" size={40} color={brandColors.primary} />
          </View>
          <Text style={styles.modalText}>
            {modalErrorTitle ?? 'Atenção: Conta não inserida!'}
          </Text>
          <Text style={styles.modalTextAccount}>{errorMessage}</Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onConfirm}>
              <Text style={styles.buttonText}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;

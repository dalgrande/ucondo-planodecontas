import { StyleSheet } from "react-native";
import { brandColors } from "../../../../constants/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 8,
      width: 277,
      height: 250,
      alignItems: 'center',
    },
    iconContainer: {
      width: 72,
      height: 72,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalText: {
      fontSize: 15,
      marginBottom: 20,
      textAlign: 'center',
      color: brandColors.primary
    },
    modalTextAccount: {
      fontSize: 15,
      marginBottom: 20,
      textAlign: 'center',
      fontWeight: 'bold',
      color: brandColors.primary
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 8,
    },
    cancelButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      marginRight: 10,
      fontColor: '#FF6680',
    },
    cancelButtonText: {
      fontSize: 15,
      color: '#FF6680',
    },
    button: {
      paddingHorizontal: 20,
      backgroundColor: '#FF6680',
      borderRadius: 100,
      height: 40,
      paddingTop: 8,
      
    },
    buttonText: {
      fontSize: 16,
      color: 'white',
    },
  });
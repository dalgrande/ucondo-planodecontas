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
      height: 380,
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
      fontWeight: 'bold',
      color: brandColors.primary,
    },
    modalTextAccount: {
      fontSize: 15,    
      marginBottom: 20,
      textAlign: 'center',
      color: brandColors.primary,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 8,
    },
    button: {
      paddingHorizontal: 20,
      backgroundColor: brandColors.primary,
      borderRadius: 100,
      height: 40,
      paddingTop: 8,
    },
    buttonText: {
      fontSize: 16,
      color: 'white',
    },
  });
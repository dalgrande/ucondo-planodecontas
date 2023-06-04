import { StyleSheet } from "react-native";
import { brandColors } from "../../constants/colors";

export const styles = StyleSheet.create({
    scrolView: {
      flex: 1,
      backgroundColor: brandColors.secondary,
    },
    background: {
      flex: 1,
      backgroundColor: brandColors.primary,
    },
    container: {
      flex: 1,
      marginTop: 24,
      paddingHorizontal: 23,
      paddingVertical: 23,
      backgroundColor: brandColors.secondary,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      marginBottom: 9,
      paddingHorizontal: 17,
    },
    input: {
      fontSize: 16,
      color: '#777777',
    },
    label: {
      fontSize: 15,
      color: '#6A6A6A',
      fontWeight: 'bold',
      marginBottom: 8,
    },
    pickerInputContainer: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      marginBottom: 9,
    },
    pickerInput: {
      flex: 1,
    },
  });
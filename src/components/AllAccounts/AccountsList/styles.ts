import { StyleSheet } from "react-native";
import { brandColors } from "../../../constants/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: brandColors.secondary,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    listContainer: {
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    titleContainer: {
      marginTop: 18,
      marginBottom: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      marginLeft: 28,
      color: '#3D3D4C',
    },
    counter: {
      marginRight: 28,
      color: '#A0A0B2',
    },
  });
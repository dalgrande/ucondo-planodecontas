import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      marginBottom: 8,
    },
    detailsContainer: {
      flexDirection: 'row',
      fontSize: 15,
    },
    despesa: {
      color: '#E28856',
    },
    receita: {
      color: '#1BA803',
    },
  });
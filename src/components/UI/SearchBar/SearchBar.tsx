import React from 'react';
import {View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={24} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Pesquisar Conta"
        placeholderTextColor={'#C4C4D1'}
        onChangeText={onSearch}
      />
    </View>
  );
};

export default SearchBar;

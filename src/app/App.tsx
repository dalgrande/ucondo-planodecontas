import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllAccountsScreen from '../screens/AllAccountsScreen/AllAccountsScreen';
import AddAccountScreen from '../screens/AddAccountScreen/AddAccountScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AccountsProvider} from '../store/AccountsContext';
import {brandColors} from '../constants/colors';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AccountsProvider>
        <Stack.Navigator
          screenOptions={({navigation}) => ({
            headerStyle: {backgroundColor: brandColors.primary},
            headerTintColor: 'white',
            animation: 'slide_from_bottom',
            headerShadowVisible: false,
            statusBarColor: brandColors.primary,
            headerRight: ({tintColor}) => (
              <Icon
                name="plus"
                size={24}
                color={tintColor}
                onPress={() => navigation.navigate('AddAccount')}
              />
            ),
          })}>
          <Stack.Screen
            name="AllAccounts"
            component={AllAccountsScreen}
            options={() => ({
              title: 'Plano de Contas',
            })}
          />
          <Stack.Screen
            name="AddAccount"
            component={AddAccountScreen}
            options={{title: 'Inserir Conta'}}
          />
        </Stack.Navigator>
      </AccountsProvider>
    </NavigationContainer>
  );
};

export default App;

import React, {useContext, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AccountsContext} from '../../store/AccountsContext';
import {Account} from '../../interfaces/Account';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';
import ErrorModal from '../../components/UI/Modals/ErrorModal/ErrorModal';

interface AddAccountScreenProps {
  navigation: any;
}

function AddAccountScreen({navigation}: AddAccountScreenProps) {
  const {addAccount, accounts} = useContext(AccountsContext);
  const [contaPai, setContaPai] = useState(accounts[0].codigo);
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('Receita');
  const [aceitaLancamento, setAceitaLancamento] = useState('Sim');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalErrorTitle, setModalErrorTitle] = useState<string | undefined>(
    undefined,
  );

  function handleAddNewAccount() {
    let newAccount: Account = {
      contaPai: contaPai,
      codigo: codigo,
      nome: nome,
      tipo: tipo,
      aceitaLancamento: aceitaLancamento,
    };

    const parentAccount = accounts.find(account => account.codigo === contaPai);
    if (
      parentAccount &&
      parentAccount.aceitaLancamento!.toLowerCase() === 'sim'
    ) {
      setModalErrorTitle('Atenção: Não é possível adicionar conta filha!');
      setErrorMessage(
        'Uma conta que aceita lançamentos não pode ter contas filhas.',
      );
      setIsErrorModalVisible(true);
      return;
    }

    const accountCodeParts = newAccount.codigo.split('.');
    if (accountCodeParts.some(part => parseInt(part) > 999)) {
      setErrorMessage(
        'Nenhuma parte do código da conta pode ser superior a 999.',
      );
      return setIsErrorModalVisible(true);
    }

    if (
      newAccount.contaPai === '' ||
      newAccount.codigo === '' ||
      newAccount.nome === '' ||
      newAccount.tipo === '' ||
      newAccount.aceitaLancamento === ''
    ) {
      setErrorMessage('Todos os campos são de preenchimento obrigatório.');
      return setIsErrorModalVisible(true);
    }
    const isDuplicateCode = accounts.some(account => account.codigo === codigo);
    if (isDuplicateCode) {
      setModalErrorTitle('Atenção: Conta duplicada!');
      setErrorMessage('Já existe uma conta cadastrada com esse código.');
      return setIsErrorModalVisible(true);
    }

    addAccount(newAccount);
    navigation.goBack();
  }

  const maiorContaFilha = accounts
    .filter(account => {
      const contaPaiDots = contaPai.split('.').length;
      const accountDots = account.codigo.split('.').length;
      return (
        account.codigo.startsWith(contaPai) && contaPaiDots + 1 === accountDots
      );
    })
    .reduce((maiorConta: any, conta: any) => {
      const parts = conta.codigo.split('.');
      const codigoNumerico = parseInt(parts[parts.length - 1]);
      return codigoNumerico > maiorConta ? codigoNumerico : maiorConta;
    }, 0);

  const sugerirProximoCodigo = () => {
    let proximoCodigoNumerico = maiorContaFilha + 1;
    let newContaPai = contaPai;
    let suggestedCodigo = `${newContaPai}.${proximoCodigoNumerico}`;

    const parentAccount = accounts.find(account => account.codigo === contaPai);
    if (
      parentAccount &&
      parentAccount.aceitaLancamento!.toLowerCase() === 'sim'
    ) {
      setModalErrorTitle('Atenção: Não é possível adicionar conta filha!');
      setErrorMessage(
        'Uma conta que aceita lançamentos não pode ter contas filhas.',
      );
      setIsErrorModalVisible(true);
      return;
    }

    // Handle case where child number reaches 999
    if (proximoCodigoNumerico > 999) {
      const contaPaiParts = contaPai.split('.');
      if (contaPaiParts.length === 1) {
        // We are at the root level, so increment root level
        newContaPai = `${parseInt(contaPaiParts[0]) + 1}`;
      } else {
        contaPaiParts.pop();
        newContaPai = contaPaiParts.join('.');
      }
      proximoCodigoNumerico = 1; // reset to 1
      suggestedCodigo = `${newContaPai}.${proximoCodigoNumerico}`;
    }

    // Make sure the suggested code doesn't already exist
    while (accounts.some(account => account.codigo === suggestedCodigo)) {
      if (proximoCodigoNumerico >= 999) {
        const parts = newContaPai.split('.');
        parts[parts.length - 1] = `${parseInt(parts[parts.length - 1]) + 1}`;
        newContaPai = parts.join('.');
        proximoCodigoNumerico = 0;
      }
      proximoCodigoNumerico++;
      suggestedCodigo = `${newContaPai}.${proximoCodigoNumerico}`;
    }
    setCodigo(suggestedCodigo);
    return suggestedCodigo;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Inserir Conta',
      headerTintColor: 'white',
      headerRight: () => (
        <Icon
          name="done"
          size={24}
          color={'white'}
          onPress={handleAddNewAccount}
        />
      ),
    });
  }, [navigation, handleAddNewAccount]);

  useLayoutEffect(() => {
    sugerirProximoCodigo();
  }, [contaPai]);

  return (
    <ScrollView style={styles.scrolView}>
      <KeyboardAvoidingView style={styles.background} behavior="position">
        <View style={styles.background}>
          <View style={styles.container}>
            <Text style={styles.label}>Conta pai</Text>
            <View style={styles.pickerInputContainer}>
              <Picker
                style={[styles.pickerInput, styles.input]}
                placeholder="Conta pai"
                selectedValue={contaPai}
                onValueChange={itemValue => setContaPai(itemValue)}>
                {accounts.map(account => (
                  <Picker.Item
                    key={account.codigo}
                    label={`${account.codigo} - ${account.nome}`}
                    value={account.codigo}
                  />
                ))}
              </Picker>
            </View>
            <Text style={styles.label}>Código</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Código"
                value={codigo || sugerirProximoCodigo()}
                onChangeText={setCodigo}
              />
            </View>
            <Text style={styles.label}>Nome</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
              />
            </View>
            <Text style={styles.label}>Tipo</Text>
            <View style={styles.pickerInputContainer}>
              <Picker
                style={[styles.pickerInput, styles.input]}
                placeholder="Tipo"
                selectedValue={tipo}
                onValueChange={itemValue => setTipo(itemValue)}>
                <Picker.Item key={1} label={'Receita'} value={'Receita'} />
                <Picker.Item key={2} label={'Despesa'} value={'Despesa'} />
              </Picker>
            </View>
            <Text style={styles.label}>Aceita lançamentos</Text>
            <View style={styles.pickerInputContainer}>
              <Picker
                style={[styles.pickerInput, styles.input]}
                placeholder="Aceita lançamentos"
                selectedValue={aceitaLancamento}
                onValueChange={itemValue => setAceitaLancamento(itemValue)}>
                <Picker.Item key={1} label={'Sim'} value={'Sim'} />
                <Picker.Item key={2} label={'Não'} value={'Não'} />
              </Picker>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <View>
        <ErrorModal
          isVisible={isErrorModalVisible}
          onConfirm={() => {
            setIsErrorModalVisible(false), setModalErrorTitle(undefined);
          }}
          errorMessage={errorMessage}
          modalErrorTitle={modalErrorTitle}
        />
      </View>
    </ScrollView>
  );
}

export default AddAccountScreen;

import React, { useState } from 'react'
import { Button, View, Alert, StyleSheet, ScrollView } from 'react-native'
import { TextInput, Card, Title } from 'react-native-paper'
import firebase from '../../../database/firebase'

const ESTADO_INICIAL = {
  nome: '',
  telefone: '',
}

export default function SedeCadastrarVendedor({route, navigation}) {

  const [state, setState] = useState(ESTADO_INICIAL)

  function handleChangeText(value, name) {
    setState({ ...state, [name]: value })
  }

  async function saveNewUser() {
    if (state.nome === '') {
      Alert.alert('Por favor, Digite seu nome')
    } else {

      try {
        await firebase.db.collection('usuarios').add({
          nome: state.nome,
          telefone: state.telefone,
          categoria: 'VENDEDOR'
        })

        navigation.navigate('MenuPrincipal')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Title style={{ textAlign: 'center', padding: 10 }}>CADASTRAR VENDEDOR</Title>
        <TextInput placeholder='NOME' onChangeText={(value) => handleChangeText(value, 'nome')} value={state.nome} />
        <TextInput placeholder='TELEFONE' onChangeText={(value) => handleChangeText(value, 'telefone')} value={state.telefone} />
        <View style={styles.button}>
          <Button color='#015227' title='CADASTRAR' onPress={() => saveNewUser()} />
        </View>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
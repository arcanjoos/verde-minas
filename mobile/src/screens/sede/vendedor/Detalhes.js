import React, { useEffect, useState } from 'react'
import { ScrollView, Button, View, Alert, ActivityIndicator, StyleSheet, TextInput } from 'react-native'

import firebase from '../../../database/firebase'

const ESTADO_INICIAL = {
  id: '',
  nome: '',
  telefone: '',
}

export default function SedeDetalhesVendedor({ route, navigation }) {


  const [cotacao, setUser] = useState(ESTADO_INICIAL)
  const [loading, setLoading] = useState(true)

  const handleTextChange = (value, prop) => {
    setUser({ ...cotacao, [prop]: value })
  }


  async function buscarUsuario(id) {
    const dbRef = firebase.db.collection('usuarios').doc(id)
    const doc = await dbRef.get()
    const cotacao = doc.data()
    setUser({ ...cotacao, id: doc.id })
    setLoading(false)
  }

  async function deleteUser() {
    setLoading(true)
    const dbRef = firebase.db
      .collection('usuarios')
      .doc(route.params.cotacaoId)
    await dbRef.delete()
    setLoading(false)
    navigation.navigate('MenuVendedor')
  }

  function openConfirmationAlert() {
    Alert.alert(
      'EXCLUIR VENDEDOR',
      'TEM CERTEZA?',
      [
        { text: 'SIM', onPress: () => deleteUser() },
        { text: 'NÃO', onPress: () => console.log('canceled') },
      ],
      {
        cancelable: true,
      }
    )
  }

  const updateUser = async () => {
    const cotacaoRef = firebase.db.collection('usuarios').doc(cotacao.id)
    await cotacaoRef.set({
      nome: cotacao.nome,
      telefone: cotacao.telefone,
      categoria: 'VENDEDOR'
    })
    setUser(ESTADO_INICIAL)
    navigation.navigate('MenuVendedor')
  }

  useEffect(() => {
    buscarUsuario(route.params.cotacaoId)
  }, [])

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size='large' color='#9E9E9E' />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder='NOME'
          autoCompleteType='cotacaoname'
          style={styles.inputGroup}
          value={cotacao.nome}
          onChangeText={(value) => handleTextChange(value, 'nome')}
        />
      </View>
      <View>
        <TextInput
          placeholder='TELEFONE'
          autoCompleteType='tel'
          style={styles.inputGroup}
          value={cotacao.telefone}
          onChangeText={(value) => handleTextChange(value, 'telefone')}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title='EXCLUIR'
          onPress={() => openConfirmationAlert()}
          color='#a00'
        />
      </View>
      <View>
        <Button title='ATUALIZAR' onPress={() => updateUser()} color='#015227' />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
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
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  btn: {
    marginBottom: 7,
  },
})

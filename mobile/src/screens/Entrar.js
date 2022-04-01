import React, { useState, useEffect } from 'react'
import { View, Button, StyleSheet, Image } from 'react-native'
import { TextInput, Card, Title } from 'react-native-paper'

import firebase from '../database/firebase'

const initalState = { nome: '', telefone: '' }


export default function Entrar(props) {

  const [state, setState] = useState(initalState)
  const [usuarios, setUsuarios] = useState([])

  function handleChangeText(value, name) {
    setState({ ...state, [name]: value })
  }

  function entrar() {
    if (state.nome === '')
      alert('Digite seu nome') 
    usuarios.map(user => {
      if (user.nome == state.nome )
        props.navigation.navigate('MenuPrincipal', { categoria: user.categoria, nomeFuncionario: user.nome, id: user.id })
    })
  }


  useEffect(() => {
    firebase.db.collection('usuarios').onSnapshot((querySnapshot) => {
      const usuarios = []
      querySnapshot.docs.forEach((doc) => {
        const { nome, telefone, categoria } = doc.data()
        usuarios.push({ id: doc.id, nome, telefone, categoria })
      })
      setUsuarios(usuarios)
    })
  }, [])

  return (
    <View style={styles.container}>
      <Card>
        <Title style={{ textAlign: 'center', padding: 10 }}>VERDE MINAS</Title>
        <Image source={require('../assets/logo.jpg')} style={{ height: 200, width: 280 }} />
        <TextInput theme={{ colors: { primary: 'green', underlineColor: 'red' } }} mode='flat' placeholder='NOME' onChangeText={(value) => handleChangeText(value, 'nome')} value={state.nome} />
        <Button color='#015227' title='ENTRAR' onPress={() => entrar()} />
      </Card>
    </View>

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
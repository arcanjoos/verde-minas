import React, { useEffect, useState } from 'react'
import { ScrollView, View, ActivityIndicator, StyleSheet, } from 'react-native'
import { Card, Subheading } from 'react-native-paper';

import firebase from '../../database/firebase'

const ESTADO_INICIAL = {
  id: '',
  nomeFazenda: '',
  nomeProdutoServico: '',
  status: '',
  embalagem: '',
  observacao: '',
  similar: '',
  quantidade: '',
}

export default function FazendaDetalhesCotacao({ route, navigation }) {
  const { cotacaoId } = route.params
  const [cotacao, setUser] = useState(ESTADO_INICIAL)
  const [loading, setLoading] = useState(true)

  async function buscarCotacao(id) {
    const dbRef = firebase.db.collection('cotacao').doc(id)
    const doc = await dbRef.get()
    const cotacao = doc.data()
    setUser({ ...cotacao, id: doc.id })
    setLoading(false)
  }


  useEffect(() => { buscarCotacao(cotacaoId) }, [])

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size='large' color='#9E9E9E' />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={{ padding: 10 }}>
        <Subheading style={{ textTransform: 'uppercase' }}>FAZENDA: {cotacao.nomeFazenda}</Subheading>
        <Subheading style={{ textTransform: 'uppercase' }}>NOME FUNCIONÁRIO: {cotacao.nomeFuncionario}</Subheading >
        <Subheading style={{ textTransform: 'uppercase' }}>PRODUTO/SERVIÇO: {cotacao.nomeProdutoServico}</Subheading >
        <Subheading style={{ textTransform: 'uppercase' }}>QUANTIDADE: {cotacao.quantidade}</Subheading >
        <Subheading style={{ textTransform: 'uppercase' }}>EMBALAGEM: {cotacao.embalagem}</Subheading >
        <Subheading style={{ textTransform: 'uppercase' }}>SIMILAR: {cotacao.similar}</Subheading >
        <Subheading style={{ textTransform: 'uppercase' }}>STATUS: {cotacao.status}</Subheading >
        <Subheading style={{ textTransform: 'uppercase' }}>OBSERVAÇÃO: {cotacao.observacao}</Subheading >
      </Card>

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
    textTransform: 'uppercase'
    // borderBottomWidth: 1,
    // borderBottomColor: '#cccccc',
  },
  btn: {
    marginBottom: 7,
  },
})

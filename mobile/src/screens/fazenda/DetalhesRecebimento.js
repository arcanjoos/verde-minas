import React, { useState, useEffect } from 'react'
import { Button, View, StyleSheet, ScrollView, Alert, Linking } from 'react-native'
import { TextInput, Card, Title, Subheading } from 'react-native-paper'
import firebase from '../../database/firebase'

export default function FazendaNovaCotacao({ route, navigation }) {
  const { nomeFuncionario, cotacaoId } = route.params
  const [quantidadeRecebida, setQuantidadeRecebida] = useState('')
  const [observacao, setObservacao] = useState('')
  const [cotacao, setCotacao] = useState({})

  async function atualizar() {
    const cotacaoRef = firebase.db.collection('cotacao').doc(cotacaoId)
    await cotacaoRef.set({
      data: cotacao.data,
      nomeFazenda: cotacao.nomeFazenda,
      nomeFuncionario: cotacao.nomeFuncionario,
      nomeProdutoServico: cotacao.nomeProdutoServico,
      quantidade: cotacao.quantidade,
      embalagem: cotacao.embalagem,
      status: 'ENTREGUE',
      precoVista: cotacao.precoVista,
      jurosMensais: cotacao.jurosMensais,
      dataLimitePagamento: cotacao.dataLimitePagamento,
      dataPrevistaEntrega: cotacao.dataPrevistaEntrega,
      similar: cotacao.similar,
      quantidadeRecebida: quantidadeRecebida,
      concentracao: cotacao.concentracao,
      valorTotal: cotacao.valorTotal,
      observacao: observacao,
    })
    Alert.alert('AVISO', 'ENVIADO COM SUCESSO')
    Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
      if (supported) {
        return Linking.openURL(
          "whatsapp://send?phone=5534988285555&text=Olá Fernando Porto, foram entregues alguns produtos na fazenda para você"
        );
      } else {
        return Linking.openURL(
          "https://api.whatsapp.com/send?phone=5534988285555&text=Olá Fernando Porto, foram entregues alguns produtos na fazenda para você"
        );
      }
    })

    navigation.navigate('MenuPrincipal')
  }

  async function buscarCotacao(id) {
    const dbRef = firebase.db.collection('cotacao').doc(id)
    const doc = await dbRef.get()
    const cotacao = doc.data()
    setCotacao({ ...cotacao, id: doc.id })
    // setLoading(false)
  }

  useEffect(() => { buscarCotacao(cotacaoId) }, [])



  return (
    <ScrollView style={styles.container}>
      <Card>
        <Title style={{ textAlign: 'center', padding: 15 }}>FERNANDO PORTO</Title>
        <View style={{ padding: 15 }}>
          <Subheading style={{ textTransform: 'uppercase' }}>FAZENDA: {cotacao.nomeFazenda}</Subheading>
          <Subheading style={{ textTransform: 'uppercase' }}>PRODUTO/SERVIÇO: {cotacao.nomeProdutoServico}</Subheading >
          <Subheading style={{ textTransform: 'uppercase' }}>QUANTIDADE: {cotacao.quantidade}</Subheading >
          <Subheading style={{ textTransform: 'uppercase' }}>EMBALAGEM: {cotacao.embalagem}</Subheading >
          <Subheading style={{ textTransform: 'uppercase' }}>SIMILAR: {cotacao.similar}</Subheading >
          <Subheading style={{ textTransform: 'uppercase' }}>OBSERVAÇÃO: {cotacao.observacao}</Subheading >
        </View>
        <TextInput theme={{ colors: { primary: 'green', underlineColor: 'red' } }} mode='flat'
          placeholder='QUANTIDADE RECEBIDA'
          onChangeText={(value) => setQuantidadeRecebida(value)}
          value={quantidadeRecebida}
        />
        <TextInput theme={{ colors: { primary: 'green', underlineColor: 'red' } }} mode='flat'
          placeholder='OBSERVAÇÃO'
          onChangeText={(value) => setObservacao(value)}
          value={observacao}
        />
        <View>
          <Button style={{ padding: 10 }} color='#015227' title='ENVIAR' onPress={atualizar} />
        </View>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  }
})
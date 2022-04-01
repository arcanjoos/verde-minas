import React, { useState, useEffect } from 'react'
import { Button, View, StyleSheet, ScrollView, Alert, Linking } from 'react-native'
import { TextInput, Card, Title, Subheading } from 'react-native-paper'
import firebase from '../../database/firebase'

export default function FazendaNovaCotacao({ route, navigation }) {
  const { cotacaoId } = route.params
  const [cotacao, setCotacao] = useState({})

  const [precoVista, setPrecoVista] = useState('')
  const [jurosMensais, setJurosMensais] = useState('')
  const [dataLimitePagamento, setDataLimitePagamento] = useState('')
  const [dataPrevistaEntrega, setDataPrevistaEntrega] = useState('')
  const [similar, setSimilar] = useState('')
  const [concentracao, setConcentracao] = useState('')
  const [valorTotal, setValorTotal] = useState('')
  const [observacao, setObservacao] = useState('')

  async function atualizar() {
    const cotacaoRef = firebase.db.collection('cotacao').doc(cotacaoId)
    await cotacaoRef.set({
      data: cotacao.data,
      idCotacao: cotacao.idCotacao,
      idVendedor: cotacao.idVendedor,
      vendedor: cotacao.vendedor,
      nomeFazenda: cotacao.nomeFazenda,
      nomeFuncionario: cotacao.nomeFuncionario,
      nomeProdutoServico: cotacao.nomeProdutoServico,
      quantidade: cotacao.quantidade,
      embalagem: cotacao.embalagem,
      status: 'RESPONDIDA PELO VENDEDOR',
      precoVista: precoVista,
      jurosMensais: jurosMensais,
      dataLimitePagamento: dataLimitePagamento,
      dataPrevistaEntrega: dataPrevistaEntrega,
      similar: similar,
      concentracao: concentracao,
      valorTotal: valorTotal,
      observacao: observacao,
    })
    console.log(cotacao)
    Alert.alert('AVISO', 'ENVIADO COM SUCESSO')
    Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
      if (supported) {
        return Linking.openURL(
          "whatsapp://send?phone=5534988285555&text=Olá Fernando Porto, tem uma nova resposta de cotação para você"
        );
      } else {
        return Linking.openURL(
          "https://api.whatsapp.com/send?phone=5534988285555&text=Olá Fernando Porto, tem uma nova resposta de cotação para você"
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
          placeholder='PREÇO À VISTA' keyboardType='number-pad'
          onChangeText={(value) => setPrecoVista(value)}
          value={precoVista}
        />
        <TextInput theme={{ colors: { primary: 'green', underlineColor: 'red' } }} mode='flat'
          placeholder='JUROS MENSAIS' keyboardType='number-pad'
          onChangeText={(value) => setJurosMensais(value)}
          value={jurosMensais}
        />
        <TextInput theme={{ colors: { primary: 'green', underlineColor: 'red' } }} mode='flat'
          placeholder='DATA LIMITE DE PAGAMENTO' keyboardType='number-pad'
          onChangeText={(value) => setDataLimitePagamento(value)}
          value={dataLimitePagamento}
        />
        <TextInput theme={{ colors: { primary: 'green', underlineColor: 'red' } }} mode='flat'
          placeholder='DATA PREVISTA ENTREGA' keyboardType='number-pad'
          onChangeText={(value) => setDataPrevistaEntrega(value)}
          value={dataPrevistaEntrega}
        />
        <TextInput theme={{ colors: { primary: 'green', underlineColor: 'red' } }} mode='flat'
          placeholder='PRODUTO SIMILAR OU ORIGINAL?'
          onChangeText={(value) => setSimilar(value)}
          value={similar}
        />
        <TextInput theme={{ colors: { primary: 'green', underlineColor: 'red' } }} mode='flat'
          placeholder='CONCENTRAÇÃO DO PRODUTO (SE SIMILAR)' keyboardType='number-pad'
          onChangeText={(value) => setConcentracao(value)}
          value={concentracao}
        />
        <TextInput theme={{ colors: { primary: 'green', underlineColor: 'red' } }} mode='flat'
          placeholder='VALOR TOTAL DA COMPRA' keyboardType='number-pad'
          onChangeText={(value) => setValorTotal(value)}
          value={valorTotal}
        />
        <TextInput theme={{ colors: { primary: 'green', underlineColor: 'red' } }} mode='flat'
          placeholder='OBSERVAÇÃO'
          onChangeText={(value) => setObservacao(value)}
          value={observacao}
        />
        <View style={{ marginBottom: 70, }}>
          <Button color='#015227' title='ENVIAR' onPress={atualizar} />
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
import React, { useState, useEffect } from 'react'
import { Button, View, StyleSheet, ScrollView, Alert } from 'react-native'
import { TextInput, Card, Title, Subheading } from 'react-native-paper'
import firebase from '../../../database/firebase'

export default function FazendaNovaCotacao({ route, navigation }) {
  const { cotacaoId } = route.params
  const [cotacao, setCotacao] = useState({})

  const [nomeFazenda, setNomeFazenda] = useState(cotacao.nomeFazenda)
  const [nomeProdutoServico, setNomeProdutoServico] = useState(cotacao.nomeProdutoServico)
  const [quantidade, setQuantidade] = useState(cotacao.quantidade)
  const [embalagem, setEmbalagem] = useState(cotacao.embalagem)
  const [similar, setSimilar] = useState(cotacao.similar)
  const [observacao, setObservacao] = useState(cotacao.observacao)

  async function buscarCotacao(id) {
    const dbRef = firebase.db.collection('solicitacao').doc(id)
    const doc = await dbRef.get()
    const cotacao = doc.data()
    setCotacao({ ...cotacao, id: doc.id })
  }


  async function atualizar() {
    if (nomeProdutoServico === '') {
      Alert.alert('Por favor, Digite o nome do produto/serviço')
    } else {

      const dados = {
        nomeFazenda: nomeFazenda,
        nomeProdutoServico: nomeProdutoServico,
        quantidade: quantidade,
        observacao: observacao,
        embalagem: embalagem,
        similar: similar,
        status: 'SOLICITADO',
        data: Date.now(),
        nomeFuncionario: cotacao.nomeFuncionario
      }
      try {
        const cotacaoRef = firebase.db.collection('cotacao').doc(cotacao.id)
        await cotacaoRef.set(dados)
        Alert.alert('AVISO', 'ENVIADO COM SUCESSO')
        navigation.navigate('ListaVendedores', { cotacaoId: cotacaoId })
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => { buscarCotacao(cotacaoId) }, [])


  return (
    <ScrollView style={styles.container}>
      <Card>
        <Title style={{ textAlign: 'center', padding: 15 }}>FERNANDO PORTO</Title>
        <View style={{ padding: 15 }}>
          <Subheading style={{ textTransform: 'uppercase' }}>FAZENDA: {cotacao.nomeFazenda}</Subheading>
          <Subheading style={{ textTransform: 'uppercase' }}>PRODUTO/SERVIÇO: {cotacao.nomeProdutoServico}</Subheading>
          <Subheading style={{ textTransform: 'uppercase' }}>QUANTIDADE: {cotacao.quantidade}</Subheading>
          <Subheading style={{ textTransform: 'uppercase' }}>EMBALAGEM: {cotacao.embalagem}</Subheading>
          <Subheading style={{ textTransform: 'uppercase' }}>SIMILAR: {cotacao.similar}</Subheading>
          <Subheading style={{ textTransform: 'uppercase' }}>OBSERVAÇÃO: {cotacao.observacao}</Subheading>
        </View>
        <TextInput theme={{ colors: { primary: 'green', underlineColor: 'red' } }} mode='flat'
          placeholder='NOME FAZENDA'
          onChangeText={(value) => setNomeFazenda(value)}
          value={nomeFazenda}
        />
        <TextInput theme={{ colors: { primary: 'green', underlineColor: 'red' } }} mode='flat'
          placeholder='NOME DO PRODUTO/SERVIÇO'
          onChangeText={(value) => setNomeProdutoServico(value)}
          value={nomeProdutoServico}
        />
        <TextInput theme={{ colors: { primary: 'green', underlineColor: 'red' } }} mode='flat'
          placeholder='QUANTIDADE' keyboardType='number-pad'
          onChangeText={(value) => setQuantidade(value)}
          value={quantidade}
        />
        <TextInput theme={{ colors: { primary: 'green', underlineColor: 'red' } }} mode='flat'
          placeholder='EMBALAGEM'
          onChangeText={(value) => setEmbalagem(value)}
          value={embalagem}
        />
        <TextInput theme={{ colors: { primary: 'green', underlineColor: 'red' } }} mode='flat'
          placeholder='SIMILAR? SIM OU NÃO'
          onChangeText={(value) => setSimilar(value)}
          value={similar}
        />
        <TextInput theme={{ colors: { primary: 'green', underlineColor: 'red' } }} mode='flat'
          placeholder='OBSERVAÇÃO'
          onChangeText={(value) => setObservacao(value)}
          value={observacao}
        />
        <View style={{ paddingBottom: 70 }}>
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
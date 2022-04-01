import React, { useState } from 'react'
import { Button, View, StyleSheet, ScrollView, Alert, Linking } from 'react-native'
import { TextInput, Card, Title } from 'react-native-paper'
import firebase from '../../database/firebase'

export default function FazendaNovaCotacao({ route, navigation }) {
  const { nomeFuncionario } = route.params
  const [nomeFazenda, setNomeFazenda] = useState('')
  const [nomeProdutoServico, setNomeProdutoServico] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [embalagem, setEmbalagem] = useState('')
  const [similar, setSimilar] = useState('')
  const [observacao, setObservacao] = useState('')

  async function cadastrar() {
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
        nomeFuncionario: nomeFuncionario
      }
      try {
        await firebase.db.collection('solicitacao').add(dados)
        Alert.alert('AVISO', 'ENVIADO COM SUCESSO')

        Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
          if (supported) {
            return Linking.openURL(
              "whatsapp://send?phone=5534988285555&text=Olá Fernando Porto, tem uma nova cotação para você"
            );
          } else {
            return Linking.openURL(
              "https://api.whatsapp.com/send?phone=5534988285555&text=Olá Fernando Porto, tem uma nova cotação para você"
            );
          }
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
        <Title style={{ textAlign: 'center', padding: 15 }}>FERNANDO PORTO</Title>
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
        <View>
          <Button style={{ padding: 10 }} color='#015227' title='ENVIAR' onPress={cadastrar} />
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
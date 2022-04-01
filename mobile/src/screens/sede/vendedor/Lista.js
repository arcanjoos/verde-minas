import React, { useState, useEffect } from 'react'
import { Alert, Linking, ScrollView, } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Headline, Subheading } from 'react-native-paper'
import firebase from '../../../database/firebase'

export default function SedeListaVendedores({ route, navigation }) {
  const { cotacaoId } = route.params

  const [usuarios, setUsuarios] = useState([])
  const [cotacao, setUser] = useState([])

  async function buscarCotacao(id) {
    const dbRef = firebase.db.collection('cotacao').doc(id)
    const doc = await dbRef.get()
    const cotacao = doc.data()
    setUser({ ...cotacao, id: doc.id })
    setLoading(false)
  }
  useEffect(() => {
    buscarCotacao(cotacaoId)
  }, [])


  useEffect(() => {
    firebase.db.collection('usuarios').onSnapshot((querySnapshot) => {
      const usuarios = []
      querySnapshot.docs.forEach((doc) => {
        const { nome, telefone, categoria } = doc.data()
        if (categoria === 'VENDEDOR')
          usuarios.push({ id: doc.id, nome, telefone, })
      })
      setUsuarios(usuarios)
    })
  }, [])

  async function cadastrar(vendedor) {
    const dados = {
      vendedor: vendedor.nome,
      idVendedor: vendedor.id,
      nomeFazenda: cotacao.nomeFazenda,
      nomeFuncionario: cotacao.nomeFuncionario,
      nomeProdutoServico: cotacao.nomeProdutoServico,
      quantidade: cotacao.quantidade,
      observacao: cotacao.observacao,
      embalagem: cotacao.embalagem,
      similar: cotacao.similar,
      status: 'ENVIADO AO VENDEDOR',
      data: Date.now(),
      idCotacao: cotacao.id,
    }
    try {
      await firebase.db.collection('cotacao').add(dados)
      Alert.alert('AVISO', 'ENVIADO COM SUCESSO')
      
      // Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
      //   if (supported) {
      //     return Linking.openURL(
      //       `whatsapp://send?phone=5534988285555&text=Olá Fernando Porto, tem uma nova cotação para você`
      //     );
      //   } else {
      //     return Linking.openURL(
      //       `https://api.whatsapp.com/send?phone=5534988285555&text=Olá Fernando Porto, tem uma nova cotação para você`
      //     );
      //   }
      // navigation.navigate('MenuPrincipal')





    } catch (error) {
      console.log(error)
    }
  }

  const openConfirmationAlert = (vendedor) => {
    Alert.alert(
      'CONFIRMAÇÃO',
      'DESEJA ENVIAR COTAÇÃO PARA ESSE VENDEDOR?',
      [
        { text: 'SIM', onPress: () => cadastrar(vendedor) },
        { text: 'Não', onPress: () => console.log('canceled') },
      ],
      {
        cancelable: true,
      }
    )
  }

  return (
    <ScrollView>
      {usuarios.map((vendedor) => {
        return (

          <ListItem key={vendedor.id} bottomDivider onPress={() => openConfirmationAlert(vendedor)}  /* vendedor */>
            <ListItem.Content>
              <Headline style={{ textTransform: 'uppercase' }}>{vendedor.nome}</Headline>
              {/* <Subheading style={{ textTransform: 'uppercase' }}>TELEFONE: {vendedor.telefone}</Subheading> */}
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )
      })}
    </ScrollView>
  )
}

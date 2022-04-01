import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Headline, Subheading } from 'react-native-paper'

import firebase from '../../../database/firebase'

export default function SedeEnviarCotacao({ route, navigation }) {
  const [cotacoes, setCotacoes] = useState([])

  useEffect(() => {
    firebase.db.collection('solicitacao').onSnapshot((querySnapshot) => {
      const cotacoes = []
      querySnapshot.docs.forEach((doc) => {
        const { status, embalagem, nomeFazenda, nomeProdutoServico, similar, unidade, } = doc.data()
        if (status === 'APROVADO')
          cotacoes.push({ id: doc.id, embalagem, status, nomeFazenda, nomeProdutoServico, similar, unidade, })
      })
      setCotacoes(cotacoes)
    })
  }, [])

  return (
    <ScrollView>
      {cotacoes.map(({ id, nomeProdutoServico, nomeFazenda, status }) => {
        return (
          <ListItem key={id} bottomDivider onPress={() => { navigation.navigate('ListaVendedores', { cotacaoId: id }) }} >
            <ListItem.Content>
              <Headline style={{ textTransform: 'uppercase' }}>{nomeProdutoServico}</Headline>
              <Subheading style={{ textTransform: 'uppercase' }}>FAZENDA: {nomeFazenda}</Subheading>
              <Subheading style={{ textTransform: 'uppercase' }}>STATUS: {status}</Subheading>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )
      })}
    </ScrollView>
  )
}
 
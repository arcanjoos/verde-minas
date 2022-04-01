import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Headline, Subheading } from 'react-native-paper'

import firebase from '../../database/firebase'

export default function VendedorResponderCotacao({ navigation, route }) {
  const [cotacoes, setCotacoes] = useState([])

  const { id } = route.params

  useEffect(() => {
    firebase.db.collection('cotacao').onSnapshot((querySnapshot) => {
      const cotacoes = []
      querySnapshot.docs.forEach((doc) => {
        const { idVendedor, status, embalagem, nomeFazenda, nomeProdutoServico, similar, unidade, } = doc.data()

        if (status !== 'COTAÇÃO ENCERRADA' && idVendedor === id)
          cotacoes.push({ id: doc.id, embalagem, status, nomeFazenda, nomeProdutoServico, similar, unidade, idVendedor })
      })
      setCotacoes(cotacoes)
    })
  }, [])

  return (
    <ScrollView>
      {cotacoes.map(({ id, nomeProdutoServico, nomeFazenda, status, idVendedor }) => {
        return (
          <ListItem key={id} bottomDivider onPress={() => { navigation.navigate('VendedorDetalhesCotacao', { cotacaoId: id, vendedorId: idVendedor }) }} >
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

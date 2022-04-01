import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Headline, Subheading } from 'react-native-paper'

import firebase from '../../../database/firebase'

export default function SedeResultadoCotacao({ route, navigation }) {
  const [cotacoes, setCotacoes] = useState([])


  useEffect(() => {
    firebase.db.collection('cotacao').onSnapshot((querySnapshot) => {
      const cotacoes = []
      querySnapshot.docs.forEach((doc) => {
        const { status, vendedor, embalagem, nomeFazenda, nomeProdutoServico, similar, quantidade, precoVista, observacao, valorTotal, jurosMensais, dataPrevistaEntrega, dataLimitePagamento } = doc.data()
        if (status === 'RESPONDIDA PELO VENDEDOR')
          cotacoes.push({ id: doc.id, vendedor, status, embalagem, nomeFazenda, nomeProdutoServico, similar, quantidade, precoVista, observacao, valorTotal, jurosMensais, dataPrevistaEntrega, dataLimitePagamento })
      })
      setCotacoes(cotacoes)
    })
  }, [])

  function atualizar() {
    alert('Clicou')
  }

  return (
    <ScrollView>
      {cotacoes.map(({ id, vendedor, nomeProdutoServico, valorTotal, quantidade, precoVista, dataLimitePagamento }) => {
        return (
          <ListItem key={id} bottomDivider
            onPress={atualizar}
          >
            <ListItem.Content>
              <Headline style={{ textTransform: 'uppercase' }}>{vendedor}</Headline>
              <Headline style={{ textTransform: 'uppercase' }}>{nomeProdutoServico}</Headline>
              <Headline style={{ textTransform: 'uppercase' }}>QUANTIDADE: {quantidade}</Headline>
              <Headline style={{ textTransform: 'uppercase' }}>PREÇO À VISTA: {precoVista}</Headline>
              <Headline style={{ textTransform: 'uppercase' }}>PREÇO TOTAL: {valorTotal}</Headline>
              <Headline style={{ textTransform: 'uppercase' }}>DATA LIMITE PAGAMENTO: {dataLimitePagamento}</Headline>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )
      })}
    </ScrollView>
  )
}

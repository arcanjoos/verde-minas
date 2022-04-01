import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Headline, Subheading, TextInput } from 'react-native-paper'
import firebase from '../../../database/firebase'

const ESTADO_INICIAL = {
  nomeFazenda: '',
  nomeProdutoServico: '',
  quantidade: '',
  embalagem: '',
  similar: '',
  observacao: '',
}

export default function SedeAutorizarCotacao({ route, navigation }) {
  const [cotacoes, setCotacoes] = useState([])

  useEffect(() => {
    firebase.db.collection('cotacao').onSnapshot((querySnapshot) => {
      const cotacoes = []
      querySnapshot.docs.forEach((doc) => {
        const { status, embalagem, nomeFazenda, nomeProdutoServico, similar, quantidade, quantidadeRecebida } = doc.data()
        // if (status === 'SOLICITADO')
        cotacoes.push({ id: doc.id, embalagem, status, nomeFazenda, nomeProdutoServico, similar, quantidade, quantidadeRecebida })
      })
      setCotacoes(cotacoes)
    })
  }, [])

  return (
    <ScrollView>
      {cotacoes.map(({ id, nomeProdutoServico, nomeFazenda, quantidade, quantidadeRecebida }) => {
        return (
          <ListItem key={id} bottomDivider >
            <ListItem.Content>
              <Headline style={{ textTransform: 'uppercase' }}>{nomeProdutoServico}</Headline>
              <Subheading style={{ textTransform: 'uppercase' }}>QUANTIDADE SOLICITADA: {quantidade}</Subheading>
              <Subheading style={{ textTransform: 'uppercase' }}>QUANTIDADE ENTREGUE: {quantidadeRecebida}</Subheading>
              <Subheading style={{ textTransform: 'uppercase' }}>QUANTIDADE A ENTREGAR: {quantidade - quantidadeRecebida}</Subheading>
              <Subheading style={{ textTransform: 'uppercase' }}>FAZENDA: {nomeFazenda}</Subheading>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )
      })}
    </ScrollView>
  )
}

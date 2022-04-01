import React, { useState, useEffect } from 'react'
import { Button, ScrollView } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

import firebase from '../../../database/firebase'

export default function SedeMenuVendedor({route, navigation}) {
  const [usuarios, setUsuarios] = useState([])

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

  return (
    <ScrollView>
      <Button
        color='#015227'
        onPress={() => navigation.navigate('CadastrarVendedor')}
        title='CADASTRAR NOVO'
      />
      {usuarios.map((cotacao) => {
        return (
          <ListItem
            key={cotacao.id}
            bottomDivider
            // onPress={() => {
            //    navigation.navigate('DetalhesVendedor', {
            //     cotacaoId: cotacao.id,
            //   })
            // }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{cotacao.nome}</ListItem.Title>
              <ListItem.Subtitle>{cotacao.telefone}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )
      })}
    </ScrollView>
  )
}

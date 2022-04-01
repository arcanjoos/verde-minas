import React from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Title } from 'react-native-paper';

const sedeListaOpcoes = [
  { nome: 'RESULTADO COTAÇÃO', rota: 'ResultadoCotacao' },
  { nome: 'NOVA COTAÇÃO', rota: 'AutorizarCotacao' },
  // { nome: 'SALDO DE PEDIDO EM ABERTO', rota: 'SaldoPedidosAbertos' },
  { nome: 'MENU USUÁRIO', rota: 'MenuUsuario' },
  { nome: 'MENU VENDEDOR', rota: 'MenuVendedor' },
]

const vendedorListaOpcoes = [
  { nome: 'RESPONDER COTAÇÃO', rota: 'ResponderCotacao' },

]

const fazendaListaOpcoes = [
  // { nome: 'MINHAS COTAÇÕES', rota: 'MinhasCotacoes' },
  { nome: 'INFORMAR RECEBIMENTO', rota: 'RecebimentoCotacao' },
  { nome: 'NOVA COTAÇÃO', rota: 'NovaCotacao' }
]

export default function MenuPrincipal({ route, navigation }) {

  const { categoria, nomeFuncionario, id } = route.params

  return (
    <ScrollView>

      {categoria === 'VENDEDOR' ?
        <View>
          {vendedorListaOpcoes.map((item, i) => (
            <TouchableOpacity onPress={() => navigation.navigate(item.rota, { nomeFuncionario, id })}>
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <Title>{item.nome}</Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          ))}
        </View>
        : <View />
      }

      {categoria === 'FAZENDA' ?
        <View>
          {fazendaListaOpcoes.map(({ nome, rota }, i) => (
            <TouchableOpacity onPress={() => navigation.navigate(rota, { nomeFuncionario, id })}>
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <Title>{nome}</Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          ))}
        </View>
        : <View />
      }

      {categoria === 'SEDE' ?
        <View>
          {sedeListaOpcoes.map((item, i) => (
            <TouchableOpacity onPress={() => navigation.navigate(item.rota, { nomeFuncionario, id })}>
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <Title>{item.nome}</Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          ))}
        </View>
        : <View />
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  button: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#cccccc',
  }
})
import React from 'react';
import { StyleSheet } from 'react-native';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Componentes GERAIS - COMUNS A TODOS OS PERFIS DE USUÁRIOS
import Entrar from './src/screens/Entrar'
import MenuPrincipal from './src/screens/MenuPrincipal'
// Componentes FAZENDA
import FazendaNovaCotacao from './src/screens/fazenda/NovaCotacao';
import FazendaMinhasCotacoes from './src/screens/fazenda/MinhasCotacoes'
import FazendaDetalhesCotacao from './src/screens/fazenda/DetalhesCotacao'
import FazendaRecebimentoCotacao from './src/screens/fazenda/Recebimento'
import FazendaDetalhesRecebimentoCotacao from './src/screens/fazenda/DetalhesRecebimento'
// Componentes VENDEDOR
import VendedorDetalhesCotacao from './src/screens/vendedor/DetalhesCotacao'
// import VendedorMenuCotacoes from './src/screens/vendedor/MenuCotacoes'
import VendedorResponderCotacao from './src/screens/vendedor/ResponderCotacao'
// Componentes SEDE
import SedeResultadoCotacao from './src/screens/sede/cotacao/Resultado'
import SedeAutorizarCotacao from './src/screens/sede/cotacao/Autorizar'
import SedeDetalhesCotacao from './src/screens/sede/cotacao/Detalhes'
import SedeResultadoDetalhes from './src/screens/sede/cotacao/ResultadoDetalhes'
import SedeResultadoFiltroCotacao from './src/screens/sede/cotacao/ResultadoFiltro'
import SedeListaVendedores from './src/screens/sede/vendedor/Lista'
import SedeMenuVendedor from './src/screens/sede/vendedor/Menu'
import SedeCadastrarVendedor from './src/screens/sede/vendedor/Cadastrar'
import SedeDetalhesVendedor from './src/screens/sede/vendedor/Detalhes'
import SedeMenuUsuario from './src/screens/sede/usuario/Menu'
import SedeCadastrarUsuario from './src/screens/sede/usuario/Cadastrar'
import SedeDetalhesUsuario from './src/screens/sede/usuario/Detalhes'
import SedeSaldoPedidosAbertos from './src/screens/sede/pedido/Saldo'
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Entrar' screenOptions={{ headerStyle: { backgroundColor: '#015227' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }}  >

      {/* STACKS GERAIS */}
      <Stack.Screen name='Entrar' component={Entrar} options={{ title: 'ENTRAR' }} />
      <Stack.Screen name='MenuPrincipal' component={MenuPrincipal} options={{ title: 'MENU PRINCIPAL' }} />
      {/* STACKS FAZENDA */}
      <Stack.Screen name='NovaCotacao' component={FazendaNovaCotacao} options={{ title: 'NOVA COTAÇÃO' }} />
      <Stack.Screen name='MinhasCotacoes' component={FazendaMinhasCotacoes} options={{ title: 'MINHAS COTAÇÕES' }} />
      <Stack.Screen name='RecebimentoCotacao' component={FazendaRecebimentoCotacao} options={{ title: 'MINHAS COTAÇÕES' }} />
      <Stack.Screen name='DetalhesCotacao' component={FazendaDetalhesCotacao} options={{ title: 'DETALHES COTAÇÃO' }} />
      <Stack.Screen name='DetalhesRecebimentoCotacao' component={FazendaDetalhesRecebimentoCotacao} options={{ title: 'DETALHES COTAÇÃO' }} />
      {/* STACKS VENDEDOR */}
      {/* <Stack.Screen name='MenuCotacoes' component={VendedorMenuCotacoes} options={{ title: 'MENU COTAÇÕES' }} /> */}
      <Stack.Screen name='VendedorDetalhesCotacao' component={VendedorDetalhesCotacao} options={{ title: 'DETALHES COTAÇÃO' }} />
      <Stack.Screen name='ResponderCotacao' component={VendedorResponderCotacao} options={{ title: 'RESPONDER COTAÇÃO' }} />
      {/* STACKS SEDE */}
      <Stack.Screen name='ResultadoCotacao' component={SedeResultadoCotacao} options={{ title: 'RESULTADO COTAÇÃO' }} />
      <Stack.Screen name='ResultadoFiltroCotacao' component={SedeResultadoFiltroCotacao} options={{ title: 'RESULTADO COTAÇÃO' }} />
      <Stack.Screen name='ResultadoDetalhes' component={SedeResultadoDetalhes} options={{ title: 'DETALHES COTAÇÃO' }} />
      <Stack.Screen name='AutorizarCotacao' component={SedeAutorizarCotacao} options={{ title: 'AUTORIZAR COTAÇÃO' }} />
      <Stack.Screen name='SedeDetalhesCotacao' component={SedeDetalhesCotacao} options={{ title: 'DETALHES COTAÇÃO' }} />
      <Stack.Screen name='ListaVendedores' component={SedeListaVendedores} options={{ title: 'LISTA VENDEDORES' }} />
      <Stack.Screen name='SaldoPedidosAbertos' component={SedeSaldoPedidosAbertos} options={{ title: 'SALDO DE PEDIDOS EM ABERTO' }} />
      <Stack.Screen name='MenuVendedor' component={SedeMenuVendedor} options={{ title: 'MENU VENDEDOR' }} />
      <Stack.Screen name='CadastrarVendedor' component={SedeCadastrarVendedor} options={{ title: 'CADASTRAR VENDEDOR' }} />
      <Stack.Screen name='DetalhesVendedor' component={SedeDetalhesVendedor} options={{ title: 'DETALHES VENDEDOR' }} />
      <Stack.Screen name='MenuUsuario' component={SedeMenuUsuario} options={{ title: 'MENU USUÁRIO' }} />
      <Stack.Screen name='CadastrarUsuario' component={SedeCadastrarUsuario} options={{ title: 'CADASTRAR USUÁRIO' }} />
      <Stack.Screen name='DetalhesUsuario' component={SedeDetalhesUsuario} options={{ title: 'DETALHES USUÁRIO' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

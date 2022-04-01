import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// COMPONENTS
import Header from './components/header';
import Title from './components/title';

// PAGES
import Pedidos from './screens/Pedidos'
import Produtos from './screens/Produtos'
import CriarProduto from './screens/CriarProduto'
import Vendedores from './screens/Vendedores'
import CriarVendedor from './screens/CriarVendedor'
import Funcionarios from './screens/Funcionarios'
import CriarFuncionario from './screens/CriarFuncionario'

export default function App() {


  return (
    <div>
      <Header />
      <div className='container mt-3'>
        <Title />
        <Switch>
          <Route exact path={['/', '/pedidos']} component={Pedidos} />
          <Route exact path='/produtos' component={Produtos} />
          <Route exact path='/produtos/adicionar' component={CriarProduto} />
          <Route exact path='/funcionarios' component={Funcionarios} />
          <Route exact path='/funcionarios/adicionar' component={CriarFuncionario} />
          <Route exact path='/vendedores' component={Vendedores} />
          <Route exact path='/vendedores/adicionar' component={CriarVendedor} />
        </Switch>
      </div>
    </div>
  );
}


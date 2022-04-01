import React from 'react';
export default function Pedidos() {

    return (
        <table class='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Produto</th>
                    <th scope='col'>Fazenda</th>
                    <th scope='col'>Data do Pagamento</th>
                    <th scope='col'>Fornecedor</th>
                    <th scope='col'>Quantidade unitária</th>
                    <th scope='col'>Quantidade total</th>
                    <th scope='col'>Data do Pedido</th>
                </tr>
            </thead>
            <tbody>
                
                <tr>
                    <th scope='row'>1</th>
                    <td>Benzoato</td>
                    <td>Andrade</td>
                    <td>20/07/22</td>
                    <td>Terrena</td>
                    <td>10</td>
                    <td>15</td>
                    <td>17/11/21</td>
                </tr>
                <tr>
                    <th scope='row'>1</th>
                    <td>Cletodim</td>
                    <td>Andrade</td>
                    <td>15/06/22</td>
                    <td>Terrena</td>
                    <td>10</td>
                    <td>15</td>
                    <td>17/11/21</td>
                </tr>
                <tr>
                    <th scope='row'>1</th>
                    <td>Glifosato</td>
                    <td>Andrade</td>
                    <td>15/11/22</td>
                    <td>Terrena</td>
                    <td>10</td>
                    <td>15</td> 
                    <td>17/11/21</td>
                </tr>
            </tbody>
        </table>
    )
}
import React from 'react';
export default function Produtos() {

    return (
        <table class='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Nome do Produto</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope='row'>1</th>
                    <td>Benzoato</td>
                </tr>
                <tr>
                    <th scope='row'>1</th>
                    <td>Cletodim</td>
                </tr>
                <tr>
                    <th scope='row'>1</th>
                    <td>Glifosato</td>
                </tr>
            </tbody>
        </table>
    )
}
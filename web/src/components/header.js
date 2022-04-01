import React from 'react'

export default function Header() {
    return (
        <nav className='navbar navbar-expand navbar-dark   bg-success'>
            <a href='/' className='navbar-brand'> Verde Minas </a>
            <div className='navbar-nav mr-auto'>
                <li className='nav-item'>
                    <a href={'/pedidos'} className='nav-link'>
                        Pedidos
                    </a>
                </li>
                <li className='nav-item'>
                    <a href={'/produtos'} className='nav-link'>
                        Produtos
                    </a>
                </li>
                <li className='nav-item'>
                    <a href={'/produtos/adicionar'} className='nav-link'>
                        Adicionar Produtos
                    </a>
                </li>
                <li className='nav-item'>
                    <a href={'/funcionarios'} className='nav-link'>
                        Funcionários
                    </a>
                </li>
                <li className='nav-item'>
                    <a href={'/funcionarios/adicionar'} className='nav-link'>
                        Adicionar Funcionário
                    </a>
                </li>
                <li className='nav-item'>
                    <a href={'/vendedores'} className='nav-link'>
                        Vendedores
                    </a>
                </li>
                <li className='nav-item'>
                    <a href={'/vendedores/adicionar'} className='nav-link'>
                        Adicionar Vendedor
                    </a>
                </li>
            </div>
        </nav>
    )
}
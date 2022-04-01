import React, { useState } from 'react';
import firebase from '../database/firebase'

export default function CriarVendedor() {
    
    async function salvar() {
        try {
            const dados = {
                nome: nomeVendedor,
                telefone: telefone,
                categoria: 'VENDEDOR'
            }
            await firebase.db.collection('usuarios').add(dados)
            alert('Salvo com sucesso!')
        } catch (error) {
            alert(error.message)
        }
    }

    const [nomeVendedor, setNomeVendedor] = useState('')
    const [telefone, setTelefone] = useState('')
 
    return (
        <form>
            <div class='form-group'>
                <label for='nomeProduto'>Nome do Vendedor</label>
                <input type='text' onChange={e => setNomeVendedor(e.target.value)} class='form-control' id='nomeVendedor' placeholder='Digite o nome do vendedor' />
            </div>
            <div class='form-group'>
                <label for='telefoneVendedor'>Telefone</label>
                <input type='text' onChange={e => setTelefone(e.target.value)} class='form-control' id='telefoneVendedor' placeholder='Digite o telefone' />
            </div>
            <button type='button' onClick={salvar} class='btn btn-success'>Salvar</button>
        </form>
    )
}
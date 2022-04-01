import React, { useState } from 'react';
import firebase from '../database/firebase'

export default function CriarProdutos() {

    async function salvar() {
        try {
            const dados = {
                nome: nomeFuncionario,
                categoria: 'FAZENDA'
            }
            await firebase.db.collection('usuarios').add(dados)
            alert('Salvo com sucesso!')
        } catch (error) {
            alert(error.message)
        }
    }

    const [nomeFuncionario, setNomeFuncionario] = useState('')

    return (
        <form>
            <div class='form-group'>
                <label for='nomeFuncionario'>Nome do Funcionário</label>
                <input onChange={e => setNomeFuncionario(e.target.value)} type='text' class='form-control' id='nomeFuncionario' placeholder='Digite o nome do funcionário' />
            </div>
            <button type='button' class='btn btn-success' onClick={salvar}>Salvar</button>
        </form>
    )
}
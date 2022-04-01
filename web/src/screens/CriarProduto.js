import React, { useState } from 'react';
import firebase from '../database/firebase'

export default function CriarProdutos() {
 
    async function salvar() {
        try {
            const dados = {
                nomeProduto: nomeProduto
            }
            await firebase.db.collection('produtos').add(dados)
            alert('Salvo com sucesso!')
        } catch (error) {
            alert(error.message)
        }
    }

    const [nomeProduto, setNomeProduto] = useState('')

    return (
        <form>
            <div class='form-group'>
                <label for='nomeProduto'>Nome do Produto</label>
                <input onChange={e => setNomeProduto(e.target.value)} type='text' class='form-control' id='nomeProduto' placeholder='Digite o nome do produto' />
            </div>
            <button type='button' class='btn btn-success' onClick={salvar}>Salvar</button>
        </form>
    )
}
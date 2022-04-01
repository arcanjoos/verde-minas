import React, { useEffect, useState } from 'react';
import firebase from '../database/firebase'

export default function Produtos() {

    const [usuarios, setUsuarios] = useState([])
    useEffect(() => {
        firebase.db.collection('usuarios').onSnapshot((querySnapshot) => {
            const usuarios = []
            querySnapshot.docs.forEach((doc) => {
                const { nome, telefone, categoria } = doc.data()
                if (categoria === 'FAZENDA')
                    usuarios.push({ id: doc.id, nome, telefone, categoria })
            })
            setUsuarios(usuarios)
        })
    }, [])


    console.log(usuarios)

    return (<div>


        <table class='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Nome</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map((u, i) => (
                    <tr>
                        <th scope='row'>{i + 1}</th>
                        <td>{u.nome}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}
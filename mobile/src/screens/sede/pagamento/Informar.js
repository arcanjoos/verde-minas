import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Headline, DataTable } from 'react-native-paper'

import firebase from '../../../database/firebase'
const optionsPerPage = [2, 3, 4];

export default function SedeInformarPagamento({ route, navigation }) {
  const [cotacoes, setCotacoes] = useState([])

  useEffect(() => {
    firebase.db.collection('cotacao').onSnapshot((querySnapshot) => {
      const cotacoes = []
      querySnapshot.docs.forEach((doc) => {
        const { status, embalagem, nomeFazenda, nomeProdutoServico, similar, unidade, } = doc.data()
        if (status === 'CONTA À PAGAR')
          cotacoes.push({ id: doc.id, embalagem, status, nomeFazenda, nomeProdutoServico, similar, unidade, })
      })
      setCotacoes(cotacoes)
    })
  }, [])

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);



  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>PRODUTO</DataTable.Title>
          <DataTable.Title numeric>VALOR TOTAL</DataTable.Title>
          <DataTable.Title numeric>DATA DE ENTREGA</DataTable.Title>
          <DataTable.Title numeric>VENDEDOR</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>CLETODIN</DataTable.Cell>
          <DataTable.Cell numeric>159</DataTable.Cell>
          <DataTable.Cell numeric>28/10/21</DataTable.Cell>
          <DataTable.Cell>PATOS MAQUINAS</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>CLETODIN</DataTable.Cell>
          <DataTable.Cell numeric>159</DataTable.Cell>
          <DataTable.Cell numeric>28/10/21</DataTable.Cell>
          <DataTable.Cell>UBERLANDIA MAQUINAS</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>CLETODIN</DataTable.Cell>
          <DataTable.Cell numeric>159</DataTable.Cell>
          <DataTable.Cell numeric>28/10/21</DataTable.Cell>
          <DataTable.Cell>UBERABA MAQUINAS</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>CLETODIN</DataTable.Cell>
          <DataTable.Cell numeric>159</DataTable.Cell>
          <DataTable.Cell numeric>28/10/21</DataTable.Cell>
          <DataTable.Cell>PATOS MAQUINAS</DataTable.Cell>
        </DataTable.Row>
{/* 
        <DataTable.Row>
          <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
          <DataTable.Cell numeric>237</DataTable.Cell>
          <DataTable.Cell numeric>8.0</DataTable.Cell>
        </DataTable.Row> */}

        <DataTable.Pagination
          page={page}
          numberOfPages={3}
          onPageChange={(page) => setPage(page)}
          // label="1-2 of 6"
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={'Rows per page'}
        />
      </DataTable>
    </ScrollView>
  )
}

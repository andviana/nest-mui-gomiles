import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { AppProps } from 'next/dist/shared/lib/router/router'
import React from 'react'
import Layout from '../../components/Layout'
import { TipoEntrada } from '../../types/TipoEntrada'
import { resumoListaTipoEntrada } from './helper'
import { getTipoEntradasResumo } from './tipoEntradaService'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../components/Title'
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton'

export interface IResumoTipoEntrada {
    tipoEntrada: TipoEntrada,
    countEntradas: number,
    valorTotalEntradas: number,
    valorTotalEntradasFormatado: string,
}

const ListTipoEntrada = ({ data }: AppProps) => {
    return (
        <Layout>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Title>Tipos de Entrada</Title>
                    {data.length > 0
                        ? (
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Código</TableCell>
                                        <TableCell>Descrição</TableCell>
                                        <TableCell align="center">Quantidade </TableCell>
                                        <TableCell align="right">Valor Total</TableCell>
                                        <TableCell>Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row: IResumoTipoEntrada) => (
                                        <TableRow key={row.tipoEntrada.id}>
                                            <TableCell>{row.tipoEntrada.id}</TableCell>
                                            <TableCell>{row.tipoEntrada.descricao}</TableCell>
                                            <TableCell align="center">{row.countEntradas}</TableCell>
                                            <TableCell align="right">{`$${row.valorTotalEntradasFormatado}`}</TableCell>
                                            <TableCell>
                                                <IconButton color="primary" aria-label="listar entradas">
                                                    <SearchIcon />
                                                </IconButton>
                                                <IconButton color="primary" aria-label="editar entrada">
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )
                        : <p>Nenhum tipo de entrada encontrado</p>
                    }
                    {console.log(data)}
                </Paper>
            </Grid>
        </Layout >

    )
}

export async function getServerSideProps() {
    // Fetch data from external API    
    const resultado = await getTipoEntradasResumo();
    const data = resumoListaTipoEntrada(resultado);
    // Pass data to the page via props
    return { props: { data } }
}

export default ListTipoEntrada

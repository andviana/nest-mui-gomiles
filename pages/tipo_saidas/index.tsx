import { Avatar, FormControlLabel, Grid, IconButton, Link, Paper, Switch, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, TextField } from '@mui/material'
import { AppProps } from 'next/dist/shared/lib/router/router'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import Title from '../../components/Title'
import { routes } from '../../config/routes'
import { IResumoTipoEntrada, ITableResumoTipoEntrada, resumoListaTipoEntrada } from '../../services/tipoEntrada/helper'
import { deletarTipoEntrada, getTipoEntradasResumo } from '../../services/tipoEntrada/tipoEntradaService'
import AddIcon from '@mui/icons-material/Add';
import { HeadCell } from '../../types/HeadCell'
import { getComparator, Order, stableSort } from '../../utility/comparator'
import EnhancedTableHead from '../../components/EnhancedTableHead'
import Swal from 'sweetalert2';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { stringAvatar } from '../../utility/avatarUtil'

const TipoSaidas = ({ data }: AppProps) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('descricao');
    const [dense, setDense] = React.useState(false);

    const router = useRouter();

    const rows = data.map((item: IResumoTipoEntrada) => {
        return {
            id: item.tipoEntrada.id,
            descricao: item.tipoEntrada.descricao,
            countEntradas: item.countEntradas,
            valorTotalEntradas: item.valorTotalEntradas,
            valorTotalEntradasFormatado: item.valorTotalEntradasFormatado
        } as ITableResumoTipoEntrada
    });

    const headCells = [
        { align: 'left', disablePadding: true, id: '', label: '', onlyHeader: true } as HeadCell,
        { align: 'left', disablePadding: true, id: 'id', label: 'Código' } as HeadCell,
        { align: 'left', disablePadding: true, id: 'descricao', label: 'Descrição' } as HeadCell,
        { align: 'center', disablePadding: true, id: 'countEntradas', label: 'Qtd' } as HeadCell,
        { align: 'right', disablePadding: true, id: 'valorTotalEntradasFormatado', label: 'Valor' } as HeadCell,
        { align: 'center', disablePadding: true, id: '', label: 'Ações', onlyHeader: true } as HeadCell,
    ];

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: string,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;



    return (
        <Layout>
            <Title
                titleText='Tipos de Entrada'
                link={routes.tipoEntrada.create}
                iconLabel='novo'
                icon={AddIcon}
            />

            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    {data.length > 0
                        ? (
                            <>
                                <TableContainer>
                                    <Table size={dense ? 'small' : 'medium'}>
                                        <EnhancedTableHead
                                            order={order}
                                            orderBy={orderBy}
                                            onRequestSort={handleRequestSort}
                                            rowCount={rows.length}
                                            headCells={headCells}
                                        />
                                        <TableBody>
                                            {stableSort(rows, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => {
                                                    return (
                                                        <TableRow
                                                            hover
                                                            tabIndex={-1}
                                                            key={row.id}
                                                        >
                                                            <TableCell align="left"><Avatar {...stringAvatar(row.descricao.toString())} /></TableCell>
                                                            {headCells.map((cell: HeadCell) => !cell.onlyHeader && (
                                                                <TableCell 
                                                                align={cell.align}
                                                                padding={cell.disablePadding ? 'none' : 'normal'}
                                                                >
                                                                    {row[`${cell.id}`]}
                                                                </TableCell>
                                                            ))
                                                            }
                                                            <TableCell align="center">
                                                                <IconButton color="primary" aria-label="listar tipos de entradas" onClick={() => Swal.fire({
                                                                    icon: 'info',
                                                                    titleText: `id: ${row.id}`,
                                                                    text: `descrição: ${row.descricao}`,
                                                                    showCloseButton: true,
                                                                })}>
                                                                    <SearchIcon />
                                                                </IconButton>
                                                                <Link href={`${routes.tipoEntrada.edit}/${row.id}`}>
                                                                    <IconButton color="primary" aria-label="editar tipo de entrada" >
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                </Link>
                                                                <IconButton color="primary" aria-label="apagar tipo de entrada" onClick={() => Swal.fire({
                                                                    title: 'Deseja realmente excluir este registro?',
                                                                    text: 'Se você confirmar, este registro será excluido do sistema',
                                                                    icon: 'warning',
                                                                    showCancelButton: true,
                                                                    confirmButtonText: 'Sim, remova!'
                                                                }).then((result) => {
                                                                    console.log('resultado: ', result);
                                                                    if (result && result.isConfirmed) {
                                                                        deletarTipoEntrada(row.id.toString())
                                                                            .then(() => Swal.fire('Registro excluido com sucesso!'))
                                                                            .then(() => router.push(routes.tipoEntrada.index))
                                                                    }
                                                                })}>
                                                                    <DeleteIcon />
                                                                </IconButton>

                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            {emptyRows > 0 && (
                                                <TableRow
                                                    style={{
                                                        height: (dense ? 33 : 53) * emptyRows,
                                                    }}
                                                >
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    labelRowsPerPage="Registros por página"
                                />
                                <FormControlLabel
                                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                                    label="formato compacto"
                                />
                            </>
                        )
                        : <p>Nenhum tipo de entrada encontrado</p>
                    }
                </Paper>
            </Grid>

        </Layout >
    )
}

export default TipoSaidas

export async function getServerSideProps() {
    // Fetch data from external API    
    const resultado = await getTipoEntradasResumo();
    const data = resumoListaTipoEntrada(resultado);
    // Pass data to the page via props
    return { props: { data } }
}
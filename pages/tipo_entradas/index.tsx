import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { AppProps } from 'next/dist/shared/lib/router/router'
import React from 'react'
import Layout from '../../components/Layout'
import { IResumoTipoEntrada, ITableResumoTipoEntrada, resumoListaTipoEntrada, resumoTipoEntradaHeadCells } from '../../services/tipoEntrada/helper'
import { deletarTipoEntrada, getTipoEntradasResumo } from '../../services/tipoEntrada/tipoEntradaService'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';
import { routes } from '../../config/routes'
import Swal from 'sweetalert2'
import Title from '../../components/Title'
import Link from 'next/link'
import { Avatar, Box, FormControlLabel, Switch, TableContainer, TablePagination, TableSortLabel, Toolbar, Tooltip, Typography } from '@mui/material'
import { getComparator, Order, stableSort } from '../../utility/comparator'
import { visuallyHidden } from '@mui/utils';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { stringAvatar } from '../../utility/avatarUtil'
import { useRouter } from 'next/router'



interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ITableResumoTipoEntrada) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

const EnhancedTableHead: React.FC<EnhancedTableProps> = (props) => {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof ITableResumoTipoEntrada) =>
        (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };
    return (
        <TableHead>
            <TableRow>
                <TableCell
                    padding='normal'
                    align='left'
                >
                    #
                </TableCell>
                {resumoTipoEntradaHeadCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell
                    padding='normal'
                    align='center'
                >
                    Ações
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
    title?: string;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { title } = props;
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                {title ?? 'Registros encontrados'}
            </Typography>

            <Tooltip title="Filter list">
                <IconButton>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
};

const ListTipoEntrada = ({ data }: AppProps) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof ITableResumoTipoEntrada>('descricao');
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

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof ITableResumoTipoEntrada,
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
                                        />
                                        <TableBody>
                                            {stableSort(rows, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => {
                                                    const labelId = `enhanced-table-checkbox-${index}`;
                                                    return (
                                                        <TableRow
                                                            hover
                                                            tabIndex={-1}
                                                            key={row.descricao}
                                                        >
                                                            <TableCell align="left"><Avatar {...stringAvatar(row.descricao.toString())} /></TableCell>
                                                            <TableCell align="left">{row.id}</TableCell>
                                                            <TableCell align="left">{row.descricao}</TableCell>
                                                            <TableCell align="center">{row.countEntradas}</TableCell>
                                                            <TableCell align="right">{row.valorTotalEntradasFormatado}</TableCell>
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
                                                                    console.log('resultado: ',result);
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

export async function getServerSideProps() {
    // Fetch data from external API    
    const resultado = await getTipoEntradasResumo();
    const data = resumoListaTipoEntrada(resultado);
    // Pass data to the page via props
    return { props: { data } }
}

export default ListTipoEntrada

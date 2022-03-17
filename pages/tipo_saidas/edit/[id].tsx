import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import React, { FormEvent, useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { msgEdicaoErro, msgEdicaoSucesso } from '../../../components/mensagens'
import { routes } from '../../../config/routes'
import { editarTipoEntrada, getTipoEntrada } from '../../../services/tipoEntrada/tipoEntradaService'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import TipoEntradaForm from '../../../components/TipoEntrada/tipoEntradaForm'
import { TipoEntrada } from '../../../types/TipoEntrada'
import Title from '../../../components/Title'
import { useRouter } from 'next/router'
import { Typography } from '@mui/material'



const EditTipoEntrada = () => {
    const router = useRouter();
    const { id } = router.query;    
    const [formData, setFormData] = useState({} as TipoEntrada);

    useEffect(() => {
        const getData = async () => {           
            const data:TipoEntrada = await getTipoEntrada(id as string);
            await setFormData(data);
        }
        getData();
    }, []);

    const editTipoEntrada = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const data = await editarTipoEntrada(formData);
            msgEdicaoSucesso();
        } catch (error) {
            msgEdicaoErro(JSON.stringify(error));
        }
    }

    return (
        <Layout>
            <Title
                titleText='Cadastrar Tipos de Entrada '
                link={routes.tipoEntrada.index}
                iconLabel='voltar'
                icon={ChevronLeftIcon}
            />
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            
            {formData && !!formData.id 
            ? (
                    <form onSubmit={editTipoEntrada}>
                        <TipoEntradaForm formData={formData} setFormData={setFormData} buttonLabel="alterar" />
                    </form>
            ):(
                <Typography variant='body1'>
                    Ocorreu um erro ao tentar alterar o registro!
                </Typography>
            )}
        </Paper>
        </Grid>

            
        </Layout>
    )
}
export default EditTipoEntrada
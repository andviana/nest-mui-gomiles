import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import React, { FormEvent, useState } from 'react'
import Layout from '../../../components/Layout'
import { msgCadastroErro, msgCadastroSucesso } from '../../../components/mensagens'
import { routes } from '../../../config/routes'
import { cadastrarTipoEntrada } from '../../../services/tipoEntrada/tipoEntradaService'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import TipoEntradaForm from '../../../components/TipoEntrada/tipoEntradaForm'
import { TipoEntrada } from '../../../types/TipoEntrada'
import Title from '../../../components/Title'
import { useRouter } from 'next/router'

const CreateTipoEntrada = () => {
    const [formData, setFormData] = useState({ descricao: '' } as TipoEntrada);
    const router = useRouter();


    const createTipoEntrada = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const data = await cadastrarTipoEntrada(formData);
            await msgCadastroSucesso();
            router.push(routes.tipoEntrada.index);
        } catch (error) {
            msgCadastroErro(JSON.stringify(error));
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
                    <form onSubmit={createTipoEntrada}>
                        <TipoEntradaForm formData={formData} setFormData={setFormData} />                        
                    </form>
                </Paper>
            </Grid>
        </Layout>
    )
}

export default CreateTipoEntrada
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { FormEvent, useState } from 'react'
import Layout from '../../components/Layout'
import { msgCadastroErro, msgCadastroSucesso } from '../../components/mensagens'
import Title from '../../components/Title'
import { cadastrarTipoEntrada } from './tipoEntradaService'


interface ICustomEvent {
    preventDefault: () => void,
    target: {
        name: string,
        value: string
    }
}

const CreateTipoEntrada = () => {
    const [formData, setFormData] = useState({ descricao: '' });

    const onChangeInput = (e: ICustomEvent) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const createTipoEntrada = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const data = await cadastrarTipoEntrada(formData);
            msgCadastroSucesso();
        } catch (error) {
            msgCadastroErro(JSON.stringify(error));
        }
    }

    return (
        <Layout>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Title>Cadastro de Tipo de Entrada</Title>
                    <form onSubmit={createTipoEntrada}>
                        <div style={{ width: "400px", padding: "5px" }}>
                            <Typography variant="body2">
                                Informe a Descrição do Tipo de Entrada:
                            </Typography>
                            <TextField
                                fullWidth
                                type="text"
                                label="Descrição"
                                variant="outlined"
                                name="descricao"
                                value={formData.descricao}
                                onChange={onChangeInput}
                                margin="normal"
                            />

                            <Button variant="contained" color="primary" type='submit'>
                                salvar
                            </Button>
                        </div>


                    </form>
                </Paper>
            </Grid>
        </Layout>
    )
}

export default CreateTipoEntrada
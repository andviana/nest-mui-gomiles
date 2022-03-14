import { Box, Stack } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React from 'react'
import { TipoEntrada } from '../../types/TipoEntrada'
import SaveIcon from '@mui/icons-material/Save'

interface ICustomEvent {
    preventDefault: () => void,
    target: {
        name: string,
        value: string
    }
}

export interface ITipoEntradaForm {
    formData: TipoEntrada,
    setFormData(data: TipoEntrada): void,
    buttonLabel?: string
}

const TipoEntradaForm: React.FC<ITipoEntradaForm> = (props) => {

    const { formData, setFormData, buttonLabel } = props;

    const onChangeInput = (e: ICustomEvent) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <Stack direction="column" spacing={2}>
            <Typography variant="body2">
                Informe a descrição:
            </Typography>

            <TextField
                fullWidth
                type="text"
                label="Descrição"
                variant="outlined"
                name="descricao"
                value={formData.descricao}
                onChange={onChangeInput}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant="contained" color="primary" type='submit' startIcon={<SaveIcon />}>
                    {buttonLabel || 'salvar'}
                </Button>
            </Box>
        </Stack>
    )
}

export default TipoEntradaForm
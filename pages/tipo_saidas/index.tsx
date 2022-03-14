import { Box, TextField } from '@mui/material'
import React from 'react'
import Title from '../../components/Title'

const TipoSaidas: React.FC = () => {
    return (
        <>
            
            <div>
                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                    }}
                >
                    <form>
                        <TextField
                            fullWidth
                            id="descricao"
                            label="Descrição"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                </Box>

            </div>

        </>
    )
}

export default TipoSaidas
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';



interface EnhancedTableToolbarProps {
    numSelected: number;
    title?: string;
  }
  
  const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  
    const {title} = props;
  
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

export default EnhancedTableToolbar
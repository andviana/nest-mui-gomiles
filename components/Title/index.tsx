import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, IconProps, SvgIconProps, SvgIconTypeMap } from '@mui/material';
import Link from 'next/link';


interface TitleProps {
  titleText: string,
  link?:string,
  iconLabel?: string,
  icon: any
}

const Title:React.FC<TitleProps> = (props) => {
  const {titleText, link, icon:Icon, iconLabel} = props;
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 1,
          m: 1,
        }}
      >
        <Typography variant='h5'>{titleText}</Typography>
        {link && (
          <Link href={link}>
            <Button variant="contained" startIcon={<Icon/>}>
              {iconLabel}
            </Button>
          </Link>
        )}
      </Box>
    </Grid>
  );
}
export default Title;
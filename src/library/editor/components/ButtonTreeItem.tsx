import { TreeItem } from '@mui/lab';
import { Button, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';

interface Props {
  nodeId: string;
  buttons: ReturnType<typeof Button>[];
  label: React.ReactNode;
  children?: React.ReactNode;
}

const ButtonTreeItem: FC<Props> = ({
  nodeId,
  buttons,
  label,
  children,
}) => (
  <TreeItem nodeId={ nodeId } label={
    <Grid container sx={{ alignItems: 'center', gap: 1, padding: 1 }}>
      <Grid>
        <Typography variant='body1'>{ label }</Typography>
      </Grid>
      { buttons.map(button => (
        <Grid>
          { button }
        </Grid>
      ))}
    </Grid>
  }>
    { children }
  </TreeItem>
);

export default ButtonTreeItem;

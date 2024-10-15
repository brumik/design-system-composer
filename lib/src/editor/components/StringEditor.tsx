import { Grid, Input, Typography } from '@mui/material';
import  { FC } from 'react';
import { useDataContext, useUserInteractionContext } from '../../Providers';
import { updateElement } from '../utils/helpers';
import ResetButton from './ResetButton';

interface Props {
  propName: string;
}

const StringEditor: FC<Props> = ({
  propName,
}) => {
  const { selectedElement } = useUserInteractionContext();
  const { setElement } = useDataContext();

  // Early quit, should not happen at all
  if (!selectedElement)
    return null;

  const onChange = (value: string) => {
    const newElement = updateElement(selectedElement, value, propName);
    setElement(selectedElement.id, newElement);
  }

  const currentValue = selectedElement._map
    ? selectedElement.props[propName]
    : selectedElement.value;

  return (
    <Grid container sx={{ alignItems: 'center' }}>
      <Grid item xs={3} sx={{ wordWrap: 'break-word' }}>
        <Typography variant='body1'>{ propName }:</Typography>
      </Grid>
      <Grid item xs={5} sx={{ paddingRight: 1 }}>
        <Input
          fullWidth
          type="string"
          value={ currentValue ?? '' }
          onChange={ e => onChange(e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <ResetButton propName={ propName } />
      </Grid>
    </Grid>
  )
};

export default StringEditor;

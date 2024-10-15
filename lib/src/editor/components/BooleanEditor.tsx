import { Grid, Switch, Typography } from '@mui/material';
import  { FC, useMemo } from 'react';
import { useDataContext, useUserInteractionContext } from '../../Providers';
import { updateElement } from '../utils/helpers';
import ResetButton from './ResetButton';

interface Props {
  propName: string;
}

const BooleanEditor: FC<Props> = ({
  propName,
}) => {
  const { selectedElement } = useUserInteractionContext();
  const { setElement } = useDataContext();

  const currentValue = useMemo(() => 
    selectedElement?._map
      ? selectedElement?.props[propName] ?? false
      : selectedElement?.value,
    [propName, selectedElement]
  );

  // Early quit, should not happen at all
  if (!selectedElement)
    return null;

  const onChange = (value: boolean) => {
    const newElement = updateElement(selectedElement, value, propName);
  
    setElement(selectedElement.id, newElement);
  }

  return (
    <Grid container sx={{ alignItems: 'center' }}>
      <Grid item xs={3} sx={{ wordWrap: 'break-word' }}>
        <Typography variant='body1'>{ propName }:</Typography>
      </Grid>
      <Grid item xs={5} sx={{ paddingRight: 1 }}>
        <Switch
          checked={ !!currentValue }
          onChange={ (e) => onChange(e.target.checked) }
        />
      </Grid>
      <Grid item xs={4}>
        <ResetButton propName={ propName } />
      </Grid>
    </Grid>
  );
};

export default BooleanEditor;

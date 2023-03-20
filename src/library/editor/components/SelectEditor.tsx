import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import  { FC } from 'react';
import { useDataContext, useUserInteractionContext } from '../../Providers';
import { ComponentConfigurationSelectFormatEntry, USE_EVAL_TAG } from '../../types';
import { updateElement } from '../utils/helpers';
import ResetButton from './ResetButton';

interface Props {
  propName: string;
}

const SelectEditor: FC<Props> = ({
  propName,
}) => {
  const { selectedElement } = useUserInteractionContext();
  const { setElement, config } = useDataContext();

  // Ealry quit, if element does not have an option, should not happen
  if (!selectedElement || !selectedElement?._map)
    return null;

  const onChange = (value: string) => {
    const newElement = updateElement(selectedElement, value, propName);
    setElement(selectedElement.id, newElement);
  }

  const currentValue = selectedElement.props[propName]

  const propConfig = config[selectedElement.name][propName] as ComponentConfigurationSelectFormatEntry;

  return (
    <Grid container sx={{ alignItems: 'center' }}>
      <Grid item xs={8} sx={{ paddingRight: 1 }}>
        <FormControl fullWidth size='small'>
          <InputLabel>{ propName }</InputLabel>
          <Select
            value={currentValue ?? ''}
            label={ propName }
            onChange={ e => onChange(e.target.value) }
          >
            { propConfig.options.map(el => {
              if (typeof el === 'string') {
                return (
                  <MenuItem
                    key={ el }
                    value={ el }
                  >
                    { el }
                  </MenuItem>
                );
              } else {
                return (
                  <MenuItem
                    key={ el.key }
                    value={ `${el.useEval ? USE_EVAL_TAG : ''}${el.value}` }
                  >
                    { el.key }
                  </MenuItem>
                );
              }
            }) }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4} sx={{ padidingLeft: 1 }}>
        <ResetButton propName={ propName } />
      </Grid>
    </Grid>
  )
};

export default SelectEditor;

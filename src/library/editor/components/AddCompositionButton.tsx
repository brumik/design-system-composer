import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import  { FC, useEffect, useState } from 'react';
import { useCompositionContext, useDataContext, useUserInteractionContext } from '../../Providers';
import { 
  ComponentConfigurationNodeFormatEntry,
  SchemaFormatParent
} from '../../types';

const SIMPLE_ELEMENT_NAME = 'Simple string element';

interface Props {
  parent?: SchemaFormatParent
}

const AddCompositionButton: FC<Props> = ({
  parent = null,
}) => {
  const { config } = useDataContext();
  const { loadComposition, listCompositions } = useCompositionContext();
  const { selectedElement } = useUserInteractionContext();
  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    if (!options().includes(selectedOption) && selectedOption !== '')
      setSelectedOption('');

    // eslint-disable-next-line
  }, [parent]);

  const options = (): string[] => {
    // Apply the only option:
    // if parent not presetn and we have root config only, use that one
    // if parent present use the parent's (current selected element) component name only
    // otherwise empty so we don't filter
    const onlyFilter = parent === null
      ? undefined
      : (selectedElement?._map && (
        (config[selectedElement.name][parent.propName] as ComponentConfigurationNodeFormatEntry)?.only
      )) || undefined;

    return (onlyFilter
      ? listCompositions().filter(el => onlyFilter.includes(el.componentName))
      : listCompositions()).map(el => el.name);
  };

  if (options().length < 1) {
    return null;
  }

  return (
    <Grid container sx={{ alignItems: 'center' }}>
      <Grid item xs={8} sx={{ paddingRight: 1 }}>
        <Autocomplete
          size='small'
          renderInput={(params) => <TextField {...params} label="Select composition" />}
          options={ [SIMPLE_ELEMENT_NAME, ...options()] }
          onChange={ (_, value) => setSelectedOption(value ?? '') }
          value={ selectedOption }
        />
      </Grid>
      <Grid item xs={4}>
        <Button
          fullWidth
          size='medium'
          variant='contained'
          onClick={ () => loadComposition(selectedOption, parent) }
        >
          Add composition
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddCompositionButton;

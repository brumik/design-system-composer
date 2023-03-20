import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import  { FC, useCallback, useEffect, useState } from 'react';
import { useDataContext, useUserInteractionContext } from '../../Providers';
import { 
  ComponentConfigurationFormat,
  ComponentConfigurationNodeFormatEntry,
  SchemaFormat,
  SchemaFormatParent
} from '../../types';
import { updateElement } from '../utils/helpers';

const SIMPLE_ELEMENT_NAME = 'Simple string element';

const createElementPreviewEntry = (
  name: string,
  parent: SchemaFormatParent = null,
  config: ComponentConfigurationFormat,  
): SchemaFormat => {
  // Creating simple element
  if (name === SIMPLE_ELEMENT_NAME) {
    return ({
      _map: false,
      id: Date.now().toString(),
      parent,
      value: 'Simple element placeholder'
    })
  }

  const props = {} as Record<string, any>;
  Object.entries(config[name]).forEach(([key, value]) => {
    if (value?.defaultValue) {
      props[key] = value.defaultValue
    }
  });

  return ({
    _map: true,
    id: Date.now().toString(),
    parent,
    name,
    props
  });
};

interface Props {
  parent?: SchemaFormatParent
}

const AddElementButton: FC<Props> = ({
  parent = null,
}) => {
  const { addElement, setElement, config } = useDataContext();
  const { selectedElement } = useUserInteractionContext();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const options = useCallback((): string[] => {
    let avaiableElements = Object.keys(config);

    const onlyFilter = parent === null 
      ? undefined
      : (selectedElement?._map && (
        (config[selectedElement.name][parent.propName] as ComponentConfigurationNodeFormatEntry)?.only
      )) || undefined;


    if (onlyFilter) {
      avaiableElements = avaiableElements.filter(el => onlyFilter.includes(el));
    }

    return avaiableElements;
  }, [parent, config, selectedElement]);

  useEffect(() => {
    if (!options().includes(selectedOption) && selectedOption !== '')
      setSelectedOption('');

    // We wanna just react when parent changes, not more often.
    // eslint-disable-next-line
  }, [parent]);

  return (
    <Grid container sx={{ alignItems: 'center' }}>
      <Grid item xs={8} sx={{ paddingRight: 1 }}>
        <Autocomplete
          size='small'
          renderInput={(params) => <TextField {...params} label="Select element" />}
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
          onClick={ () => {
            addElement(
              createElementPreviewEntry(selectedOption, parent, config)
            );
            
            if (parent && selectedElement) {
              const newElement = updateElement(selectedElement, { _map: true }, parent?.propName);
              setElement(parent.id, newElement);
            }
          }
        }
        >
          Add element
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddElementButton;

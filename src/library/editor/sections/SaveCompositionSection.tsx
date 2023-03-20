import { TreeView } from '@mui/lab';
import { Box, Button, Card, CardContent, Grid,      Input, Typography } from '@mui/material';
import  { FC, useCallback, useEffect, useState } from 'react';
import { useCompositionContext } from '../../Providers';
import { SchemaFormat } from '../../types';
import useLocalStorage from '../utils/useLocalStorage';
import ButtonTreeItem from '../components/ButtonTreeItem';

const LOCAL_STORAGE_KEY = 'composition'; 

const SaveCompositionSection: FC<Record<never, never>> = () => {
  const { compositions, setCompositions } = useCompositionContext();
  const [presets, setPresets] = useState<string[]>([]);
  const [nameInput, setNameInput] = useState('');
  const {
    list,
    getItem,
    saveItem,
    deleteItem,
    clearAll,
  } = useLocalStorage<Record<string, SchemaFormat[]>>(LOCAL_STORAGE_KEY, {});

  const getPresetNames = useCallback(
    (db: ReturnType<typeof list>) => Object.keys(db),
    []
  );

  useEffect(() => {
    setPresets(
      getPresetNames(list())
    );
  }, [getPresetNames, list])

  const onSave = (name: string) => {
    const newPresets = saveItem(name, compositions);
    setPresets(getPresetNames(newPresets));
  };

  const onLoad = (name: string) => {
    setCompositions(getItem(name));
  };

  const onDelete = (name: string) => {
    const newPresets = deleteItem(name);
    setPresets(getPresetNames(newPresets));
  }

  const onClear = () => {
    clearAll();
    setPresets([]);
  }

  return (
    <Card sx={{ marginTop: 1 }}>
      <CardContent>
        <Typography variant="h6">Manage composition sets</Typography>
        <Typography variant="caption">
            You can save and load sets of compositions you created. When saving all the compostions
            that are currently active will be saved in the local storage of your browser. When you 
            load a set of compositions the active set will be replaced.
        </Typography>
        <Grid container sx={{ marginTop: 1 }}>
          <Grid xs={12} md={7} sx={{ padding: 1 }}>
            <Input
              fullWidth
              placeholder="Composition set name"
              value={ nameInput }
              onChange={ (e) => setNameInput(e.target.value) }
            />
          </Grid>
          <Grid xs={12} md={5} sx={{ padding: 1 }}>
            <Button
              fullWidth
              size="small"
              variant='contained'
              color='secondary'
              onClick={() => { 
                onSave(nameInput);
                setNameInput('');
              }}
            >
              Save active set
            </Button>
          </Grid>
        </Grid>
        { !presets.length && 
          <Box sx={{ textAlign: 'center', padding: 1 }}>
            <Typography variant='body2'>No saved items yet.</Typography>
          </Box>
        }
        { !!presets.length &&
          <Box>
            <TreeView>
              { presets.map(el => (
                <ButtonTreeItem
                  nodeId={el}
                  label={el}
                  buttons={[
                    <Button size="small" variant='outlined' onClick={() => onLoad(el)}>
                      Load
                    </Button>,
                    <Button size="small" variant='outlined' color='error' onClick={() => onDelete(el)}>
                      Delete
                    </Button>
                  ]}
                />
              ))}
            </TreeView>
            <Box sx={{ textAlign: 'center', padding: 1 }}>
              <Button variant='contained' color='error' size='small' onClick={ () => onClear() }>Delete All</Button>
            </Box>
          </Box>
        }
      </CardContent>
    </Card>
  );
};

export default SaveCompositionSection;

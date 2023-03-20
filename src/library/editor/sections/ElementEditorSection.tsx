import { Box, Button, Card, CardContent, Grid, Typography, Input, Divider } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useCompositionContext, useDataContext, useUserInteractionContext } from '../../Providers';
import FormElement from '../components/FormElement';

const ElementEditorSection: FC<Record<never, never>> = () => {
  const {
    selectedElement,
    setSelectedElement,
  } = useUserInteractionContext();
  const { config } = useDataContext();
  const { saveComposition } = useCompositionContext();
  const [compositionName, setCompositionName] = useState('');

  const selectParent = (id?: string) => {
    if (!id) return;
    setSelectedElement(id);
  };
  
  useEffect(() => {
    setCompositionName('');
  }, [selectedElement]);

  return (
    <Box>
      { selectedElement && <>
        <Card>
          <CardContent>
            <Grid container sx={{ marginBottom: 2 }}>
              <Grid item xs={9}>
                <Typography variant='h6'>
                  Selected: {selectedElement?._map ? selectedElement?.name : 'string'} [{selectedElement?.id}]
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button
                  fullWidth
                  size='small'
                  variant='outlined'
                  color='error'
                  onClick={() => setSelectedElement('')}
                >
                  Deselect
                </Button>
              </Grid>
            </Grid>
            <Typography variant='caption'>
              You can save this element as a component composition.
            </Typography>
            <Grid container sx={{ marginTop: 1 }}>
              <Grid item xs={12} md={7} sx={{ padding: 1 }}>
                <Input
                  fullWidth
                  placeholder="Saved tree name"
                  value={ compositionName }
                  onChange={ (e) => setCompositionName(e.target.value) }
                />
              </Grid>
              <Grid item xs={12} md={5} sx={{ padding: 1 }}>
                <Button
                  fullWidth
                  size="small"
                  variant='contained'
                  color='secondary'
                  onClick={() => { 
                    saveComposition(compositionName, selectedElement.id);
                    setCompositionName('Saved!');
                  }}
                >
                  Save as composition
                </Button>
              </Grid>
              { (selectedElement.parent) && (
                <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 3 }}>
                  <Button
                    size='small'
                    variant='outlined'
                    onClick={ () => selectParent(selectedElement?.parent?.id) }
                  >
                    Select parent element
                  </Button>
                </Grid> 
              )}
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ marginTop: 1 }}>
          <CardContent>
            <Typography variant='h6'>Element properties</Typography>
            <Typography variant='caption'>
              Here you can edit all the prop of your elements, adding new elements to them or removing them.
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              { selectedElement._map && 
                Object.entries(config[selectedElement.name]).map(([key, entry]) =>
                    <Box key={key}>
                      <Divider sx={{ marginY: 3 }} />
                      <FormElement
                        propConfig={entry}
                        propName={key}
                      />
                    </Box>
              )}
              { !selectedElement._map &&
                <>
                  <FormElement
                    propConfig={{ type: 'string' }}
                    propName='Value'
                  />
                </>
              }
            </Box>
          </CardContent>
        </Card>
      </>}
      { !selectedElement && (
        <Typography variant='caption'>
          You did not selected any elements.
        </Typography>
      )}
    </Box>
  );
};

export default ElementEditorSection;

import { TreeView } from '@mui/lab';
import { Box, Button, Typography } from '@mui/material';
import  { FC } from 'react';
import { useCompositionContext } from '../../Providers';
import ButtonTreeItem from '../components/ButtonTreeItem';
import SaveCompositionSection from './SaveCompositionSection';

const CompositionList: FC<Record<never, never>> = () => {
  const { listCompositions, deleteComposition } = useCompositionContext();
  const elements = listCompositions();

  return (
    <Box>
      <Typography variant="caption">
        Once you create an element in the editor you can save it as a composition.
        This will save the item and all items and settings in it. Later you can
        use this element to add to your other designs.
      </Typography>
      <Box sx={{ marginTop: 1 }}>
        <TreeView>
        { elements.length > 0 ? (
          <>
              { elements.map(el => (
                <ButtonTreeItem
                  nodeId={ el.name }
                  label={ `${ el.name } [${ el.componentName }]` }
                  buttons={[
                    <Button size="small" variant="outlined" color="error" onClick={ () => deleteComposition(el.name) }>
                      Delete
                    </Button>
                  ]}
                />
              ))}
          </>
        ) : (
          <Box sx={{ textAlign: 'center', padding: 1 }}>
            <Typography variant='body2'>No compositions active.</Typography>
          </Box>
        )}
        </TreeView>
      </Box>
      <SaveCompositionSection />
    </Box>
  );
}

export default CompositionList;

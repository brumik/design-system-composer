import  { FC } from 'react';
import { useDataContext, useUserInteractionContext } from '../../Providers';
import { Box, Button, Typography } from '@mui/material';
import ButtonTreeItem from './ButtonTreeItem';

interface Props {
  parentId: string | null;
}

const ElementTree: FC<Props> = ({
  parentId
}) => {
  const { deleteElement, getChildren, rootElements } = useDataContext();
  const { setSelectedElement } = useUserInteractionContext();

  const elements = parentId ? getChildren(parentId) : rootElements;

  return <>{ elements.length > 0 ?
    elements.map(el => {
      const label = el?._map ? el.name : `Atomic: ${el.value}`;
      return (
        <ButtonTreeItem
          key={ el.id }
          nodeId={ el.id }
          label={ label }
          buttons={[
            <Button size="small" variant='outlined' onClick={ () => setSelectedElement(el.id) }>
              Select
            </Button>,
            <Button size="small" variant='outlined' color='error' onClick={ () => deleteElement(el.id) }>
              Delete
            </Button>
          ]}
        >
          <ElementTree parentId={ el.id } />
        </ButtonTreeItem>
      );
    })
    : !parentId && 
      <Box sx={{ textAlign: 'center', padding: 1 }}>
        <Typography variant="body2">
          No elements to display. Add elements to your root.
        </Typography>
      </Box>
    }</>
}

export default ElementTree;

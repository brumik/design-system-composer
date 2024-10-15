import { TreeView } from '@mui/lab';
import { Button } from '@mui/material';
import  { FC } from 'react';
import { useDataContext, useUserInteractionContext } from '../../Providers';
import { SchemaFormat } from '../../types';
import ButtonTreeItem from './ButtonTreeItem';

interface Props {
  elements: SchemaFormat[];
}

const ChildrenList: FC<Props> = ({
  elements
}) => {
  const { deleteElement } = useDataContext();
  const { setSelectedElement } = useUserInteractionContext();

  return elements.length > 0 ? (
    <TreeView>
      { elements.map(el =>
        <ButtonTreeItem
          key={el.id}
          nodeId={el.id}
          label={el._map ? el.name : 'string'}
          buttons={[
            <Button
              size="small"
              variant='outlined'
              onClick={() => setSelectedElement(el.id)
            }>
              Select
            </Button>,
            <Button
              size="small"
              variant='outlined'
              color='error'
              onClick={() => deleteElement(el.id) }
            >
              Delete
            </Button>
          ]}
        />
      )}
    </TreeView>
  ) : null;
};

export default ChildrenList;

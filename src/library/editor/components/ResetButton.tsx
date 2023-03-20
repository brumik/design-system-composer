import { Button } from '@mui/material';
import  { FC } from 'react';
import { useDataContext, useUserInteractionContext } from '../../Providers';
import { updateElement } from '../utils/helpers';

interface Props {
  propName: string;
  [key: string]: any;
}

const ResetButton: FC<Props> = ({
  propName,
  ...props
}) => {
  const { selectedElement } = useUserInteractionContext();
  const { setElement, config } = useDataContext();

  // Ealry quit, if element cannot be reset
  if (!selectedElement || !selectedElement?._map)
    return null;

  const propConfig = config[selectedElement.name][propName];

  const onClick = () => {
    const value = propConfig.defaultValue ?? undefined;
    const newElement = updateElement(selectedElement, value, propName);
  
    setElement(selectedElement.id, newElement);
  }

  return (
    <Button
      variant='outlined'
      color='warning'
      fullWidth
      onClick={ onClick }
      {...props}
    >
      Reset value
    </Button>
  );
};

export default ResetButton;
import  { FC } from 'react';
import { useDataContext, useUserInteractionContext } from '../Providers';
import { updateElement } from './helpers';

interface Props {
  propName: string;
}

const ResetButton: FC<Props> = ({
  propName
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
    <button
      onClick={ onClick }
    >
      { propConfig.defaultValue ? 'Set to default' : 'Set to undefined' }
    </button>
  );
};

export default ResetButton;
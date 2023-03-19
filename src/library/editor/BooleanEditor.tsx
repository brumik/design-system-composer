import  { FC } from 'react';
import { useDataContext, useUserInteractionContext } from '../Providers';
import { updateElement } from './helpers';

interface Props {
  propName: string;
}

const BooleanEditor: FC<Props> = ({
  propName,
}) => {
  const { selectedElement } = useUserInteractionContext();
  const { setElement } = useDataContext();

  // Early quit, should not happen at all
  if (!selectedElement)
    return null;

  const onChange = (value: boolean) => {
    const newElement = updateElement(selectedElement, value, propName);
  
    setElement(selectedElement.id, newElement);
  }

  const currentValue = selectedElement._map
    ? selectedElement.props[propName]
    : selectedElement.value;

  return (
    <>
      <label>{propName}: </label>
      <input
        type="checkbox"
        checked={ !!currentValue }
        onChange={ () => onChange(!currentValue) }
      />
    </>
  )
};

export default BooleanEditor;

import  { FC } from 'react';
import { useDataContext, useUserInteractionContext } from '../Providers';
import { updateElement } from './helpers';

interface Props {
  propName: string;
}

const NumberEditor: FC<Props> = ({
  propName,
}) => {
  const { selectedElement } = useUserInteractionContext();
  const { setElement } = useDataContext();

  // Early quit, should not happen at all
  if (!selectedElement)
    return null;

  const onChange = (value: number) => {
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
        type="number"
        value={ currentValue ?? '' }
        onChange={ e => onChange(+e.target.value)}
      />
    </>
  )
};

export default NumberEditor;

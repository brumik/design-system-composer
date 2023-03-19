import  { FC } from 'react';
import { useDataContext, useUserInteractionContext } from '../Providers';
import { ComponentConfigurationSelectFormatEntry, USE_EVAL_TAG } from '../types';
import { updateElement } from './helpers';

interface Props {
  propName: string;
}

const SelectEditor: FC<Props> = ({
  propName,
}) => {
  const { selectedElement } = useUserInteractionContext();
  const { setElement, config } = useDataContext();

  // Ealry quit, if element does not have an option, should not happen
  if (!selectedElement || !selectedElement?._map)
    return null;

  const onChange = (value: string) => {
    const newElement = updateElement(selectedElement, value, propName);
    setElement(selectedElement.id, newElement);
  }

  const currentValue = selectedElement.props[propName]

  const propConfig = config[selectedElement.name][propName] as ComponentConfigurationSelectFormatEntry;

  return (
    <>
      <label>{propName}: </label>
      <select
        onChange={ e => onChange(e.target.value) }
        value={ currentValue ?? '' }
      >
        <option value={''} disabled>Select your option</option>
        { propConfig.options.map(el => {
          if (typeof el === 'string') {
            return (
              <option
                key={ el }
                value={ el }
              >
                { el }
              </option>
            );
          } else {
            return (
              <option
                key={ el.key }
                value={ `${el.useEval ? USE_EVAL_TAG : ''}${el.value}` }
              >
                { el.key }
              </option>
            );
          }
        }) }
      </select>
    </>
  )
};

export default SelectEditor;

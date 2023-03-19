import  { FC, useEffect, useState } from 'react';
import { useDataContext, useUserInteractionContext } from '../Providers';
import { 
  ComponentConfigurationFormat,
  ComponentConfigurationNodeFormatEntry,
  SchemaFormat,
  SchemaFormatParent
} from '../types';
import { updateElement } from './helpers';

const createElementPreviewEntry = (
  name: string,
  parent: SchemaFormatParent = null,
  config: ComponentConfigurationFormat,  
): SchemaFormat => {
  // Creating simple element
  if (!name) {
    return ({
      _map: false,
      id: Date.now().toString(),
      parent,
      value: 'Simple element placeholder'
    })
  }

  const props = {} as Record<string, any>;
  Object.entries(config[name]).forEach(([key, value]) => {
    if (value?.defaultValue) {
      props[key] = value.defaultValue
    }
  });

  return ({
    _map: true,
    id: Date.now().toString(),
    parent,
    name,
    props
  });
};

interface Props {
  parent?: SchemaFormatParent
}

const AddElementButton: FC<Props> = ({
  parent = null,
}) => {
  const { addElement, setElement, config } = useDataContext();
  const { selectedElement } = useUserInteractionContext();
  const [selectedOption, setSelectedOption] = useState<string>('');
  
  useEffect(() => {
    if (!options().includes(selectedOption) && selectedOption !== '')
      setSelectedOption('');

    // eslint-disable-next-line
  }, [parent]);

  const options = (): string[] => {
    let avaiableElements = Object.keys(config);

    // Apply the only option:
    // if parent not presetn and we have root config only, use that one
    // if parent present use the parent's (current selected element) component name only
    // otherwise empty so we don't filter
    const onlyFilter = parent === null
      ? undefined
      : (selectedElement?._map && (
        (config[selectedElement.name][parent.propName] as ComponentConfigurationNodeFormatEntry)?.only
      )) || undefined;


    if (onlyFilter) {
      avaiableElements = avaiableElements.filter(el => onlyFilter.includes(el));
    }

    return avaiableElements;
  };

  return (
    <>
      <select
        key="select"
        onChange={ (e) => setSelectedOption(e.target.value) }
        value={ selectedOption }
      >
        <option key='simple' value=''>Simple element</option>
        { options().map(el => <option key={ el } value={ el } >{ el }</option>) }
      </select>
      <button
        key="button"
        onClick={ () => {
          addElement(
            createElementPreviewEntry(selectedOption, parent, config)
          );
          
          if (parent && selectedElement) {
            const newElement = updateElement(selectedElement, { _map: true }, parent?.propName);
            setElement(parent.id, newElement);
          }
        }
      }
      >
        Add element
      </button>
    </>
  );
};

export default AddElementButton;

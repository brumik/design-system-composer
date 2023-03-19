import  { FC } from 'react';
import { useDataContext, useUserInteractionContext } from '../Providers';
import { SchemaFormat } from '../types';

interface Props {
  parentId: string | null;
}

const ElementTree: FC<Props> = ({
  parentId
}) => {
  const { deleteElement, getChildren, rootElements } = useDataContext();
  const { setSelectedElement } = useUserInteractionContext();

  const elements = parentId ? getChildren(parentId) : rootElements;

  const liCreator = (element: SchemaFormat, children: string) =>
    <li key={element.id}>
      { children }{' '}
      <button onClick={ () => setSelectedElement(element.id) }>
          Select
      </button>{' '}
      <button onClick={ () => deleteElement(element.id) }>
        Delete
      </button>
      <br />
      <ElementTree parentId={ element.id } />
    </li>

  return elements.length > 0 ? (
    <ul style={{ margin: 0, padding: 0, paddingLeft: '20px', textAlign: 'left', }}>
      { elements.map(el => {
        if (el?._map) {
          return liCreator(el, `${el.name}`);
        } else {
          return liCreator(el, `Atomic: ${el.value.substring(0, 10)}`);
        }
      }) }
    </ul>
  ) : (<>{ !parentId && "No elements to display. Add elements to your root.." }</>);
}

export default ElementTree;

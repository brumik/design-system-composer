import  { FC } from 'react';
import { useDataContext, useUserInteractionContext } from '../Providers';
import { SchemaFormat } from '../types';

interface Props {
  elements: SchemaFormat[];
}

const ChildrenList: FC<Props> = ({
  elements
}) => {
  const { deleteElement } = useDataContext();
  const { setSelectedElement } = useUserInteractionContext();

  const liCreator = (element: SchemaFormat, children: string) =>
    <li key={element.id} style={{ listStyle: 'none' }}>
      { children }{' '}
      <button onClick={ () => setSelectedElement(element.id) }>
          Select
      </button>{' '}
      <button onClick={ () => deleteElement(element.id) }>
        Delete
      </button>
      <br />
    </li>

  return (
    <>
      { elements.length === 0 && <p>There are no elements.</p> }
      { elements.length > 0 && (
          <ul style={{ margin: 0, marginLeft: '20px', textAlign: 'center', }}>
            { elements.map(el => {
              if (el?._map) {
                return liCreator(el, `${el.name}`);
              } else {
                return liCreator(el, `string`);
              }
            }) }
          </ul>
        )}
    </>
  )
};

export default ChildrenList;

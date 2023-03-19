import  { FC } from 'react';
import { useCompositionContext } from '../Providers';

const CompositionList: FC<Record<never, never>> = () => {
  const { listCompositions, deleteComposition } = useCompositionContext();
  const elements = listCompositions();

  return elements.length > 0 ? (
    <ul style={{ margin: 0, padding: 0, paddingLeft: '20px', textAlign: 'left', }}>
      { elements.map(el => (
        <li key={el.name}>
            { el.name } [{ el.componentName }]{' '}
            <button onClick={ () => deleteComposition(el.name) }>
              Delete
            </button>
          </li>
      ))}
    </ul>
  ) : <>No compositions saved.</>;
}

export default CompositionList;

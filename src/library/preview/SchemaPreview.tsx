import  { FC } from 'react';
import { useDataContext } from '../Providers';


const SchemaPreview: FC<Record<never, never>> = () => {
  const { data } = useDataContext();

  return (
    <pre>
      { JSON.stringify(data, null, 2) }
    </pre>
  )
};

export default SchemaPreview

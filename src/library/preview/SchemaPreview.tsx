import { Card, CardContent } from '@mui/material';
import  { FC } from 'react';
import { useDataContext } from '../Providers';


const SchemaPreview: FC<Record<never, never>> = () => {
  const { data } = useDataContext();

  return (
    <Card>
      <CardContent>
        <pre>
          { JSON.stringify(data, null, 2) }
        </pre>
      </CardContent>
    </Card>
  )
};

export default SchemaPreview

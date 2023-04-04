import { FC, useEffect, useState } from 'react';
import { Editor } from './editor';
import {
  CompositionContextProvider,
  DataContextProvider,
  useDataContext,
  UserInteractionContextProvider,
} from './Providers';
import { 
  CodePreview,
  Preview,
  SchemaPreview
} from './preview';
import { ComponentConfigurationFormat } from './types';
import {
  Box,
  Grid,
  Tab,
  Tabs,
} from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

interface Props {
  /**
   * The components, example: import * as Components from 'my-design-library'
   */
  Components: Record<string, any>;

  config: ComponentConfigurationFormat;
}

const App: FC<Props> = ({
  Components,
  config,
}) => {
  const { setConfig } = useDataContext();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    setConfig(config);
  }, [setConfig, config]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Tabs onChange={ (_e, num) => setTab(num) } value={tab}>
          <Tab label="Show design preview" />
          <Tab label="Show react code" />
          <Tab label="Show internal schema" />
        </Tabs>
      </Grid>
      <Grid item xs={8} sx={{ flexDirection: 'column' }}>
        <Box sx={{ padding: 1, background: '#DDD', height: '100%' }}>
          {tab === 0 && <Preview Components={Components} />}
          {tab === 1 && <CodePreview />}
          {tab === 2 && <SchemaPreview />}
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Editor />
      </Grid>
    </Grid>
  );
}

const Providers: FC<Props> = (props) =>
  <DataContextProvider>
    <UserInteractionContextProvider>
      <CompositionContextProvider>
        <App {...props} />
      </CompositionContextProvider>
    </UserInteractionContextProvider>
  </DataContextProvider>;

export default Providers;

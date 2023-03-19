import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Editor } from './editor';
import {
  CompositionContextProvider,
  DataContextProvider,
  useDataContext,
  UserInteractionContextProvider,
} from './Providers';
import { CodePreview, Preview } from './preview';
import SchemaPreview from './preview/SchemaPreview';
import { ComponentConfigurationFormat } from './types';

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 5fr 2fr;
  min-height: 100vh;
  box-sizing: border-box;
  min-height: 100vh;
`;

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
  const [tab, setTab] = useState(1);

  useEffect(() => {
    setConfig(config);
  }, [setConfig, config]);

  return (
    <div className="App">
      <LayoutGrid>
        <div style={{ background: '#DDD' }}>
          {tab === 1 && <Preview Components={Components} />}
          {tab === 2 && <CodePreview />}
          {tab === 3 && <SchemaPreview />}
        </div>
        <div style={{ border: '5px black double' }}>
          <div style={{ margin: '10px 0', textAlign: 'center', }}>
            <h3>Preview (left panel)</h3>
            <button onClick={() => { setTab(1) }}>Show design preview</button>{' '}
            <button onClick={() => { setTab(2) }}>Show react code</button>{' '}
            <button onClick={() => { setTab(3) }}>Show internal schema</button>{' '}
          </div>
          <Editor />
        </div>
      </LayoutGrid>
    </div>
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

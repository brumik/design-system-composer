import { ReactNode, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from '../library';
import config from './klarity';
import * as Components from '@klara/klarity';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App
      Components={Components}
      config={config}
      namespace='klarity'
      RootElement={
        ({ children }: { children: ReactNode }) =>
          <div style={{ backgroundColor: "#FFFFFF" }}>
            <Components.App theme={Components.lightTheme}>{children}</Components.App>
          </div>
      }
    />
  </StrictMode>
);

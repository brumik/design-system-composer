import { ComponentConfigurationFormat } from "../../library";


const config: ComponentConfigurationFormat = {
  Button: {
    children: {
      type: 'node',
      defaultValue: 'Button',
    },
    dataId: {
      type: 'string',
    },
    dataIdNumber: {
      type: 'number',
    },
    color: {
      type: 'select',
      options: ['primary', 'secondary', 'error', 'success'],
    },
    disabled: { type: 'boolean' },
    size: {
      type: 'select',
      options: ['small', 'medium', 'large', 'string']
    },
    variant: {
      type: 'select',
      options: ['contained', 'outlined', 'text', 'string']
    }
  },
  Card: {
    children: { type: 'node' },
    raised: { type: 'boolean', defaultValue: false },
  },
};

export default config;

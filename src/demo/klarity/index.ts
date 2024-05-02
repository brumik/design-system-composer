import { ComponentConfigurationFormat } from "../../library";

const config: ComponentConfigurationFormat = {
  Accordion: {
    children: {
      type: 'node',
      only: [ 'AccordionItem' ],
      defaultValue: 'Items',
    },
  },
  AccordionItem: {
    children: {
      type: 'node',
      defaultValue: 'Panel 1',
    },
    title: { type: 'string', defaultValue: 'Title' },
    subtitle: { type: 'string' },
    rightAddon: { type: 'node' }
  },
  Button: {
    children: {
      type: 'node',
      defaultValue: 'Button',
    },
    variant: {
      type: 'select',
      options: ['primary', 'secondary', 'alert', 'ghost', 'ghostWhite'],
    },
    isDisabled: { type: 'boolean' },
    isFullWidth: { type: 'boolean' },
    hasMinWidth: { type: 'boolean' },
    isBig: { type: 'boolean' },
    isSmall: { type: 'boolean' },
    isRounded: { type: 'boolean' },
  },
  PageHeader: {
    children: { type: 'node' },
    title: { type: 'string', defaultValue: 'Header example' },
    actions: { type: 'node' },
  },
  PageBody: {
    children: { type: 'node', defaultValue: 'Content' },
  },
  PageFooter: {
    children: { type: 'node', defaultValue: 'Content' },
  },
  PageNavigationBar: {
    start: { type: 'node', defaultValue: 'PageTop' },
    center: { type: 'node', defaultValue: 'Element' },
    end: { type: 'node', defaultValue: 'Content' },
  },
  Flex: {
    children: { type: 'node', only: ['FlexItem'] },
    hasGutter: { type: 'boolean' },
    isVertical: { type: 'boolean' },
  },
  FlexItem: {
    children: { type: 'node' },
    isFilled: { type: 'boolean' },
    center: { type: 'boolean' },
  },
  Icon: {
    name: { type: 'select', options: [ 'alert' ] },
    isBig: { type: 'boolean' },
    isSmall: { type: 'boolean' },
    isInline: { type: 'boolean' },
  },
};

export default config;

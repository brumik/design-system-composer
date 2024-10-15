export const USE_EVAL_TAG = 'useEval.';

export type SchemaFormatParent = null | {
  id: string;
  propName: string;
}

export type ComponentSchemaFormat = {
  _map: true;
  id: string;
  parent: SchemaFormatParent;
  name: string;
  props: Record<string, any>;
}

export type SimpleSchemaFormat = {
  _map: false;
  parent: SchemaFormatParent;
  id: string;
  value: string;
} 

export type SchemaFormat =
  ComponentSchemaFormat
  | SimpleSchemaFormat;

  export type ComponentConfigurationSelectFormatEntry = {
  type: 'select';

  // Only required when type is select. Should have all possible values.
  options: ({ key: string, value: string, useEval?: boolean } | string)[];

  // Only needed when the prop is required
  defaultValue?: string;
}

export type ComponentConfigurationNodeFormatEntry = {
  type: 'node';

  // Limiting which components from the library can be the children of this element
  only?: string[];

  // Only needed when the prop is required
  defaultValue?: string;
}

export type ComponentConfigurationFormatEntryValue = {
  type: 'string';
  defaultValue?: string;
} | {
  type: 'boolean';
  defaultValue?: boolean;
} | {
  type: 'number';
  defaultValue?: number;
} | ComponentConfigurationSelectFormatEntry
  | ComponentConfigurationNodeFormatEntry;

export type ComponentConfigurationFormatEntry = Record<string, ComponentConfigurationFormatEntryValue>;

export type ComponentConfigurationFormat = Record<string, ComponentConfigurationFormatEntry>;

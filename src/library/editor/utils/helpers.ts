import { SchemaFormat } from "../../types";

export type ValueTypes = undefined | boolean | string | number | { _map: true };

export const updateElement = (
  currentElement: SchemaFormat,
  newValue: ValueTypes,
  propName: string = '',
): SchemaFormat => {
  if (currentElement._map) {
    return {
      ...currentElement,
      props: {
        ...currentElement.props,
        [propName]: newValue,
      }
    };
  }

  return {
    ...currentElement,
    value: `${newValue}`
  };
};

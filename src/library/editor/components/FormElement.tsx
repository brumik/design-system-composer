import  { FC } from 'react';
import { ComponentConfigurationFormatEntryValue } from '../../types';
import BooleanEditor from './BooleanEditor';
import NodeEditor from './NodeEditor';
import NumberEditor from './NumberEditor';
import SelectEditor from './SelectEditor';
import StringEditor from './StringEditor';

interface Props {
  propConfig: ComponentConfigurationFormatEntryValue;
  propName: string;
}

const FormElement: FC<Props> = ({
  propConfig,
  propName,
}) => {
  if (propConfig.type === 'boolean') {
    return <BooleanEditor propName={propName} />;
  }
  if (propConfig.type === 'string') {
    return <StringEditor propName={ propName } />;
  }
  if (propConfig.type === 'number') {
    return <NumberEditor propName={ propName } />;
  }
  if (propConfig.type === 'select') {
    return <SelectEditor propName={ propName } />;
  }
  if (propConfig.type === 'node') {
    return <NodeEditor propName={ propName } />
  }
  return null;
};

export default FormElement;

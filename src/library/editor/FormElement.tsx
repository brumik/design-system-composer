import  { FC } from 'react';
import { useDataContext } from '../Providers';
import { ComponentConfigurationFormatEntryValue } from '../types';
import AddCompositionButton from './AddCompositionButton';
import AddElementButton from './AddElementButton';
import BooleanEditor from './BooleanEditor';
import ChildrenList from './ChildrenList';
import NumberEditor from './NumberEditor';
import ResetButton from './ResetButton';
import SelectEditor from './SelectEditor';
import StringEditor from './StringEditor';

interface Props {
  propConfig: ComponentConfigurationFormatEntryValue;
  propName: string;
  elementId: string;
}

const FormElement: FC<Props> = ({
  propConfig,
  propName,
  elementId,
}) => {
  const { getChildren } = useDataContext();

  if (propConfig.type === 'boolean') {
    return (
      <>
        <BooleanEditor propName={propName} />{' '}
        <ResetButton propName={propName} />
      </>
    )
  }
  if (propConfig.type === 'string') {
    return (
      <>
        <StringEditor propName={ propName } />{' '}
        <ResetButton propName={ propName } />
      </>
    );
  }
  if (propConfig.type === 'number') {
    return (
      <>
        <NumberEditor propName={ propName } />{' '}
        <ResetButton propName={ propName } />
      </>
    );
  }
  if (propConfig.type === 'select') {
    return (
      <>
        <SelectEditor propName={ propName } />{' '}
        <ResetButton propName={ propName } />
      </>
    )
  }
  if (propConfig.type === 'node') {
    return (
      <>
        <label>{propName}: </label>
        <br />
        <ChildrenList
          elements={ getChildren(elementId, propName )}
        />
        <br />
        Append a new element:<br />
        <AddElementButton
          parent={ { id: elementId, propName } }
        />
        <br />
        <AddCompositionButton
          parent={ { id: elementId, propName } }
        />
      </>
    );
  }

  return null;
};

export default FormElement;

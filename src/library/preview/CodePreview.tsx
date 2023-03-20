import { Card } from '@mui/material';
import  { FC } from 'react';
import { DataContextType, useDataContext } from '../Providers';
import { SchemaFormat, USE_EVAL_TAG } from '../types';

const getSpaces = (nr: number): string => {
  let res = '';
  for(let i = 0; i < nr; i += 1)
    res += ' ';

  return res;
}

const codeMapper = (
  element: SchemaFormat | SchemaFormat[],
  getChildren:  DataContextType['getChildren'],
  indent = 0
): string => {
  let localState = '';

  if (Array.isArray(element)) {
    localState += element.map(el =>
      codeMapper(el, getChildren, indent + 2)  
    ).join('');
  } else if (element?._map) {
    let propsStringified = '';
    const props = { ...element.props };

    let children = false;
    if (props.hasOwnProperty('children')) {
      if (props.children._map) {
        children = true;
        delete props['children'];
      }
    } 

    Object.entries(props).forEach(([key, value]) => {

      if (value?._map) {
        propsStringified += getSpaces(indent + 2) + key + `={ \n`;
        const propElments = getChildren(element.id, key);
        if (propElments.length > 1) {
          propsStringified += getSpaces(indent + 4) + '<>\n';
        }
        
        propsStringified += propElments.map(el =>
          codeMapper(el, getChildren, indent + 4 + (propElments.length > 1 ? 2 : 0))
        ).join('');
        
        if (propElments.length > 1) {
          propsStringified += getSpaces(indent + 4) + '</>\n';
        }
        propsStringified += getSpaces(indent + 2) + `}\n`;
      } else if (value && typeof value === 'string' && value.startsWith(USE_EVAL_TAG)) {
        propsStringified += getSpaces(indent + 2) + key + `={ `;
        propsStringified += `() => { console.warn('Your function comes here'); }`;
        propsStringified += ` }\n`;
      } else {
        propsStringified += getSpaces(indent + 2) + key + `={ `;
        propsStringified += typeof value === 'string' ? `'${value}'` : `${value}`;
        propsStringified += ` }\n`;
      }
    });

    localState += `${getSpaces(indent)}<${element.name}`;
    localState += propsStringified ? '\n' : '';
    localState += propsStringified;
    localState += propsStringified ? getSpaces(indent) : ' ';
    
    if (children) {
      localState += `>\n`;
      localState += getChildren(element.id, 'children').map(el => codeMapper(el, getChildren, indent + 2)).join('');
      localState += `${getSpaces(indent)}</${element.name}>\n`;
    } else {
      localState += `/>\n`;
    }
  } else {
    localState += `${getSpaces(indent)}${element.value}\n`; 
  }

  return localState;
};

const CodePreview: FC<Record<never, never>> = () => {
  const { rootElements, getChildren } = useDataContext();

  return (
    <Card>
      <pre>
        { rootElements && codeMapper(
          rootElements,
          getChildren
        )}
      </pre>
    </Card>
  )
};

export default CodePreview

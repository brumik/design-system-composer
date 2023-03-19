import  { createElement, FC } from "react";
import { useDataContext, useUserInteractionContext } from "../Providers";
import { SchemaFormat, USE_EVAL_TAG } from "../types";

// https://rollupjs.org/troubleshooting/#avoiding-eval
const eval2 = eval;

interface Props {
  /**
   * The components, example: import * as Components from 'my-design-library'
   */
  Components: Record<string, any>;
}

const Preview: FC<Props> = ({
  Components
}) => {
  const { rootElements, getChildren, getElement } = useDataContext();
  const {
    selectedElement,
    setSelectedElement,
    selectingFromPreview,
    highlightSelected,
    highlightColor,
  } = useUserInteractionContext();

  const highlightCss = { border: `dashed 1px ${highlightColor}` };

  const onClick = (id: string) => {
    const element = getElement(id);

    if (!element) {
      console.error('Element by ID is not found for selection.');
      return;
    }

    setSelectedElement(element.id);
  }

  const mapper = (
    element: SchemaFormat | SchemaFormat[],
  ): React.ReactNode => {
    if (Array.isArray(element)) {
      return element.map((el) => mapper(el));
    }
  
    const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick(element.id);
      e.stopPropagation();
    };
  
    if (element?._map) {
      const props = { ...element.props }; 
      Object.entries(props).forEach(([key, value]) => {
  
        // Check for recursive rendering
        if (value?._map) {
          const propElement = getChildren(element.id, key);
  
          if (!propElement) {
            console.error(`Schema error: did not found element for slot ${element.id}.${key} `);
            props[key] = null;
            return;
          }
  
          // Create the element recursively
          props[key] = mapper(propElement);
          return;
        }
  
        // Check for values that bear a mark to evaluate. This is for functions mostly.
        if (value && typeof value === 'string' && value.startsWith(USE_EVAL_TAG)) {
          // eslint-disable-next-line
          const evaluated = eval2(value.slice(USE_EVAL_TAG.length));
          props[key] = evaluated;
          return;
        }
      });
  
      // If the user enebled on click selection add the selec function to the element.
      // This will not work if the top element of the component is not getting the handler
      // (for example you don't pass down ...restProps to your styled component)
      if (selectingFromPreview) {
        if (props.hasOwnProperty('onClick')) {
          props['onClick'] = (e: React.MouseEvent<HTMLDivElement>) => {
            // Handler has to come first in case the elements on click function does something funky
            onClickHandler(e);
            props['onClick'](e);
          }
        } else {
          props['onClick'] = (e: React.MouseEvent<HTMLDivElement>) => { onClickHandler(e); }
        }
      }

      // If we have higlighting selected and this element is selected apply the css
      // This overwrites potential styling on the element.  
      if (highlightSelected && selectedElement && selectedElement.id === element.id) {
        props['style'] = {
          ...props.hasOwnProperty('style') && { ...props.style },
          ...highlightCss,
        };
      }
  
      return (
        createElement(
          // @ts-ignore
          Components[element.name],
          {
            key: element.id,
            ...props,
          }
        )
      );
    }
  
    return element.value;
  }
  

  return ( 
    <>
      { rootElements && mapper(rootElements) }
    </>
  )
};

export default Preview;

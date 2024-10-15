import  { createContext, FC, useContext, useState } from 'react';
import { SchemaFormat, SchemaFormatParent } from '../types';
import { useDataContext } from './DataContextProvider';

export interface CompositionContextType {
  loadComposition: (name: string, parent: SchemaFormatParent) => void;
  renameComposition: (name: string, newName: string) => void;
  listCompositions: () => {
    name: string,
    componentName: string,
  }[];
  saveComposition: (name: string, elementId: string) => void;
  deleteComposition: (name: string) => void;
  setCompositions: (data: Record<string, SchemaFormat[]>) => void;
  compositions: Record<string, SchemaFormat[]>;
}

const initialState: CompositionContextType = {
  loadComposition: () => console.warn('Composition function is not set.'),
  listCompositions: () => {
    console.warn('Composition function is not set.');
    return [];
  },
  renameComposition: () => console.warn('Composition function is not set.'),
  saveComposition: () => console.warn('Composition function is not set.'),
  deleteComposition: () => console.warn('Composition function is not set.'),
  setCompositions: () => console.warn('Composition function is not set.'),
  compositions: {},
};

export const CompositionContext = createContext<CompositionContextType>(initialState);

export const useCompositionContext = () => useContext(CompositionContext) as CompositionContextType;

const CompositionContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    getElement,
    getChildren,
    addElements,
    setElement,
  } = useDataContext();
  const [compositions, setCompositions] = useState<Record<string, SchemaFormat[]>>({});

  /**
   * Postpends id and parent.id with extra timestamp to make sure it stays unique.
   * 
   * @param name Name of the composition to load.
   * @returns Composition with unique ids from any previous components.
   */
  const loadComposition: CompositionContextType['loadComposition'] = (name, parent) => {
    const elements =  compositions[name].map((element) => ({
      ...element,
      id: `${element.id}-loaded-${Date.now()}`,
      ...element.parent && { 
        parent: {
          ...element.parent,
          id: `${element.parent.id}-loaded-${Date.now()}`,
        }
      }
    }));

    // Load the elements
    elements[0].parent = parent;
    addElements(elements);

    // Make sure parent will map them
    if (parent) {
      const parentElement = getElement(parent.id);
      if (parentElement && parentElement._map) {
        parentElement.props[parent.propName] = { _map: true };
        setElement(parentElement.id, parentElement);
      } 
    }
  }

  const renameComposition: CompositionContextType['renameComposition'] = (name, newName) =>
    setCompositions(prev => {
      const next = { ...prev };
      next[newName] = next[name];
      delete next[name];
      return next;
    });

  const listCompositions: CompositionContextType['listCompositions'] = () =>
    Object.entries(compositions).map(([name, value]) => ({
      name,
      componentName: value[0]._map ? value[0]?.name : ''
    }));

  const saveComposition: CompositionContextType['saveComposition'] = (name, elementId) => {
    const getElementRecursively = (elementId: string, initial: SchemaFormat[] = []): SchemaFormat[] => {
      const parent = getElement(elementId);

      if (!parent)
        return initial;

      const children = getChildren(elementId);

      if (!children)
        return [ parent ];

      return [
        parent,
        ...(children.map(child => getElementRecursively(child.id)).flat(1))
      ];
    };

    const elements = getElementRecursively(elementId);

    setCompositions(prev => ({
      ...prev,
      [name]: elements
    }));
  };;

  const deleteComposition: CompositionContextType['deleteComposition'] = (name) =>
    setCompositions(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });

  return (
    <CompositionContext.Provider
      value={{
        loadComposition,
        renameComposition,
        listCompositions,
        saveComposition,
        deleteComposition,
        setCompositions,
        compositions,
      }}
    >
      { children }
    </CompositionContext.Provider>
  )
}

export default CompositionContextProvider;

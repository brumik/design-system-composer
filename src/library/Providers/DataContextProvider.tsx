import  { createContext, FC, useContext, useState } from 'react';
import { ComponentConfigurationFormat, SchemaFormat } from '../types';

export interface DataContextType {
  data: SchemaFormat[];
  rootElements: SchemaFormat[] | [];
  setData: (data: SchemaFormat[]) => void,
  setElement: (id: string, value: SchemaFormat) => void;
  addElement: (value: SchemaFormat) => void;
  addElements: (value: SchemaFormat[]) => void;
  getElement: (id: string) => SchemaFormat | undefined;
  getChildren: (parentId: string, propName?: string) => SchemaFormat[];
  deleteElement: (id: string) => void;
  config: ComponentConfigurationFormat;
  setConfig: (config: ComponentConfigurationFormat) => void;
}

const initialState: DataContextType = {
  data: [],
  rootElements: [],
  setData: () => { console.warn('Set data is not set up.')},
  setElement: () => console.warn('Set element not set up.'),
  addElement: () => console.warn('Add element not set up.'),
  addElements: () => console.warn('Add element not set up.'),
  getElement: () => {
    console.warn('Get element not set up.');
    return undefined;
  },
  getChildren: () => {
    console.warn('Get children not set up.');
    return [];
  },
  deleteElement: () => console.warn('Delete element is not set up.'),
  config: {},
  setConfig: () => console.warn('Set config is not set up.')
};

export const DataContext = createContext<DataContextType>(initialState);

export const useDataContext = () => useContext(DataContext) as DataContextType;

const DataProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SchemaFormat[]>([]);
  const [config, setConfig] = useState<ComponentConfigurationFormat>({})

  const setElement: DataContextType['setElement'] = (id, value) => {
    setData(prev => {
      const idxInArray = prev.findIndex(el => el.id === id);
      const newData = [...prev];
      newData[idxInArray] = value;
      return newData
    });
      
  }

  const addElement: DataContextType['addElement'] = (value) => {
    setData(prev => ([
      ...prev,
      value
    ]));
  }

  const addElements: DataContextType['addElements'] = (value) => {
    setData(prev => ([
      ...prev,
      ...value
    ]));
  }

  const getElement: DataContextType['getElement'] = (id) =>
    data.find(el => el.id === id);

  const getChildren: DataContextType['getChildren'] = (parentId, propName) =>
    propName ?  
      data.filter(el => el.parent
        && el.parent.id === parentId
        && el.parent.propName === propName
      ) : data.filter(el => el.parent
        && el.parent.id === parentId
      );

  const deleteElement: DataContextType['deleteElement'] = (id) => {
    const deleteRecursive = (elementId: string, state: SchemaFormat[]): SchemaFormat[] => {
      let newState = state.filter(el => el.id !== elementId);
      const children = state.filter(el => el.parent && el.parent.id === elementId);
      children.forEach(el => {
        newState = deleteRecursive(el.id, newState)
      });

      return newState;
    }

    setData(prev => deleteRecursive(id, prev));
  }

  const rootElements: DataContextType['rootElements'] = data.filter(el => !el.parent);

  return (
    <DataContext.Provider
      value={{
        data,
        rootElements,
        setData,
        setElement,
        addElement,
        addElements,
        getElement,
        getChildren,
        deleteElement,
        config,
        setConfig,
      }}
    >
      { children }
    </DataContext.Provider>
  )
}

export default DataProvider;

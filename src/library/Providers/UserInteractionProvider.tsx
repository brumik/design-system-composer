import  { createContext, FC, useContext, useState } from 'react';
import { SchemaFormat } from '../types';
import { useDataContext } from './DataContextProvider';

export interface UserInteractionContextType {
  selectedElement: SchemaFormat | undefined;
  setSelectedElement: (id: string) => void;
  selectingFromPreview: boolean;
  toggleSelectingFromPreview: () => void;
  highlightSelected: boolean;
  toggleHighlightSelected: () => void;
  highlightColor: string;
  setHighlightColor: (color: string) => void;
}

const initialState: UserInteractionContextType = {
  selectedElement: undefined,
  setSelectedElement: () => console.warn('Set selected element is not set.'),
  selectingFromPreview: false,
  toggleSelectingFromPreview: () => console.warn('Toggle selecting element is not set.'),
  highlightSelected: false,
  toggleHighlightSelected: () => console.warn('Toggle higlgight selected element is not set.'),
  highlightColor: '#ff0000',
  setHighlightColor: () => console.warn('Set higlight color  element is not set.'),
};

export const UserInteractionContext = createContext<UserInteractionContextType>(initialState);

export const useUserInteractionContext = () => useContext(UserInteractionContext) as UserInteractionContextType;

const UserInteractionContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [selectingFromPreview, setSelectingFromPreview] = useState(true);
  const [highlightSelected, setHighlightSelected] = useState(true);
  const [highlightColor, setHighlightColor] = useState('#ff0000');
  const { getElement } = useDataContext();

  return (
    <UserInteractionContext.Provider
      value={{
        selectedElement: getElement(selectedId),
        setSelectedElement: setSelectedId,
        selectingFromPreview,
        toggleSelectingFromPreview: () => { setSelectingFromPreview(prev => !prev) },
        highlightSelected,
        toggleHighlightSelected: () => { setHighlightSelected(prev => !prev) },
        highlightColor,
        setHighlightColor,
      }}
    >
      { children }
    </UserInteractionContext.Provider>
  )
}

export default UserInteractionContextProvider;

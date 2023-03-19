import  { FC, useEffect, useState } from 'react';
import { useCompositionContext } from '../Providers';
import { SchemaFormat } from '../types';
import useLocalStorage from './useLocalStorage';

const LOCAL_STORAGE_KEY = 'composition'; 

const CompositionModul: FC<Record<never, never>> = () => {
  const { compositions, setCompositions } = useCompositionContext();
  const [presets, setPresets] = useState<string[]>([]);
  const [nameInput, setNameInput] = useState('');
  const {
    list,
    getItem,
    saveItem,
    deleteItem,
    clearAll,
  } = useLocalStorage<Record<string, SchemaFormat[]>>(LOCAL_STORAGE_KEY, {});

  const getPresetNames = (db: ReturnType<typeof list>) =>
    Object.keys(db);

  useEffect(() => {
    setPresets(
      getPresetNames(list())
    );
  }, [])

  const onSave = (name: string) => {
    const newPresets = saveItem(name, compositions);
    setPresets(getPresetNames(newPresets));
  };

  const onLoad = (name: string) => {
    setCompositions(getItem(name));
  };

  const onDelete = (name: string) => {
    const newPresets = deleteItem(name);
    setPresets(getPresetNames(newPresets));
  }

  const onClear = () => {
    clearAll();
    setPresets([]);
  }

  return (
    <>
      <input
        type="text"
        value={ nameInput }
        placeholder="Name preset to save"
        onChange={ (e) => setNameInput(e.target.value) }
      />
      <button
        onClick={() => { 
          onSave(nameInput);
          setNameInput('');
        }}
      >Save Current State</button>
      <br />
      <ul style={{ margin: '20px 0', padding: 0, textAlign: 'center', }}>
        { presets.map(el => (
          <li key={el} style={{ listStyle: 'none', marginTop: '5px' }}>
            { el }{' '}
            <button onClick={ () => onLoad(el) }>Load</button>{' '}
            <button onClick={ () => onDelete(el) }>Delete</button>
          </li>
        ))}
        { !presets.length && <li style={{ listStyle: 'none', marginTop: '5px' }}>No presets saved yet.</li>}
      </ul>
      <button onClick={ () => onClear() }>Clear local presets</button>
    </>
  );
};

export default CompositionModul;

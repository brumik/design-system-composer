import { useCallback } from "react";
import { useDataContext } from "../../Providers";

const useLocalStorage = <T>(key: string, defaultValue: T) => {
  type DatabaseFormat = Record<string, T>;
  const { namespace } = useDataContext();
  const localStorageKey = `${namespace}/${key}`;

  const list = useCallback((): DatabaseFormat => {
    const presets = window.localStorage.getItem(localStorageKey) ?? '{}';
    return JSON.parse(presets) as DatabaseFormat;
  }, [localStorageKey]);

  const getItem = useCallback((name: string): T => {
    const presets = window.localStorage.getItem(localStorageKey) ?? '{}';
    const parsedPresets = JSON.parse(presets) as DatabaseFormat;
  
    if (name && !parsedPresets.hasOwnProperty(name)) {
      alert(`Did not found ${name} in local storage.`);
      return defaultValue;
    }
  
    return parsedPresets[name];
  }, [localStorageKey, defaultValue]);
  
  const saveItem = useCallback((name: string, preset: T): DatabaseFormat => {
    const existingPresets = list() as DatabaseFormat;
    const newPresets = {
      ...existingPresets,
      [name]: preset
    };
  
    window.localStorage.setItem(localStorageKey, JSON.stringify(newPresets));
  
    return newPresets;
  }, [localStorageKey, list]);
  
  const deleteItem = useCallback((name: string): DatabaseFormat => {
    const existingPresets = list() as DatabaseFormat;
    delete existingPresets[name];
  
    window.localStorage.setItem(localStorageKey, JSON.stringify(existingPresets));
  
    return { ...existingPresets };
  
  }, [localStorageKey, list]);

  const clearAll = useCallback(() => {
    window.localStorage.clear();
  }, []);
  
  return {
    list,
    getItem,
    saveItem,
    deleteItem,
    clearAll,
  };
}

export default useLocalStorage;

const useLocalStorage = <T>(localStorageKey: string, defaultValue: T) => {
  type DatabaseFormat = Record<string, T>;

  const list = (): DatabaseFormat => {
    const presets = window.localStorage.getItem(localStorageKey) ?? '{}';
    return JSON.parse(presets) as DatabaseFormat;
  };

  const getItem = (name: string): T => {
    const presets = window.localStorage.getItem(localStorageKey) ?? '{}';
    const parsedPresets = JSON.parse(presets) as DatabaseFormat;
  
    if (name && !parsedPresets.hasOwnProperty(name)) {
      alert(`Did not found ${name} in local storage.`);
      return defaultValue;
    }
  
    return parsedPresets[name];
  };
  
  const saveItem = (name: string, preset: T): DatabaseFormat => {
    const existingPresets = list() as DatabaseFormat;
    const newPresets = {
      ...existingPresets,
      [name]: preset
    };
  
    window.localStorage.setItem(localStorageKey, JSON.stringify(newPresets));
  
    return newPresets;
  };
  
  const deleteItem = (name: string): DatabaseFormat => {
    const existingPresets = list() as DatabaseFormat;
    delete existingPresets[name];
  
    window.localStorage.setItem(localStorageKey, JSON.stringify(existingPresets));
  
    return { ...existingPresets };
  
  };

  const clearAll = () => {
    window.localStorage.clear();
  };
  
  return {
    list,
    getItem,
    saveItem,
    deleteItem,
    clearAll,
  };
}

export default useLocalStorage;

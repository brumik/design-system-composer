import  { FC, useEffect, useState } from 'react';
import { useCompositionContext, useDataContext, useUserInteractionContext } from '../Providers';
import AddElementButton from './AddElementButton';
import FormElement from './FormElement';
import PresetModul from './PresetModul';
import styled from 'styled-components';
import ElementTree from './ElementTree';
import CompositionList from './CompositionList';
import CompositionModul from './CompositionModul';

const EditorContainer = styled.div`
  text-align: center;
  padding: 3px;
`

const Editor: FC<Record<never, never>> = () => {
  const {
    selectedElement,
    selectingFromPreview,
    setSelectedElement,
    toggleSelectingFromPreview,
    highlightSelected,
    toggleHighlightSelected,
    highlightColor,
    setHighlightColor,
  } = useUserInteractionContext();
  const { config } = useDataContext();
  const { saveComposition } = useCompositionContext();
  const [showTree, setShowTree] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [showCompositions, setShowCompositions] = useState(false);
  const [showCompositionPresets, setShowCompositionPresets] = useState(false);
  const [compositionName, setCompositionName] = useState('');

  const selectParent = (id?: string) => {
    if (!id) return;
    setSelectedElement(id);
  }

  useEffect(() => {
    setCompositionName('');
  }, [selectedElement])

  return (
    <EditorContainer>
      <h3>Editor</h3>
      <hr />
      Append an new element to the root: (you probably want to append to YOUR root component)
      <br />
      <br /> 
      <AddElementButton />
      <br />
      <hr />
      { !selectingFromPreview && <>Enable preview selecton to be able to click on an element in the Preview to select an element to edit.</> }
      { selectingFromPreview && <>Element selection enabled from preview. Click on an element to select it.</> }
      <br/>
      <button onClick={ () => toggleSelectingFromPreview() }>
        { selectingFromPreview ? 'Disable on click select' : 'Enable on click select'}
      </button>
      <br />
      <button onClick={ () => toggleHighlightSelected() }>
        { highlightSelected ? 'Disable selected highlight' : 'Enable selected higlight' }
      </button>{' '}
      { highlightSelected && (
        <input 
          style={{ height: '22px' }}
          type='color'
          onChange={ (e) => setHighlightColor(e.target.value) } value={ highlightColor }
        />
      )}
      <br />
      <br />
      <br />
      { selectedElement && (
        <>
          <strong>
            Selected: {selectedElement?._map ? selectedElement?.name : 'string'} ({selectedElement?.id})
          </strong>{' '}
          <button onClick={() => setSelectedElement('')}>
            Deselect
          </button>
          <br />
          Save as composition {' '}
          <input
            type='text'
            value={ compositionName }
            onChange={ (e) => setCompositionName(e.target.value) }
            placeholder="Composition name"
          />
          <button onClick={ () => {
            saveComposition(compositionName, selectedElement.id);
            setCompositionName('Saved!');
          }}>Save</button>
        </>
      )}
      { (selectedElement && selectedElement.parent) && (
        <>
          <br/>
          <button onClick={ () => selectParent(selectedElement?.parent?.id) }>Select parent element</button>
        </>
      )}
      { !selectedElement && (
        <>
          <strong>No element is selected currently.</strong><br/>
          Select an element to start editing.
        </>
      )}
      <hr />
      {
        selectedElement && selectedElement._map && (
          <>
            <strong>Edit the props of the element:</strong>
            <br /><br />
            { Object.entries(config[selectedElement.name]).map(([key, entry]) =>
              <div key={key}>
                <FormElement
                  propConfig={entry}
                  propName={key}
                  elementId={selectedElement.id}
                />
                <br />
                <br />
              </div>
            )}
            <hr />
          </>
        )
      }
      {
        selectedElement && !selectedElement._map &&
          <>
            <FormElement
              propConfig={{ type: 'string' }}
              propName='Value'
              elementId={selectedElement.id}
            />
            <br />
            <br />
            <hr />
          </>
      }
      <strong>Component compositions:</strong>{' '}
      <button onClick={() => setShowCompositions(!showCompositions)} >{ showCompositions ? 'Hide' : 'Show' }</button>
      <br /><br />
      { showCompositions && <CompositionList /> }
      <hr />
      <strong>Composition presets: (saving locally)</strong>{' '}
      <button onClick={() => setShowCompositionPresets(!showCompositionPresets)} >
        { showCompositionPresets ? 'Hide' : 'Show' }
      </button>
      <br />
      <br />
      { showCompositionPresets && <CompositionModul /> }
      <hr />
      <strong>Component Tree:</strong>{' '}
      <button onClick={() => setShowTree(!showTree)} >{ showTree ? 'Hide' : 'Show' }</button>
      <br /><br />
      { showTree && <ElementTree parentId={ null } /> }
      <hr />
      <strong>Presets: (saving locally)</strong>{' '}
      <button onClick={() => setShowPresets(!showPresets)} >{ showPresets ? 'Hide' : 'Show' }</button>
      <br />
      <br />
      { showPresets && <PresetModul /> }
    </EditorContainer>
)};

export default Editor;

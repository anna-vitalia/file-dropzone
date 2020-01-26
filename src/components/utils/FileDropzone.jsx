import React, {useCallback, useRef, useMemo, useReducer} from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'setAcceptedFiles':
      return {
        ...state,
        acceptedFiles: action.acceptedFiles,
      }
    default:
      return state
  }
}

const initialState = {
  allLoadedFiles: [],
  acceptedFiles: [],
  invalidFiles: []
}

export function FileDropzone({multiple = true} = {}) {

  const refDropzone = useRef(null);
  const refInput = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  //const fileFilter = {};

  const handleOnDrag = useCallback( event => {
    event.preventDefault();
  }, [] );

  const handleOnDrop = useCallback( event => {
    event.preventDefault();
    let dataTransfer = event.dataTransfer;
    let files = dataTransfer.files;
    changeFilesList(files);
  }, [] );

  const handleOnChange = useCallback( event => {
    event.preventDefault();
    let files = event.target.files;
    changeFilesList(files);
  }, [] );

  const handleOnClick = useCallback( event => {
    openFileWindow(event);
  }, [] );

  const openFileWindow = useCallback( event => {
    if (refInput.current) {
      refInput.current.value = null
      refInput.current.click();
    }
  }, [] );

  const changeFilesList = (files) => {
    let acceptedFiles = [];
    for (var i = 0; i < files.length; i++) {
      acceptedFiles.push(files[i]);
    }
    dispatch({
      acceptedFiles,
      type: 'setAcceptedFiles'
    })
    console.log(state.acceptedFiles);
  };

  const getContainerProps = useMemo(() => () => {
    const props = {
      ref: refDropzone,
      onClick: handleOnClick,
      onDragEnter: handleOnDrag,
      onDragOver: handleOnDrag,
      onDrop: handleOnDrop,
    };

    return (
      props
    )
  }, [refDropzone, handleOnClick, handleOnDrag, handleOnDrop]);
  
  const getInputProps = useMemo(() => () => {
    const props = {
      multiple,
      ref: refInput,
      type: 'file',
      onChange: handleOnChange
    };

    return (
      props
    )
  }, []);

  return {
    ...state,
    getContainerProps,
    getInputProps,
  }
};

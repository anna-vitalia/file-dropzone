import React, {useCallback, useRef, useMemo} from 'react';

const initialState = {
  allLoadedFiles: [],
  acceptedFiles: [],
  invalidFiles: []
}

export function FileDropzone({multiple = true} = {}) {

  const refDropzone = useRef(null);
  const refInput = useRef(null);
  const state = initialState;
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
    for (var i = 0; i < files.length; i++) {
      state.acceptedFiles.push(files[i]);
    }
  };

  const getContainerProps = useMemo(() => () => {
    const props = {
      ref: refDropzone,
      onClick: handleOnClick,
      onDrag: handleOnDrag,
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

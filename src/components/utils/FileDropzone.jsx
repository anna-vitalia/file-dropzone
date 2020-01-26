import React, {useCallback, useRef, useMemo, useReducer} from 'react';

const initialState = {
  acceptedFiles: [],
  rejectedFiles: []
}


function reducer(state, action) {
  switch (action.type) {
    case 'setAcceptedFiles':
      return {
        ...state,
        acceptedFiles: action.acceptedFiles,
      }
    case 'setRejectedFiles':
      return {
        ...state,
        rejectedFiles: action.rejectedFiles,
      }
    case 'setAllFiles':
      return {
        ...state,
        acceptedFiles: action.acceptedFiles,
        rejectedFiles: action.rejectedFiles,
      }
    case 'deleteFile':
      return {
        ...state,
        acceptedFiles: action.acceptedFiles,
      }
    default:
      return state
  }
}

function isDefined(value) {
  return value !== undefined && value !== null
}

export function FileDropzone({
  multiple = true,
  maxSize = Infinity,
  minSize = 0,
  acceptFormats,
  rejectFormats,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
} = {}) {

  const refDropzone = useRef(null);
  const refInput = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOnDragEnter = useCallback( event => {
    event.preventDefault();
    if (onDragEnter) {
      onDragEnter(event);
    }
  }, [] );

  const handleOnDragOver = useCallback( event => {
    event.preventDefault();
    if (onDragOver) {
      onDragOver(event);
    }
  }, [] );

  const handleOnDrop = useCallback( event => {
    event.preventDefault();
    let dataTransfer = event.dataTransfer;
    let files = dataTransfer.files;
    addFiles(files);
    if (onDrop) {
      onDrop(event);
    }
  }, [] );

  const handleOnChange = useCallback( event => {
    event.preventDefault();
    let files = event.target.files;
    addFiles(files);
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

  const addFiles = (files) => {
    let acceptedFiles = (multiple) ? state.acceptedFiles : [];
    let rejectedFiles = (multiple) ? state.rejectedFiles : [];
    for (var i = 0; i < files.length; i++) {
      if (fileAccepted(files[i]) && fileMatchSize(files[i])) {
        acceptedFiles.push(files[i])
      } else {
        rejectedFiles.push(files[i])
      }
    }

    dispatch({
      type: 'setAllFiles',
      acceptedFiles,
      rejectedFiles
    });
  };

  const fileAccepted = (file) => {
    if (isDefined(file.format)) {
      if (acceptFormats.length > 0 && rejectFormats.length > 0) {
        return (acceptFormats.indexOf(file.format) && !rejectFormats.indexOf(file.format));
      } else if (acceptFormats.length > 0) {
        return (acceptFormats.indexOf(file.format));
      } else if (rejectFormats.length > 0) {
        return (!rejectFormats.indexOf(file.format));
      }
    }
    return true;
  }

  const fileMatchSize = (file) => {
    if (isDefined(file.size)) {
      if (minSize >= 0 && maxSize)
        return file.size >= minSize && file.size <= maxSize
      else if (minSize >= 0)
        return file.size >= minSize
      else if (maxSize)
        return file.size <= maxSize
    }
    return true;
  }

  const getContainerProps = useMemo(() => () => {
    const props = {
      ref: refDropzone,
      onClick: handleOnClick,
      onDragEnter: handleOnDragEnter,
      onDragOver: handleOnDragOver,
      onDrop: handleOnDrop,
    };

    return ( props );
  }, [refDropzone, handleOnClick, handleOnDragEnter, handleOnDragOver, handleOnDrop]);
  
  const getInputProps = useMemo(() => () => {
    const props = {
      multiple,
      ref: refInput,
      type: 'file',
      onChange: handleOnChange
    };

    return ( props )
  }, [handleOnChange, multiple]);

  return {
    ...state,
    getContainerProps,
    getInputProps,
  }
};

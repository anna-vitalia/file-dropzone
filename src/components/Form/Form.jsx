import React from 'react';
import { FileDropzone } from '../utils/FileDropzone.jsx';

const Form = () => {
    const {acceptedFiles, getContainerProps, getInputProps} = FileDropzone();
    
    return (
      <div className="dropzone" {...getContainerProps()}>
        <input {...getInputProps()} />
        <div className="label">
          <p>drag and drop here your files </p>
        </div>
      </div>
    );
}

export default Form; 
import React from 'react';
import { FileDropzone } from '../utils/FileDropzone.jsx';

const Form = () => {
    const {acceptedFiles, getContainerProps, getInputProps} = FileDropzone();
    
    let files = acceptedFiles.map(file => (
      <div key={file.name}>
        {file.name} - {file.size} bytes
      </div>
    ));

    return (
      <div>
        <div className="dropzone" {...getContainerProps()}>
        <input {...getInputProps()} />
        <div className="label">
          <p>drag and drop here your files </p>
          {files}
        </div>
      </div>
      </div>
      
    );
}

export default Form; 
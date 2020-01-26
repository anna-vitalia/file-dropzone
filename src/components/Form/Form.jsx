import React from 'react';
import { FileDropzone } from '../utils/FileDropzone.jsx';

const Form = () => {
    const {acceptedFiles, getContainerProps, getInputProps} = FileDropzone();
    
    let files = acceptedFiles.map(file => (
      <div className='item' key={file.name}>
        <div className='info'>
          <span className='name'>{file.name}</span> <span className='size'>{file.size}</span> bytes
        </div>
      </div>
    ));

    return (
      <div className='files-zone'>
        <div className='dropzone' {...getContainerProps()}>
          <input {...getInputProps()} />
          <div className='label'>
            <p>drag and drop here your files </p>
          </div>
        </div>
        <div className='files-wrapper'>
          <div>Files</div>
          <div className='files-list'>
            {files}
          </div>
        </div>
      </div>
    );
}

export default Form; 
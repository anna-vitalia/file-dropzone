import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className='app-wrapper'>
      <header className='app-header'>
          File dropzone
      </header>
      <div className='app-wrapper-content'>
        <div className='files-zone'>
          <div className='dropzone'>
            <input type='file' />
            <p className='label'> drag-ndrop here your files </p>
          </div>
          <div className='files-wrapper'>
            <div>Files</div>
            <div className='files-list'>
              <div className='item'>
                <div className='info'>
                  <span className='name'>file1.jpg</span>
                  <span className='size'>9999Mb</span>
                </div>
                <div className='actions'>
                  <button className='delete'>Delete</button>
                  <button className='upload'>Upload</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import FileDropzone from './components/FileDropzone/FileDropzone.jsx';

const App = () => {
  return (
    <div className='app-wrapper'>
      <header className='app-header'>
          File dropzone
      </header>
      <div className='app-wrapper-content'>
          <FileDropzone />
      </div>
    </div>
  );
}

export default App;

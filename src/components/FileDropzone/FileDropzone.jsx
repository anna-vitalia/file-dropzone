import React from 'react';

class FileDropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {files: ''};
    this.inputRef = React.createRef();
  }

  _handleOnDrag(event) {
    event.preventDefault();
  }

  _handleOnDrop(event) {
    event.preventDefault();
    let dataTransfer = event.dataTransfer;
    let files = dataTransfer.files;
    //todo: если нужен только один файл
    this._handleFileChange(files);
  }

  _handleFileChange(filesList) {
    this.setState({
      files: filesList,
    });
  }

  _handleInputFileChange(event) {
    event.preventDefault();
    let files = event.target.files;
    this._handleFileChange(files);
  }

  _handleOnClick(event) {
    this.inputRef.current.click();
  }

  render() {
    console.log(this.state);
    return (
      <div className="dropzone" onClick={(event) => this._handleOnClick(event)} onDragEnter ={(event)=>{this._handleOnDrag(event)}} onDragOver={(event)=>{this._handleOnDrag(event)}} onDrop={(event)=>{this._handleOnDrop(event)}}>
        <input type="file"  ref={this.inputRef} onChange={(event) => {this._handleInputFileChange(event)}} />
        <div className="label">
          drag and drop here your files 
        </div>
      </div>
    )
  }
}

export default FileDropzone;
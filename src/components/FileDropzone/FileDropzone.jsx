import React from 'react';

class FileDropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '', fileUrl: '', fileSize: ''};
  }

  _handleFileChange(event) {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        fileUrl: reader.result,
        fileSize: file.size
      });
    }
    reader.readAsDataURL(file)
  }

  _testCallback() {
    this.props.testCallback();
  }

  render() {
    return (
      <div className="previewComponent">
        <input type="file" 
          onChange={(event)=>{this._handleFileChange(event); this._testCallback()}} />
        <div className="fileInfo">
          { this.state.fileUrl } <p>{ this.state.fileSize }</p> 
        </div>
      </div>
    )
  }
}

export default FileDropzone;
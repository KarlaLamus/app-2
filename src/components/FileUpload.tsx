import React from 'react';

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  inputId: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

function FileUpload({ file, onFileChange, inputId, inputRef }: FileUploadProps) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      onFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div className="drop-zone" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <p>{file ? file.name : 'Arrastra aquí un archivo .zip'}</p>
      <input
        type="file"
        id={inputId}
        accept=".zip"
        onChange={handleChange}
        ref={inputRef}
        style={{ display: 'none' }}
      />
      <label htmlFor={inputId} className="file-upload-btn">
        Buscar archivo
      </label>
    </div>
  );
}

export default FileUpload;

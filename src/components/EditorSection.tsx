import { useState } from 'react';
import './EditorSection.css';

function EditorSection() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const blob = new Blob(['Contenido ficticio ZIP'], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resultado.zip';
      a.click();
      URL.revokeObjectURL(url);
    }, 3000);
  };

  return (
    <div className="editor-section">
      <div
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p>{file ? file.name : 'Arrastra aquí un archivo .zip'}</p>
        <input
          type="file"
          id="fileUploadEditor"
          accept=".zip"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="fileUploadEditor" className="file-upload-btn">
          Buscar archivo
        </label>
      </div>

      <button
        className="edit-btn"
        onClick={handleUpload}
        disabled={!file || loading}
        >
        {loading ? (
            <>
            <span className="spinner"></span>
            Editando
            </>
        ) : (
            'Editar'
        )}
        </button>

    </div>
  );
}

export default EditorSection;

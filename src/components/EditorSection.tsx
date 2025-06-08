import { useState } from 'react';
import FileUpload from './FileUpload';
import './EditorSection.css';

function EditorSection() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = () => {
    if (!file) return;
    setLoading(true);
    setError('');

    try {
      // Simulate async operation
      setTimeout(() => {
        setLoading(false);
        setShowSuccess(true);
        const blob = new Blob(['Contenido ficticio ZIP'], { type: 'application/zip' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resultado.zip';
        a.click();
        URL.revokeObjectURL(url);
        setTimeout(() => setShowSuccess(false), 7000);
      }, 3000);
    } catch (err) {
      setLoading(false);
      setError('Ocurrió un error al procesar el archivo');
    }
  };

  return (
    <div className="editor-section">
      <h2 className="section-title">Estás en la sección de edición</h2>
      <FileUpload file={file} onFileChange={setFile} inputId="fileUploadEditor" />

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
      {error && <div className="error-message">{error}</div>}
      {showSuccess && (
        <div className="success-message">
          ✅ Las imágenes se han editado exitosamente
        </div>
      )}

    </div>
  );
}

export default EditorSection;

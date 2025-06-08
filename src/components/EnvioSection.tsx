import { useState } from 'react';
import './EditorSection.css'; // reutilizamos el CSS

function EnvioSection() {
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleSend = () => {
    if (!file) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setShowSuccess(true);
      setFile(null);
      setTimeout(() => setShowSuccess(false), 7000);
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
          id="fileUploadEnvio"
          accept=".zip"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="fileUploadEnvio" className="file-upload-btn">
          Buscar archivo
        </label>
      </div>

      <button
        className="edit-btn"
        onClick={handleSend}
        disabled={!file || sending}
      >
        {sending ? (
          <>
            <span className="spinner"></span>
            Enviando
          </>
        ) : (
          'Enviar'
        )}
      </button>
      {showSuccess && (
        <div className="success-message">
          ✅ Archivo enviado correctamente
        </div>
      )}
    </div>
  );
}

export default EnvioSection;

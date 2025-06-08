import { useState, useRef } from 'react';
import FileUpload from './FileUpload';
import './EnvioSection.css'; // reutilizamos el CSS

function EnvioSection() {
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleSend = () => {
    if (!file) return;
    setSending(true);
    setError('');
    try {
      setTimeout(() => {
        setSending(false);
        setShowSuccess(true);
        setFile(null);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        setTimeout(() => setShowSuccess(false), 7000);
      }, 3000);
    } catch (err) {
      setSending(false);
      setError('Ocurrió un error al enviar el archivo');
    }
  };

  return (
    <div className="editor-section">
      <h2 className="section-title">Estás en la sección de envío</h2>
      <FileUpload file={file} onFileChange={handleFileChange} inputId="fileUploadEnvio" inputRef={inputRef} />

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
      {error && <div className="error-message">{error}</div>}
      {showSuccess && (
        <div className="success-message">
          ✅ Archivo enviado correctamente
        </div>
      )}
    </div>
  );
}

export default EnvioSection;

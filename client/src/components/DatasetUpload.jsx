import { useState } from 'react';
import axios from 'axios';

const DatasetUpload = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [metadata, setMetadata] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('dataset', file);

        setUploading(true);

        try {
            const res = await axios.post('http://localhost:5000/api/projects/upload-dataset', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMetadata(res.data.metadata);
            setUploading(false);
        } catch (err) {
            console.error(err);
            setUploading(false);
        }
    };

    return (
        <div>
            <h1>Upload Dataset</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>

            {metadata && (
                <div>
                    <h2>Dataset Metadata</h2>
                    <p><strong>Name:</strong> {metadata.name}</p>
                    <p><strong>Size:</strong> {metadata.size} bytes</p>
                    <p><strong>Columns:</strong> {metadata.columns.join(', ')}</p>
                    <p><strong>Rows:</strong> {metadata.rowCount}</p>
                </div>
            )}
        </div>
    );
};

export default DatasetUpload;

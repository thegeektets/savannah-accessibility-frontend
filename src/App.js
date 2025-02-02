import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [file, setFile] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('htmlFile', file);

        try {
            const response = await axios.post('http://localhost:8888/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setAnalysisResult(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>HTML Accessibility Analyzer</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".html" onChange={handleFileChange} />
                <button type="submit">Analyze</button>
            </form>

            {analysisResult && (
                <div>
                    <h2>Compliance Score: {analysisResult.complianceScore}</h2>
                    <h3>Issues:</h3>
                    <ul>
                        {analysisResult.issues.map((issue, index) => (
                            <li key={index}>
                                <strong>{issue.type}:</strong> {issue.message} <em>{issue.fix}</em>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const analyzeResume = async (resumeFile, jdText) => {
    const formData = new FormData();
    formData.append('resume_file', resumeFile);
    formData.append('jd_text', jdText);

    try {
        const response = await axios.post(`${API_URL}/analyze`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error analyzing resume:', error);
        throw error;
    }
};

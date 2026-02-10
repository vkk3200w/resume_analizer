import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { analyzeResume } from '../api/analysis';

const UploadPage = ({ setAnalysisResult }) => {
    const navigate = useNavigate();
    const [resumeFile, setResumeFile] = useState(null);
    const [jdText, setJdText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [step, setStep] = useState(1);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resumeFile || !jdText) {
            setError("Please provide both a resume and a job description.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await analyzeResume(resumeFile, jdText);
            setAnalysisResult(result);
            navigate('/results');
        } catch (err) {
            setError("Failed to analyze resume. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-gray-900">Upload Your Info</h1>
                <p className="mt-2 text-lg text-gray-600">Let's see how well you match the job.</p>
            </div>

            {/* Stepper */}
            <div className="flex justify-center mb-12">
                <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${resumeFile ? 'bg-secondary text-white' : 'bg-primary text-white'}`}>
                        {resumeFile ? <Check size={16} /> : '1'}
                    </div>
                    <div className="h-1 w-12 bg-gray-200">
                        <div className={`h-full ${resumeFile ? 'bg-secondary' : 'bg-gray-200'}`} style={{ width: resumeFile ? '100%' : '0%' }}></div>
                    </div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${jdText.length > 20 ? 'bg-secondary text-white' : (resumeFile ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500')}`}>
                        {jdText.length > 20 ? <Check size={16} /> : '2'}
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center h-64">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                    <p className="text-lg text-gray-600 font-medium">Analyzing your profile...</p>
                    <p className="text-sm text-gray-500 mt-2">Extracting skills, parsing JD, and calculating score.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-100">

                    {/* Resume Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume (PDF/DOCX)</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-primary transition-colors">
                            <div className="space-y-1 text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-indigo-500 focus-within:outline-none">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.docx" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PDF or DOCX up to 10MB</p>
                                {resumeFile && (
                                    <p className="text-sm text-secondary font-semibold mt-2 flex items-center justify-center">
                                        <Check size={14} className="mr-1" /> {resumeFile.name}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* JD Input */}
                    <div>
                        <label htmlFor="jd" className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                        <div className="mt-1">
                            <textarea
                                id="jd"
                                rows={6}
                                className="shadow-sm focus:ring-primary focus:border-primary mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-3"
                                placeholder="Paste the full job description here..."
                                value={jdText}
                                onChange={(e) => setJdText(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={!resumeFile || !jdText}
                            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${(!resumeFile || !jdText) ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary hover:bg-indigo-700'}`}
                        >
                            Analyze Match
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UploadPage;

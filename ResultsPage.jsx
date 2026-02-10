import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { CheckCircle, XCircle, AlertTriangle, ArrowRight, Copy } from 'lucide-react';

const COLORS = ['#10B981', '#E5E7EB'];

const ResultsPage = ({ analysisResult }) => {
    if (!analysisResult) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-700">No results found.</h2>
                <p className="text-gray-500">Please upload a resume first.</p>
            </div>
        )
    }

    const { match_score, feedback, resume_data, jd_data } = analysisResult;
    const score = match_score?.match_score || 0;

    // Data for Gauge
    const gaugeData = [
        { name: 'Match', value: score },
        { name: 'Gap', value: 100 - score },
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="md:flex md:items-center md:justify-between mb-10">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                            Analysis Results
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Role: <span className="font-semibold text-gray-700">{jd_data?.role_title || "Unknown Role"}</span>
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* Score Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white overflow-hidden shadow rounded-lg lg:col-span-1 p-6 flex flex-col items-center justify-center"
                    >
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Match Score</h3>
                        <div className="h-64 w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={gaugeData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={-270}
                                    >
                                        <Cell key="match" fill={COLORS[0]} />
                                        <Cell key="gap" fill={COLORS[1]} />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-5xl font-bold text-gray-900">{score}%</span>
                                <span className="text-sm text-gray-500">Match</span>
                            </div>
                        </div>
                        <p className="text-center text-sm text-gray-600 mt-4 px-4">
                            {match_score?.summary}
                        </p>
                    </motion.div>

                    {/* Missing Skills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white overflow-hidden shadow rounded-lg lg:col-span-2 p-6"
                    >
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Skill Gap Analysis</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-3 flex items-center">
                                    <XCircle size={16} className="mr-2" /> Missing Critical Skills
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {match_score?.missing_skills?.map((skill, idx) => (
                                        <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                            {skill}
                                        </span>
                                    )) || <p className="text-sm text-gray-500">None found!</p>}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-yellow-600 uppercase tracking-wider mb-3 flex items-center">
                                    <AlertTriangle size={16} className="mr-2" /> Partial Matches
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {match_score?.partial_matches?.map((skill, idx) => (
                                        <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                            {skill}
                                        </span>
                                    )) || <p className="text-sm text-gray-500">None found!</p>}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Feedback Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Smart Improvements</h3>

                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {feedback?.bullet_improvements?.map((item, idx) => (
                                <li key={idx} className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-start md:space-x-4">
                                        <div className="md:w-1/2 mb-4 md:mb-0">
                                            <h5 className="text-xs font-semibold text-red-500 uppercase mb-1">Original</h5>
                                            <div className="bg-red-50 p-3 rounded text-sm text-gray-700 border border-red-100">
                                                "{item.original}"
                                            </div>
                                            <p className="mt-2 text-xs text-gray-500 italic">{item.explanation}</p>
                                        </div>

                                        <div className="hidden md:block self-center">
                                            <ArrowRight className="text-gray-300" />
                                        </div>

                                        <div className="md:w-1/2">
                                            <h5 className="text-xs font-semibold text-green-600 uppercase mb-1">Improved Rewrite</h5>
                                            <div className="bg-green-50 p-3 rounded text-sm text-gray-800 border border-green-100 relative group">
                                                "{item.improved}"
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(item.improved)}
                                                    className="absolute top-2 right-2 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Copy to clipboard"
                                                >
                                                    <Copy size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Projects & Certs */}
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="bg-white p-6 shadow rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended Projects</h3>
                        <div className="space-y-4">
                            {feedback?.project_suggestions?.map((proj, idx) => (
                                <div key={idx} className="border-l-4 border-primary pl-4 py-2">
                                    <h4 className="text-base font-semibold text-gray-800">{proj.name}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{proj.description}</p>
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {proj.skills_demonstrated?.map((s, i) => (
                                            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 shadow rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended Certifications</h3>
                        <div className="space-y-4">
                            {feedback?.certification_suggestions?.map((cert, idx) => (
                                <div key={idx} className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <CheckCircle className="h-5 w-5 text-secondary" />
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="text-base font-semibold text-gray-800">{cert.name}</h4>
                                        <p className="text-sm text-gray-500">{cert.provider}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ResultsPage;

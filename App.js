import React, { useState } from "react";

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!resumeFile || !jobDesc) {
      alert("Please upload resume and paste job description");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume_file", resumeFile);
    formData.append("job_description", jobDesc);

    const res = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">
          AI Resume – Job Match Analyzer
        </h1>

        {/* File Upload */}
        <input
          type="file"
          accept=".pdf"
          className="w-full mb-4"
          onChange={(e) => setResumeFile(e.target.files[0])}
        />

        {/* Job Description */}
        <textarea
          placeholder="Paste Job Description"
          rows={5}
          className="w-full border rounded-md p-2 mb-4"
          onChange={(e) => setJobDesc(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={analyzeResume}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {/* RESULTS SECTION */}
        {result && (
          <div className="mt-6 space-y-4">

            {/* ATS Score */}
            <div>
              <h2 className="text-lg font-semibold">ATS Match Score</h2>
              <p className="text-4xl font-bold text-green-600">
                {result.overall_match_percentage}%
              </p>
            </div>

            {/* Summary */}
            <div>
              <h3 className="font-medium">Recruiter Summary</h3>
              <p className="text-gray-600">{result.summary}</p>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded">
                <p className="font-medium">Skill Match</p>
                <p className="text-xl">{result.skill_match_score}%</p>
              </div>

              <div className="bg-blue-50 p-3 rounded">
                <p className="font-medium">Keyword Match</p>
                <p className="text-xl">{result.keyword_match_score}%</p>
              </div>
            </div>

            {/* Missing Skills */}
            <div>
              <h3 className="font-medium">Missing Mandatory Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {result.missing_mandatory_skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Partial Matches */}
            <div>
              <h3 className="font-medium">Partial Skill Matches</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {result.partial_matches.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;

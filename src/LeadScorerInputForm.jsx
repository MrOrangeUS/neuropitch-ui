// LeadScorerInputForm.jsx (Improved Spacing & Layout)
import React, { useState } from 'react';

export default function LeadScorerInputForm() {
  const [lead, setLead] = useState({
    name: '',
    title: '',
    company: '',
    industry: '',
    revenue: '',
    intent: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setLead({ name: '', title: '', company: '', industry: '', revenue: '', intent: '' });
    setResult(null);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/score-leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leads: [lead] })
      });
      const data = await res.json();
      setResult(data.results[0]);
    } catch (err) {
      console.error('Scoring failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-bold mb-10">Lead Scorer</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 space-y-6"
      >
        {Object.entries(lead).map(([key, value]) => (
          <div key={key} className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
              {key}
            </label>
            <input
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
              className="p-3 rounded-md bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
        ))}

        <div className="flex justify-between items-center pt-2">
          <button
            type="submit"
            className="bg-white text-black px-6 py-2 font-semibold rounded hover:bg-gray-300"
          >
            {loading ? 'Scoring...' : 'Score Lead'}
          </button>
          {result && (
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-600 text-white px-6 py-2 font-semibold rounded hover:bg-gray-500"
            >
              Reset
            </button>
          )}
        </div>
      </form>

      {result && (
        <div className="mt-10 w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <p className="text-xl font-bold mb-2">
            {result.name}{' '}
            <span className="text-gray-400">
              ({result.title} at {result.company})
            </span>
          </p>
          <p className={`text-lg font-semibold mb-2 ${getScoreColor(result.score)}`}>
            Score: {result.score}
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">Reason: {result.reason}</p>
        </div>
      )}
    </div>
  );
}

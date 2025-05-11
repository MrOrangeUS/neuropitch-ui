import React, { useState } from 'react';

export default function LeadScorer() {
  const [leads, setLeads] = useState([
    {
      name: 'Jordan Vance',
      title: 'Head of Operations',
      company: 'CloudPilot',
      industry: 'SaaS',
      revenue: '25M',
      website: 'cloudpilot.io',
      intent: 'Downloaded case study on AI call routing'
    }
  ]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScore = async () => {
    setLoading(true);
    const res = await fetch('/api/score-leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leads })
    });
    const data = await res.json();
    setResults(data.results);
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl mb-4">Lead Scorer</h1>
      <button
        onClick={handleScore}
        className="bg-cyan-400 text-black px-4 py-2 rounded hover:bg-cyan-300"
      >
        {loading ? 'Scoring...' : 'Score Leads'}
      </button>
      {results && (
        <div className="mt-6 space-y-4">
          {results.map((lead, idx) => (
            <div key={idx} className="p-4 bg-gray-800 rounded">
              <p><strong>{lead.name}</strong> ({lead.title} at {lead.company})</p>
              <p>Score: <span className="text-cyan-400 font-bold">{lead.score}</span></p>
              <p className="text-sm text-gray-400">Reason: {lead.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

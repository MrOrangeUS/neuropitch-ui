import { useState } from 'react';
import axios from 'axios';
import LeadScorerInputForm from '../components/lead-scorer/LeadScorerInputForm';
import LeadScoreResult from '../components/lead-scorer/LeadScoreResult';

export default function LeadScorer() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/score-leads`,
        formData
      );
      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'An error occurred while analyzing the lead. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">SmartLead Scorer</h1>
        <p className="mt-2 text-gray-600">
          Enter lead information below to get an AI-powered lead score and detailed analysis.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="card">
        <LeadScorerInputForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>

      {result && <LeadScoreResult score={result.score} reasoning={result.reasoning} />}
    </div>
  );
} 
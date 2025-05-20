export default function LeadScoreResult({ score, reasoning }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (!score) return null;

  return (
    <div className="mt-8 card space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Lead Score Analysis</h2>
        <div className={`px-4 py-2 rounded-full font-semibold ${getScoreColor(score)}`}>
          Score: {score}/100
        </div>
      </div>
      
      <div className="prose prose-sm">
        <h3 className="text-lg font-medium text-gray-900">AI Reasoning:</h3>
        <p className="text-gray-700 whitespace-pre-line">{reasoning}</p>
      </div>
    </div>
  );
} 
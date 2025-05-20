import { useState } from 'react';

const INITIAL_FORM_STATE = {
  name: '',
  title: '',
  company: '',
  industry: '',
  revenue: '',
  intent: '',
};

export default function LeadScorerInputForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">
            Contact Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div>
          <label htmlFor="title" className="label">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div>
          <label htmlFor="company" className="label">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div>
          <label htmlFor="industry" className="label">
            Industry
          </label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div>
          <label htmlFor="revenue" className="label">
            Annual Revenue
          </label>
          <input
            type="text"
            id="revenue"
            name="revenue"
            value={formData.revenue}
            onChange={handleChange}
            className="input"
            placeholder="e.g. $1M - $5M"
            required
          />
        </div>

        <div>
          <label htmlFor="intent" className="label">
            Buying Intent Signals
          </label>
          <textarea
            id="intent"
            name="intent"
            value={formData.intent}
            onChange={handleChange}
            className="input h-24 resize-none"
            placeholder="Describe any signals of buying intent..."
            required
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing...' : 'Score Lead'}
        </button>
      </div>
    </form>
  );
} 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LeadScorer from './pages/LeadScorer';
import VoiceBuddy from './pages/VoiceBuddy';
import LeadFlow from './pages/LeadFlow';
import CallGuard from './pages/CallGuard';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/lead-scorer" replace />} />
            <Route path="lead-scorer" element={<LeadScorer />} />
            <Route path="voice-buddy" element={<VoiceBuddy />} />
            <Route path="lead-flow" element={<LeadFlow />} />
            <Route path="call-guard" element={<CallGuard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

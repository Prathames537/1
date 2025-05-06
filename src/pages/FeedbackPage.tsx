import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from '@/lib/supabaseClient';

const LOCAL_AI_URL = "http://localhost:8000/feedback-ai";

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{ analysis: string; urgent: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setSuccess(false); setAiAnalysis(null);
    try {
      const res = await fetch(LOCAL_AI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      });
      if (!res.ok) throw new Error("AI backend error");
      const ai = await res.json();
      setAiAnalysis(ai);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">Feedback & Support</h1>
        {submitted ? (
          <div className="bg-green-100 text-green-800 p-4 rounded">Thank you for your feedback!</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
            <textarea
              className="input w-full h-32"
              placeholder="Enter your feedback or support request..."
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        )}
        {aiAnalysis && (
          <div className={`mt-4 p-4 rounded-lg ${aiAnalysis.urgent ? 'bg-red-100 border border-red-400' : 'bg-welli-pale-green'}`}>
            <div className="text-sm font-semibold">AI Analysis:</div>
            <div className="text-sm">{aiAnalysis.analysis}</div>
            {aiAnalysis.urgent && <div className="text-xs text-red-600 font-bold mt-1">Flagged as urgent for admin review</div>}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FeedbackPage;

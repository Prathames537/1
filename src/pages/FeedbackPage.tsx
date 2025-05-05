import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from '@/lib/supabaseClient';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('feedback').insert([
      { message: feedback }
    ]);
    setSubmitted(true);
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
      </main>
      <Footer />
    </div>
  );
};

export default FeedbackPage;

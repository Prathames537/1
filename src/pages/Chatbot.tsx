import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Hugging Face Inference API endpoint and API key
const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1";
const HF_API_KEY = process.env.NEXT_PUBLIC_HF_API_KEY; // Read from environment variable

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  createdAt?: any;
}

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load chat history for logged-in user
  // Removed unused fetchHistory function
//   const auth = getAuth();
//   const user = auth.currentUser;
//   if (!user) return;
//   const q = query(collection(db, "chats"), where("userId", "==", user.uid));
//   const snap = await getDocs(q);
//   const history: ChatMessage[] = [];
//   snap.docs.forEach(doc => {
//     const d = doc.data();
//     if (d.messages) {
//       d.messages.forEach((m: any) => history.push(m));
//     }
//   });
//   setMessages(history);
// };


  // Save chat history
  const saveHistory = async (chat: ChatMessage[]) => {
    // TODO: Migrate chat history logic to Supabase if needed.
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true); setError(null);
    const userMsg: ChatMessage = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    try {
      // Send message to Hugging Face Inference API
      const res = await fetch(HF_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: newMessages.map(m => `${m.role}: ${m.content}`).join("\n") + "\nassistant:",
          parameters: { max_new_tokens: 256, return_full_text: false },
        }),
      });
      let reply = "";
      if (res.ok) {
        const data = await res.json();
        if (data && data[0] && data[0].generated_text) {
          // Extract only the assistant's reply
          reply = data[0].generated_text.split("assistant:").pop()?.trim() || "";
        } else if (data.generated_text) {
          reply = data.generated_text;
        } else {
          reply = "Sorry, I couldn't understand that.";
        }
      } else {
        reply = "Sorry, I couldn't get a response from the AI.";
      }
      const aiMsg: ChatMessage = { role: "assistant", content: reply };
      setMessages(msgs => [...msgs, aiMsg]);
      await saveHistory([...newMessages, aiMsg]);
    } catch (err: any) {
      setError("Failed to get response from AI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-welli-text-dark">AI Health Assistant</h1>
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 min-h-[400px] flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 max-h-96">
              {messages.length === 0 && <div className="text-welli-text-medium text-center">Start a conversation with our AI health assistant.</div>}
              {messages.map((msg, idx) => (
                <div key={idx} className={msg.role === "user" ? "text-right mb-2" : "text-left mb-2"}>
                  <span className={msg.role === "user" ? "inline-block bg-welli-pale-green text-welli-dark-green rounded-lg px-4 py-2" : "inline-block bg-welli-dark-green text-white rounded-lg px-4 py-2"}>
                    {msg.content}
                  </span>
                </div>
              ))}
              {loading && <div className="text-center text-welli-dark-green">AI is typing...</div>}
              {error && <div className="text-center text-red-600 mt-2">{error}</div>}
            </div>
            <div className="flex gap-2 mt-2">
              <input
                className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-welli-light-green"
                type="text"
                placeholder="Type your question..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
                disabled={loading}
              />
              <button
                className="bg-welli-dark-green hover:bg-welli-green text-white px-6 py-3 rounded-lg font-medium"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

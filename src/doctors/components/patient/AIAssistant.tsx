import { useState } from 'react';
import { Bot, SendHorizontal, X, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AIAssistantProps {
  patient: any;
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ patient, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `I'm analyzing ${patient.name}'s medical history and current symptoms. How can I help with your diagnosis?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [analyzingData, setAnalyzingData] = useState(false);
  
  const suggestions = [
    "What risk factors does the patient have for cardiovascular disease?",
    "Suggest follow-up tests for the patient's hypertension",
    "Identify possible causes for the patient's headaches",
    "What medication alternatives could be considered?",
    "Analyze family history for genetic patterns",
  ];
  
  const handleSendMessage = (message: string = input) => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setInput('');
    setShowSuggestions(false);
    setAnalyzingData(true);

    // For real AI integration, prepend a system prompt here:
    // const prompt = `You are a helpful health assistant.\nUser: ${message}`;

    // Only send the latest user message as the prompt (simulate AI response)
    setTimeout(() => {
      setAnalyzingData(false);
      // Here, you would call your AI backend with just the latest message as prompt
      // For now, keep the simulated logic as before
      let aiResponse = '';
      
      if (message.toLowerCase().includes('risk') && message.toLowerCase().includes('cardiovascular')) {
        aiResponse = `Based on ${patient.name}'s profile, I've identified several cardiovascular risk factors:
\n1. Family history: Father and paternal grandfather had cardiovascular issues\n2. Hypertension: Latest reading shows BP at 140/90 mmHg (elevated)\n3. Cholesterol: Slightly elevated at 210 mg/dL\n\nRECOMMENDATION:\n- Consider statin therapy if lifestyle modifications don't improve cholesterol\n- Increase monitoring frequency to every 3 months\n- Screen for other metabolic disorders`;
      } else if (message.toLowerCase().includes('headaches')) {
        aiResponse = `Analyzing the patient's headache reports and medical history:\n\nPotential causes for ${patient.name}'s headaches:\n1. Hypertension (primary suspect given BP readings)\n2. Stress-related tension headaches\n3. Medication side effects (Lisinopril can cause headaches in ~10% of patients)\n\nRECOMMENDATION:\n- Assess headache patterns with a 2-week diary\n- Consider 24-hour ambulatory blood pressure monitoring\n- Rule out vision problems with basic ophthalmologic screening`;
      } else if (message.toLowerCase().includes('family history') || message.toLowerCase().includes('genetic')) {
        aiResponse = `Genetic analysis of ${patient.name}'s family history indicates:\n\nKEY FINDINGS:\n- Strong pattern of cardiovascular disease (paternal line)\n- Diabetes present in paternal side\n- Breast cancer in maternal line\n\nGENETIC RISK ASSESSMENT:\n- HIGH: Cardiovascular disease (recommend genetic counseling)\n- MODERATE: Type 2 diabetes\n- STANDARD: Breast cancer risk (follow standard screening protocols)\n\nConsider offering genetic testing for cardiovascular risk factors.`;
      } else if (message.toLowerCase().includes('medication') || message.toLowerCase().includes('alternative')) {
        aiResponse = `Current medication: Lisinopril 10mg daily\n\nAlternative treatment options for ${patient.name}'s hypertension:\n1. ACE Inhibitors: Current class (Lisinopril) - consider monitoring for headache side effect\n2. ARBs: Losartan 50mg - may have fewer side effects\n3. Calcium Channel Blockers: Amlodipine 5mg - good option if headaches persist\n4. Diuretics: Hydrochlorothiazide 12.5mg - may complement current therapy\n\nRECOMMENDATION:\nConsider adding low-dose hydrochlorothiazide as adjunct therapy if blood pressure remains elevated at next visit.`;
      } else if (message.toLowerCase().includes('test') || message.toLowerCase().includes('follow-up')) {
        aiResponse = `Recommended follow-up tests for ${patient.name}'s hypertension:\n\nPRIORITY TESTS:\n1. Comprehensive metabolic panel (assess kidney function)\n2. Lipid panel (monitor cholesterol levels)\n3. 24-hour ambulatory blood pressure monitoring\n4. Echocardiogram (to check for left ventricular hypertrophy)\n\nSCREENING TIMELINE:\n- Metabolic panel: Within 2 weeks\n- Blood pressure monitoring: Next 7 days\n- Echocardiogram: Schedule within 30 days\n- Follow-up visit: In 3-4 weeks`;
      } else {
        aiResponse = `Based on ${patient.name}'s medical profile, I've analyzed the following information:\n\nKEY OBSERVATIONS:\n- Hypertension requiring medication management\n- Elevated cholesterol requiring monitoring\n- Family history significant for cardiovascular disease\n- Recent reports of headaches that may be related to blood pressure\n\nDIAGNOSTIC CONSIDERATIONS:\n- Primary Hypertension (Stage 1)\n- Possible Metabolic Syndrome\n- Family history suggesting genetic cardiovascular risk\n\nWould you like me to analyze specific aspects of the patient's condition in more detail?`;
      }
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-card mb-6 overflow-hidden">
      <div className="bg-welli-green p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot size={20} className="text-welli-gray-800" />
          <h3 className="font-medium text-welli-gray-800">AI Diagnostic Assistant</h3>
          <Badge className="bg-white text-welli-accent-green">Beta</Badge>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>
      <div className="h-96 overflow-y-auto p-4 bg-welli-gray-100">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-3/4 rounded-lg p-3 ${
                message.role === 'user' 
                  ? 'bg-welli-green text-welli-gray-800' 
                  : 'bg-white border border-welli-gray-200'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-1">
                  <Bot size={14} className="text-welli-accent-green" />
                  <span className="text-xs font-medium text-welli-accent-green">AI Assistant</span>
                </div>
              )}
              <p className="whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
        {analyzingData && (
          <div className="flex justify-start mb-4">
            <div className="max-w-3/4 rounded-lg p-3 bg-white border border-welli-gray-200">
              <div className="flex items-center gap-2">
                <Bot size={14} className="text-welli-accent-green" />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-welli-accent-green">Analyzing patient data</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-welli-accent-green rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-welli-accent-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-welli-accent-green rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {showSuggestions && (
        <div className="p-3 border-t border-welli-gray-200">
          <p className="text-sm text-welli-gray-600 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => handleSendMessage(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="p-3 border-t border-welli-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the AI Assistant..."
            className="flex-1 px-3 py-2 border border-welli-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-welli-green"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button 
            className="bg-welli-green hover:bg-welli-dark-green text-welli-gray-800"
            onClick={() => handleSendMessage()}
          >
            <SendHorizontal size={18} />
          </Button>
        </div>
        <div className="flex items-center mt-2 px-2">
          <AlertCircle size={14} className="text-welli-gray-500 mr-2" />
          <p className="text-xs text-welli-gray-500">
            This is an AI assistant to help with diagnosis. Always use your clinical judgment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;

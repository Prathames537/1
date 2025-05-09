import { useState } from 'react';
import { Bot, SendHorizontal, AlertCircle, FileText, Stethoscope, Pill, Heart, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AIBot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI medical assistant. I can help you with:\n\n- Diagnosing patient symptoms\n- Suggesting treatment options\n- Analyzing medical reports\n- Providing drug information\n- Researching medical conditions\n\nHow can I assist you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [analyzingData, setAnalyzingData] = useState(false);
  
  const suggestions = [
    "Help me diagnose a patient with chest pain",
    "What are the latest treatment options for type 2 diabetes?",
    "Analyze this lab report for abnormalities",
    "Suggest alternative medications for hypertension",
    "What are the risk factors for cardiovascular disease?",
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
      if (message.toLowerCase().includes('chest pain')) {
        aiResponse = `For a patient presenting with chest pain, here's a systematic approach:\n\n1. Immediate Assessment:\n   - Check vital signs (BP, HR, O2 saturation)\n   - Perform ECG\n   - Assess pain characteristics (location, radiation, duration)\n\n2. Differential Diagnosis:\n   - Cardiac: MI, angina, pericarditis\n   - Pulmonary: PE, pneumothorax, pneumonia\n   - GI: GERD, esophageal spasm\n   - Musculoskeletal: Costochondritis, muscle strain\n\n3. Next Steps:\n   - Order cardiac enzymes\n   - Consider chest X-ray\n   - Assess risk factors\n   - Consider stress test if stable\n\nWould you like me to elaborate on any of these aspects?`;
      } else if (message.toLowerCase().includes('diabetes')) {
        aiResponse = `Latest treatment options for Type 2 Diabetes:\n\n1. First-line Medications:\n   - Metformin (still gold standard)\n   - SGLT2 inhibitors (empagliflozin, dapagliflozin)\n   - GLP-1 receptor agonists (semaglutide, liraglutide)\n\n2. New Developments:\n   - Tirzepatide (dual GIP/GLP-1 receptor agonist)\n   - Oral semaglutide\n   - Implantable glucose sensors\n\n3. Lifestyle Interventions:\n   - Low-carb diets\n   - Intermittent fasting\n   - High-intensity interval training\n\n4. Monitoring:\n   - Continuous glucose monitoring\n   - AI-powered glucose prediction\n   - Remote patient monitoring\n\nWould you like more details on any specific treatment option?`;
      } else if (message.toLowerCase().includes('lab report')) {
        aiResponse = `When analyzing lab reports, I can help identify:\n\n1. Common Abnormalities:\n   - CBC abnormalities\n   - Electrolyte imbalances\n   - Liver function tests\n   - Kidney function markers\n   - Lipid profiles\n   - Thyroid function tests\n\n2. Critical Values:\n   - Potassium > 6.0 mEq/L\n   - Sodium < 120 mEq/L\n   - Glucose > 400 mg/dL\n   - Creatinine > 4.0 mg/dL\n\n3. Patterns:\n   - Anemia types\n   - Infection markers\n   - Metabolic disorders\n   - Endocrine abnormalities\n\nPlease share the specific lab values you'd like me to analyze.`;
      } else if (message.toLowerCase().includes('hypertension')) {
        aiResponse = `Alternative medications for hypertension:\n\n1. First-line Options:\n   - ACE inhibitors (lisinopril, enalapril)\n   - ARBs (losartan, valsartan)\n   - Calcium channel blockers (amlodipine, diltiazem)\n   - Thiazide diuretics (hydrochlorothiazide)\n\n2. Second-line Options:\n   - Beta blockers (metoprolol, carvedilol)\n   - Alpha blockers (doxazosin)\n   - Centrally acting agents (clonidine)\n\n3. Combination Therapies:\n   - ACE inhibitor + CCB\n   - ARB + diuretic\n   - CCB + beta blocker\n\n4. Special Considerations:\n   - Renal protection (ACE/ARB)\n   - Heart failure (beta blockers)\n   - Diabetes (ACE/ARB)\n   - Elderly (CCB)\n\nWould you like specific dosing recommendations?`;
      } else if (message.toLowerCase().includes('risk')) {
        aiResponse = `Risk factors for cardiovascular disease:\n\n1. Non-modifiable:\n   - Age (>45 men, >55 women)\n   - Family history\n   - Gender\n   - Ethnicity\n\n2. Modifiable:\n   - Hypertension\n   - Hyperlipidemia\n   - Diabetes\n   - Smoking\n   - Obesity\n   - Physical inactivity\n   - Poor diet\n   - Stress\n\n3. Emerging Risk Factors:\n   - Sleep apnea\n   - Chronic kidney disease\n   - Autoimmune diseases\n   - Air pollution exposure\n\n4. Assessment Tools:\n   - Framingham Risk Score\n   - ASCVD Risk Calculator\n   - Coronary calcium scoring\n   - Carotid intima-media thickness\n\nWould you like me to explain any specific risk factor in detail?`;
      } else {
        aiResponse = `I can help you with various medical tasks:\n\n1. Diagnosis Support:\n   - Symptom analysis\n   - Differential diagnosis\n   - Risk assessment\n\n2. Treatment Planning:\n   - Medication options\n   - Dosage calculations\n   - Drug interactions\n   - Alternative therapies\n\n3. Research:\n   - Latest guidelines\n   - Clinical trials\n   - Evidence-based medicine\n   - Medical literature\n\n4. Patient Education:\n   - Condition explanations\n   - Treatment options\n   - Lifestyle modifications\n   - Follow-up care\n\nWhat specific medical assistance do you need?`;
      }
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-welli-gray-800">AI Medical Assistant</h1>
        <Badge className="bg-welli-accent-green text-white">Beta</Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-card overflow-hidden">
            <div className="bg-welli-green p-4">
              <div className="flex items-center gap-2">
                <Bot size={20} className="text-welli-gray-800" />
                <h3 className="font-medium text-welli-gray-800">AI Diagnostic Assistant</h3>
              </div>
            </div>
            
            <div className="h-[600px] overflow-y-auto p-4 bg-welli-gray-100">
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
                        <span className="text-xs font-medium text-welli-accent-green">Analyzing data</span>
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
                  This is an AI assistant to help with medical tasks. Always use your clinical judgment.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-5 shadow-card">
            <h3 className="text-lg font-medium text-welli-green mb-4">Quick Tools</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="flex flex-col items-center gap-2 h-24">
                <FileText size={24} className="text-welli-green" />
                <span>Medical Records</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-24">
                <Stethoscope size={24} className="text-welli-green" />
                <span>Diagnosis</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-24">
                <Pill size={24} className="text-welli-green" />
                <span>Medications</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-24">
                <Heart size={24} className="text-welli-green" />
                <span>Vitals</span>
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-card">
            <h3 className="text-lg font-medium text-welli-green mb-4">Recent Topics</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Brain size={16} /> Neurological Disorders
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Heart size={16} /> Cardiovascular Health
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Pill size={16} /> Pharmacology Updates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIBot; 
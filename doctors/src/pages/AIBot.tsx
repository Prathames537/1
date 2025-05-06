import React, { useState } from 'react';
import { Bot, SendHorizontal, AlertCircle, FileText, Stethoscope, Pill, Heart, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    
    setTimeout(() => {
      setAnalyzingData(false);
      
      let aiResponse = '';
      
      if (message.toLowerCase().includes('chest pain')) {
        aiResponse = `For a patient presenting with chest pain, here's a systematic approach:

1. Immediate Assessment:
   - Check vital signs (BP, HR, O2 saturation)
   - Perform ECG
   - Assess pain characteristics (location, radiation, duration)

2. Differential Diagnosis:
   - Cardiac: MI, angina, pericarditis
   - Pulmonary: PE, pneumothorax, pneumonia
   - GI: GERD, esophageal spasm
   - Musculoskeletal: Costochondritis, muscle strain

3. Next Steps:
   - Order cardiac enzymes
   - Consider chest X-ray
   - Assess risk factors
   - Consider stress test if stable

Would you like me to elaborate on any of these aspects?`;
      }
      else if (message.toLowerCase().includes('diabetes')) {
        aiResponse = `Latest treatment options for Type 2 Diabetes:

1. First-line Medications:
   - Metformin (still gold standard)
   - SGLT2 inhibitors (empagliflozin, dapagliflozin)
   - GLP-1 receptor agonists (semaglutide, liraglutide)

2. New Developments:
   - Tirzepatide (dual GIP/GLP-1 receptor agonist)
   - Oral semaglutide
   - Implantable glucose sensors

3. Lifestyle Interventions:
   - Low-carb diets
   - Intermittent fasting
   - High-intensity interval training

4. Monitoring:
   - Continuous glucose monitoring
   - AI-powered glucose prediction
   - Remote patient monitoring

Would you like more details on any specific treatment option?`;
      }
      else if (message.toLowerCase().includes('lab report')) {
        aiResponse = `When analyzing lab reports, I can help identify:

1. Common Abnormalities:
   - CBC abnormalities
   - Electrolyte imbalances
   - Liver function tests
   - Kidney function markers
   - Lipid profiles
   - Thyroid function tests

2. Critical Values:
   - Potassium > 6.0 mEq/L
   - Sodium < 120 mEq/L
   - Glucose > 400 mg/dL
   - Creatinine > 4.0 mg/dL

3. Patterns:
   - Anemia types
   - Infection markers
   - Metabolic disorders
   - Endocrine abnormalities

Please share the specific lab values you'd like me to analyze.`;
      }
      else if (message.toLowerCase().includes('hypertension')) {
        aiResponse = `Alternative medications for hypertension:

1. First-line Options:
   - ACE inhibitors (lisinopril, enalapril)
   - ARBs (losartan, valsartan)
   - Calcium channel blockers (amlodipine, diltiazem)
   - Thiazide diuretics (hydrochlorothiazide)

2. Second-line Options:
   - Beta blockers (metoprolol, carvedilol)
   - Alpha blockers (doxazosin)
   - Centrally acting agents (clonidine)

3. Combination Therapies:
   - ACE inhibitor + CCB
   - ARB + diuretic
   - CCB + beta blocker

4. Special Considerations:
   - Renal protection (ACE/ARB)
   - Heart failure (beta blockers)
   - Diabetes (ACE/ARB)
   - Elderly (CCB)

Would you like specific dosing recommendations?`;
      }
      else if (message.toLowerCase().includes('cardiovascular')) {
        aiResponse = `Risk factors for cardiovascular disease:

1. Non-modifiable:
   - Age (>45 men, >55 women)
   - Family history
   - Gender
   - Ethnicity

2. Modifiable:
   - Hypertension
   - Hyperlipidemia
   - Diabetes
   - Smoking
   - Obesity
   - Physical inactivity
   - Poor diet
   - Stress

3. Emerging Risk Factors:
   - Sleep apnea
   - Chronic kidney disease
   - Autoimmune diseases
   - Air pollution exposure

4. Assessment Tools:
   - Framingham Risk Score
   - ASCVD Risk Calculator
   - Coronary calcium scoring
   - Carotid intima-media thickness

Would you like me to explain any specific risk factor in detail?`;
      }
      else {
        aiResponse = `I can help you with various medical tasks:

1. Diagnosis Support:
   - Symptom analysis
   - Differential diagnosis
   - Risk assessment

2. Treatment Planning:
   - Medication options
   - Dosage calculations
   - Drug interactions
   - Alternative therapies

3. Research:
   - Latest guidelines
   - Clinical trials
   - Evidence-based medicine
   - Medical literature

4. Patient Education:
   - Condition explanations
   - Treatment options
   - Lifestyle modifications
   - Follow-up care

What specific medical assistance do you need?`;
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
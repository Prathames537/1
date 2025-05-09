import { useState, useEffect } from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Accordion, AccordionContent, AccordionItem, AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  MessageSquare, Search, HelpCircle, Phone,
  FileText, Clock, CheckCircle, Mail
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabaseClient';
import ChatBotDialog from "@/components/ChatBot/ChatBotDialog";

declare global {
  interface Window {
    openWelliAssistantAI?: () => void;
  }
}

const Support = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [messageText, setMessageText] = useState("");
  const [faqs, setFaqs] = useState<any[]>([]);
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data, error } = await supabase.from('faqs').select('*');
      if (!error) setFaqs(data || []);
    };
    fetchFaqs();
  }, []);

  useEffect(() => {
    window.openWelliAssistantAI = () => setAiOpen(true);
    return () => { delete window.openWelliAssistantAI; };
  }, []);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    // Clear input
    setMessageText("");

    toast({
      title: "Message Sent",
      description: "Our support team will respond shortly.",
    });
  };

  // Filter FAQs based on search query
  const filteredFaqs = searchQuery
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Help & Support</h1>
      </div>

      {/* Hero section */}
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="md:flex-1">
            <h2 className="text-xl font-semibold mb-2">How can we help you?</h2>
            <p className="text-welli-textSecondary mb-6">
              Find answers in our resources or reach out to our support team
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-welli-textSecondary" />
              <Input 
                placeholder="Search for help articles..." 
                className="pl-10"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Card className="bg-white">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-welli-background flex items-center justify-center mb-2">
                  <MessageSquare className="h-5 w-5 text-welli-accent" />
                </div>
                <h3 className="font-medium">Live Chat</h3>
                <p className="text-xs text-welli-textSecondary mt-1">
                  Chat with our support team
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-welli-background flex items-center justify-center mb-2">
                  <Phone className="h-5 w-5 text-welli-accent" />
                </div>
                <h3 className="font-medium">Call Us</h3>
                <p className="text-xs text-welli-textSecondary mt-1">
                  Mon-Fri, 9am-6pm EST
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Main content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column - FAQs */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Find quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-welli-textSecondary">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <p className="text-welli-textSecondary">
                    No results found for "{searchQuery}"
                  </p>
                  <Button 
                    variant="link" 
                    onClick={() => setSearchQuery("")}
                    className="mt-2"
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Help articles */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Help Articles
              </CardTitle>
              <CardDescription>
                Detailed guides and useful information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <Badge className="mb-2">Guide</Badge>
                    <h3 className="font-medium mb-1">
                      Complete Guide to Home Visits
                    </h3>
                    <p className="text-sm text-welli-textSecondary mb-3">
                      Learn everything you need to know about conducting professional home visits.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-welli-accent">
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <Badge className="mb-2">Tutorial</Badge>
                    <h3 className="font-medium mb-1">
                      Using the Welli Mobile App
                    </h3>
                    <p className="text-sm text-welli-textSecondary mb-3">
                      Step-by-step instructions for using all features of the Welli app.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-welli-accent">
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <Badge className="mb-2">Policy</Badge>
                    <h3 className="font-medium mb-1">
                      Payment & Earnings Guidelines
                    </h3>
                    <p className="text-sm text-welli-textSecondary mb-3">
                      Understand how payments are calculated and processed.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-welli-accent">
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <Badge className="mb-2">Safety</Badge>
                    <h3 className="font-medium mb-1">
                      Safety Protocols for Home Visits
                    </h3>
                    <p className="text-sm text-welli-textSecondary mb-3">
                      Essential safety guidelines to follow during each visit.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-welli-accent">
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-center mt-4">
                <Button variant="outline">View All Articles</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Contact */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Get in touch with our support team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-welli-background rounded-md">
                <Mail className="h-5 w-5 text-welli-accent mt-0.5" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-welli-textSecondary mt-1">
                    support@welli.com
                  </p>
                  <p className="text-xs text-welli-textSecondary mt-1">
                    Response time: 24 hours
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-welli-background rounded-md">
                <Phone className="h-5 w-5 text-welli-accent mt-0.5" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-welli-textSecondary mt-1">
                    +1 (555) 123-4567
                  </p>
                  <p className="text-xs text-welli-textSecondary mt-1">
                    Mon-Fri, 9am-6pm EST
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Submit a Request</h3>
                <div className="space-y-3">
                  <Textarea 
                    placeholder="Describe your issue or question..." 
                    className="min-h-[100px]"
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                  />
                  <Button 
                    className="w-full"
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                  >
                    Submit Request
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Support status */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <h3 className="font-medium">Support Status</h3>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-welli-textSecondary mr-2" />
                    <span>Average Response Time</span>
                  </div>
                  <span>5 minutes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-welli-textSecondary mr-2" />
                    <span>System Status</span>
                  </div>
                  <span className="text-green-600">All Systems Operational</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ChatBotDialog open={aiOpen} onOpenChange={setAiOpen} />
    </div>
  );
};

export default Support;

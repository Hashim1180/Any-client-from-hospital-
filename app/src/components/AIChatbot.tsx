import { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Mic, 
  MicOff,
  Bot,
  User,
  Volume2,
  VolumeX
} from 'lucide-react';
import { gsap } from 'gsap';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

// Speech Recognition types
interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionType {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionType;
    webkitSpeechRecognition?: new () => SpeechRecognitionType;
  }
}

const dentalResponses: Record<string, string> = {
  'hello': 'Hello! Welcome to Gujrat Dental Clinic. How can I assist you with your dental care today?',
  'hi': 'Hi there! I\'m your AI dental assistant. How may I help you?',
  'appointment': 'You can book an appointment through our contact form or call us directly at +92-XXX-XXXXXXX. Would you like me to guide you to the booking section?',
  'book': 'To book an appointment, please fill out the form in the Contact section with your preferred date and time. We\'ll confirm within a few hours!',
  'services': 'We offer a comprehensive range of services including:\n• Dental Implants (i-Linq & Swiss)\n• Laser Fillings\n• Crowns & Bridges\n• Orthodontics (Braces)\n• Teeth Whitening\n• Root Canal Treatment\n• General Checkups',
  'implants': 'Our dental implant services include:\n• i-Linq Dental Implants: PKR 140,000\n• Swiss Dental Implants: PKR 125,000\n\nBoth options provide permanent, natural-looking tooth replacement. Would you like to schedule a consultation?',
  'price': 'Our pricing is transparent and competitive:\n• Checkup: PKR 1,000\n• Laser Fillings: PKR 7,000-8,000\n• Crowns: PKR 8,000\n• Bridges: PKR 12,000\n• Implants: Starting PKR 125,000\n\nContact us for detailed pricing on specific treatments.',
  'cost': 'Our pricing is transparent and competitive:\n• Checkup: PKR 1,000\n• Laser Fillings: PKR 7,000-8,000\n• Crowns: PKR 8,000\n• Bridges: PKR 12,000\n• Implants: Starting PKR 125,000\n\nContact us for detailed pricing on specific treatments.',
  'timing': 'Our clinic is open:\nMonday to Saturday\n9:00 AM – 8:00 PM\n\nWe also offer emergency services. Call us for urgent care.',
  'hours': 'Our clinic is open:\nMonday to Saturday\n9:00 AM – 8:00 PM\n\nWe also offer emergency services. Call us for urgent care.',
  'location': 'We are located at Main Road, Gujrat, Pakistan. You can get directions by clicking the "Get Directions" button on our website.',
  'address': 'We are located at Main Road, Gujrat, Pakistan. You can get directions by clicking the "Get Directions" button on our website.',
  'emergency': 'For dental emergencies, please call us directly at +92-XXX-XXXXXXX. We prioritize urgent cases and will accommodate you as soon as possible.',
  'pain': 'I\'m sorry to hear you\'re in pain. For dental emergencies, please call us immediately at +92-XXX-XXXXXXX. We offer same-day emergency appointments.',
  'whitening': 'Our professional teeth whitening services can brighten your smile by several shades in just one session. Contact us to learn more about our whitening options.',
  'braces': 'We offer various orthodontic solutions including traditional metal braces and ceramic braces. Prices vary based on treatment complexity. Schedule a consultation for a personalized quote.',
  'root canal': 'Our root canal treatments use advanced techniques to ensure a pain-free experience. We use the latest equipment for precise and comfortable treatment.',
  'crown': 'We offer porcelain-fused crowns for PKR 8,000. These provide natural aesthetics and durability. Contact us to learn more about our crown options.',
  'bridge': 'Our porcelain bridges start at PKR 12,000. These restore your smile when teeth are missing. Schedule a consultation to discuss your options.',
  'filling': 'Our laser fillings use nano-hybrid technology for durable, natural-looking results. Prices range from PKR 7,000-8,000 depending on the cavity size.',
  'consultation': 'Initial consultations are PKR 1,000. This includes a comprehensive examination and personalized treatment plan. Book yours today!',
  'checkup': 'Regular dental checkups are essential for maintaining oral health. Our checkups are PKR 1,000 and include cleaning and examination.',
  'technology': 'We use state-of-the-art technology including:\n• 3D CBCT Scanning\n• Digital X-Rays\n• Laser Dentistry\n• Advanced sterilization protocols',
  'doctor': 'Our team consists of experienced dentists with advanced training in various specialties. Meet our team in the "Our Team" section!',
  'team': 'Our team consists of experienced dentists with advanced training in various specialties. Meet our team in the "Our Team" section!',
  'payment': 'We accept various payment methods including cash, bank transfer, and major credit cards. We also offer installment plans for major treatments.',
  'insurance': 'We work with several insurance providers. Please contact us with your insurance details to verify coverage.',
  'covid': 'We follow strict COVID-19 safety protocols including enhanced sterilization, social distancing, and PPE for all staff members.',
  'safety': 'Patient safety is our top priority. We maintain strict sterilization protocols and follow international standards for infection control.',
  'sterilization': 'We use hospital-grade sterilization equipment and follow strict protocols to ensure a safe environment for all patients.',
  'sedation': 'We offer various sedation options for anxious patients including local anesthesia, nitrous oxide, and conscious sedation.',
  'anxiety': 'We understand dental anxiety. Our team is trained to provide gentle care, and we offer sedation options to ensure your comfort.',
  'children': 'We provide pediatric dental services in a child-friendly environment. Our team is experienced in making children feel comfortable.',
  'kids': 'We provide pediatric dental services in a child-friendly environment. Our team is experienced in making children feel comfortable.',
  'pediatric': 'We provide pediatric dental services in a child-friendly environment. Our team is experienced in making children feel comfortable.',
  'default': 'Thank you for your message. I\'m here to help with any questions about our dental services, appointments, or treatments. For specific inquiries, you can also reach us at +92-XXX-XXXXXXX or use the WhatsApp button for quick assistance.'
};

const quickReplies = [
  'Services',
  'Pricing',
  'Book Appointment',
  'Timing',
  'Location',
  'Emergency'
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI dental assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatPanelRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        handleSendMessage(transcript);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && chatPanelRef.current) {
      gsap.fromTo(chatPanelRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const speakText = (text: string) => {
    if (!voiceEnabled) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(dentalResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return dentalResponses.default;
  };

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Speak the response
      speakText(botResponse);
    }, 1000 + Math.random() * 1000);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-clinical-blue to-clinical-green hover:shadow-glow'
        }`}
        style={{
          boxShadow: isOpen ? 'none' : '0 4px 20px rgba(59, 130, 246, 0.4)'
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
        
        {/* Pulse animation when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-clinical-blue animate-ping opacity-30" />
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          ref={chatPanelRef}
          className="fixed bottom-40 right-6 z-50 w-96 max-h-[500px] liquid-glass rounded-2xl flex flex-col overflow-hidden"
          style={{
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-clinical-blue to-clinical-green flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">AI Dental Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-clinical-green animate-pulse" />
                  <span className="text-white/50 text-xs">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {voiceEnabled ? (
                <Volume2 className="w-4 h-4 text-white/60" />
              ) : (
                <VolumeX className="w-4 h-4 text-white/40" />
              )}
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[250px] max-h-[300px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user'
                      ? 'bg-clinical-blue'
                      : 'bg-gradient-to-br from-clinical-blue to-clinical-green'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                    message.sender === 'user'
                      ? 'bg-clinical-blue text-white rounded-br-md'
                      : 'bg-white/10 text-white/90 rounded-bl-md'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-clinical-blue to-clinical-green flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/10 rounded-2xl rounded-bl-md p-3 flex items-center gap-1">
                  <span className="w-2 h-2 bg-white/40 rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-white/40 rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-white/40 rounded-full typing-dot" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 border-t border-white/5">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleQuickReply(reply)}
                  className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/60 border border-white/10 hover:bg-clinical-blue/20 hover:text-white hover:border-clinical-blue/50 transition-all"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleListening}
                className={`p-3 rounded-xl transition-all ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
              
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-clinical-blue transition-colors"
              />
              
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="p-3 rounded-xl bg-clinical-blue text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-clinical-blue/80 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

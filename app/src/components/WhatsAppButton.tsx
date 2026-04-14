import { useState, useEffect } from 'react';
import { MessageCircle, X, Phone, Calendar, Clock, MapPin } from 'lucide-react';
import { gsap } from 'gsap';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // WhatsApp number - you can change this to the actual clinic number
  const whatsappNumber = '+923001234567'; // Replace with actual number
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello!%20I%20would%20like%20to%20book%20an%20appointment%20at%20Gujrat%20Dental%20Clinic.`;

  useEffect(() => {
    // Show tooltip after 5 seconds
    const tooltipTimer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
      }
    }, 5000);

    // Hide tooltip after 8 seconds
    const hideTooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 13000);

    return () => {
      clearTimeout(tooltipTimer);
      clearTimeout(hideTooltipTimer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.whatsapp-panel',
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const handleWhatsAppClick = () => {
    window.open(whatsappLink, '_blank');
    setIsOpen(false);
  };

  const quickActions = [
    {
      icon: <Calendar className="w-4 h-4" />,
      label: 'Book Appointment',
      message: 'Hello! I would like to book an appointment.'
    },
    {
      icon: <Phone className="w-4 h-4" />,
      label: 'Emergency',
      message: 'Hello! I have a dental emergency and need immediate assistance.'
    },
    {
      icon: <Clock className="w-4 h-4" />,
      label: 'Check Timing',
      message: 'Hello! What are your clinic hours?'
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      label: 'Get Location',
      message: 'Hello! Can you share your clinic location?'
    }
  ];

  const handleQuickAction = (message: string) => {
    const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(link, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Main WhatsApp Button */}
      <div className="fixed bottom-24 right-24 z-50">
        {/* Tooltip */}
        {showTooltip && !isOpen && (
          <div className="absolute bottom-full right-0 mb-3 whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
            <div className="liquid-glass-green rounded-xl px-4 py-2 flex items-center gap-2">
              <span className="text-white text-sm">Chat with us on WhatsApp!</span>
              <button 
                onClick={() => setShowTooltip(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-emerald-500/20" />
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-lg'
          }`}
          style={{
            boxShadow: isOpen ? 'none' : '0 4px 20px rgba(16, 185, 129, 0.4)'
          }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
          
          {/* Pulse animation */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30" />
          )}
        </button>
      </div>

      {/* WhatsApp Panel */}
      {isOpen && (
        <div className="whatsapp-panel fixed bottom-40 right-24 z-50 w-80 liquid-glass-green rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">WhatsApp Appointment</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-white/80 text-xs">Typically replies in minutes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-white/70 text-sm mb-4">
              Connect with us directly on WhatsApp for quick appointments and inquiries.
            </p>

            {/* Quick Actions */}
            <div className="space-y-2 mb-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.message)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left"
                >
                  <span className="text-emerald-400">{action.icon}</span>
                  <span className="text-white text-sm">{action.label}</span>
                </button>
              ))}
            </div>

            {/* Main CTA */}
            <button
              onClick={handleWhatsAppClick}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Start Chat
            </button>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-white/5 border-t border-white/10">
            <p className="text-white/40 text-xs text-center">
              Powered by Gujrat Dental Clinic AI
            </p>
          </div>
        </div>
      )}

      {/* Emergency Floating Button */}
      <a
        href={`tel:${whatsappNumber}`}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all hover:shadow-lg"
        style={{ boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)' }}
        title="Emergency Call"
      >
        <Phone className="w-5 h-5 text-white" />
      </a>
    </>
  );
}

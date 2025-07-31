import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  Phone, 
  Mail, 
  Clock,
  Headphones,
  User,
  Bot
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CustomerSupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'contact'>('chat');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hi! I\'m here to help you with any questions about your bookings, payments, or our services. How can I assist you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user' as const,
      message: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot' as const,
        message: generateBotResponse(message.trim()),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const generateBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('booking') || lowerMessage.includes('reservation')) {
      return 'I can help you with booking-related questions! You can view and manage your bookings from your profile page. If you need to cancel or modify a booking, please check our cancellation policy or contact our support team.';
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('refund')) {
      return 'For payment and refund inquiries, please note that refunds are processed within 5-10 business days. If you\'re experiencing payment issues, please ensure your payment method is valid and has sufficient funds.';
    } else if (lowerMessage.includes('hotel') || lowerMessage.includes('room')) {
      return 'I can help you find the perfect accommodation! Use our search filters to find hotels by location, price, amenities, and more. Each hotel listing includes detailed information, photos, and guest reviews.';
    } else if (lowerMessage.includes('flight')) {
      return 'Our flight booking service helps you find the best deals! You can search by destination, dates, and preferences. We partner with major airlines to offer competitive prices and flexible booking options.';
    } else {
      return 'Thank you for your message! For complex inquiries, I recommend contacting our support team directly at support@airbnbclone.com or +91-7489898361. Our team is available 24/7 to assist you.';
    }
  };

  const handleContactSubmit = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to submit your inquiry.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent Successfully",
      description: "Our support team will get back to you within 24 hours.",
    });

    setContactForm({ name: '', email: '', subject: '', message: '' });
    setIsOpen(false);
  };

  const quickActions = [
    { label: 'My Bookings', action: () => window.location.href = '/profile' },
    { label: 'Cancellation Policy', action: () => window.location.href = '/cancellation-policy' },
    { label: 'Payment Help', action: () => setMessage('I need help with payment issues') },
    { label: 'Find Hotels', action: () => window.location.href = '/search' }
  ];

  return (
    <>
      {/* Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-28 md:right-32 sm:right-20 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white animate-pulse">
          24/7
        </Badge>
      </motion.div>

      {/* Support Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-28 md:right-32 sm:right-20 z-50 w-96 max-w-[calc(100vw-2rem)]"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="glass-effect border-white/30 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Headphones className="h-5 w-5" />
                    <div>
                      <CardTitle className="text-lg">Customer Support</CardTitle>
                      <CardDescription className="text-blue-100">
                        We're here to help 24/7
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                {/* Tabs */}
                <div className="flex border-b">
                  <button
                    onClick={() => setActiveTab('chat')}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                      activeTab === 'chat'
                        ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <MessageCircle className="h-4 w-4 inline mr-2" />
                    Live Chat
                  </button>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                      activeTab === 'contact'
                        ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <Mail className="h-4 w-4 inline mr-2" />
                    Contact Us
                  </button>
                </div>

                {activeTab === 'chat' ? (
                  <div className="h-96 flex flex-col">
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      {chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              msg.type === 'user'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <div className="flex items-center space-x-2 mb-1">
                              {msg.type === 'bot' ? (
                                <Bot className="h-4 w-4" />
                              ) : (
                                <User className="h-4 w-4" />
                              )}
                              <span className="text-xs opacity-70">{msg.time}</span>
                            </div>
                            <p className="text-sm">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="p-3 border-t bg-gray-50">
                      <p className="text-xs text-gray-600 mb-2">Quick Actions:</p>
                      <div className="flex flex-wrap gap-2">
                        {quickActions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={action.action}
                            className="text-xs"
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Type your message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="flex-1"
                        />
                        <Button onClick={handleSendMessage} size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {/* Contact Info */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Phone className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">Call Us</p>
                        <p className="text-xs text-gray-600">+91-7489898361</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">Available</p>
                        <p className="text-xs text-gray-600">24/7 Support</p>
                      </div>
                    </div>

                    {/* Contact Form */}
                    <div className="space-y-3">
                      <Input
                        placeholder="Your Name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      />
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      />
                      <Input
                        placeholder="Subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      />
                      <Textarea
                        placeholder="Describe your issue..."
                        rows={3}
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      />
                      <Button
                        onClick={handleContactSubmit}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                      >
                        Send Message
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomerSupportWidget;

import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, Clock, MapPin, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CustomerService = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: '24/7 Phone Support',
      description: 'Speak directly with our customer service representatives',
      contact: '+1 (555) 123-4567',
      availability: 'Available 24/7',
      color: 'bg-blue-500'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us detailed inquiries and get comprehensive responses',
      contact: 'support@airbnbclone.com',
      availability: 'Response within 2-4 hours',
      color: 'bg-green-500'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help through our chat support system',
      contact: 'Available on website',
      availability: 'Mon-Sun, 6 AM - 2 AM',
      color: 'bg-purple-500'
    }
  ];

  const supportTopics = [
    {
      category: 'Booking Issues',
      topics: ['Booking confirmation problems', 'Payment failures', 'Booking modifications', 'Cancellation requests']
    },
    {
      category: 'Account Support',
      topics: ['Login issues', 'Profile updates', 'Password reset', 'Account verification']
    },
    {
      category: 'Travel Assistance',
      topics: ['Hotel information', 'Flight details', 'Check-in procedures', 'Special requests']
    },
    {
      category: 'Technical Help',
      topics: ['Website navigation', 'Mobile app issues', 'Browser compatibility', 'Feature explanations']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-25 to-blue-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative py-20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center text-white max-w-4xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Customer Service
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl leading-relaxed"
              >
                We're here to help you 24/7 with all your travel booking needs
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the method that works best for you. Our dedicated support team is ready to assist.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                      <CardContent className="p-8 text-center">
                        <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{method.title}</h3>
                        <p className="text-gray-600 mb-4">{method.description}</p>
                        <div className="space-y-2">
                          <p className="font-semibold text-gray-900">{method.contact}</p>
                          <p className="text-sm text-gray-500">{method.availability}</p>
                        </div>
                        <Button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                          Contact Now
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Support Topics */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                How We Can Help
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our support team is trained to handle a wide range of issues and inquiries
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {supportTopics.map((topic, index) => (
                <motion.div
                  key={topic.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">{topic.category}</h3>
                      <ul className="space-y-2">
                        {topic.topics.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm text-gray-600 flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Hours */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Service Hours & Locations
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Customer Support Hours</h3>
                      <p className="text-gray-600">Phone: 24/7 availability</p>
                      <p className="text-gray-600">Live Chat: 6 AM - 2 AM daily</p>
                      <p className="text-gray-600">Email: Response within 2-4 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Support Centers</h3>
                      <p className="text-gray-600">Primary: NIT Jamshedpur, Jharkhand</p>
                      <p className="text-gray-600">Virtual support available globally</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Users className="h-6 w-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Multilingual Support</h3>
                      <p className="text-gray-600">English, Hindi, and regional languages</p>
                      <p className="text-gray-600">Specialized travel assistance</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white"
              >
                <h3 className="text-2xl font-bold mb-6">Emergency Support</h3>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Travel Emergencies</h4>
                    <p className="text-sm">24/7 emergency hotline for urgent travel issues</p>
                    <p className="font-mono text-lg mt-2">+1 (555) 911-HELP</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Booking Issues</h4>
                    <p className="text-sm">Immediate assistance for booking problems</p>
                    <p className="font-mono text-lg mt-2">support@airbnbclone.com</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Technical Support</h4>
                    <p className="text-sm">Website and app technical assistance</p>
                    <p className="font-mono text-lg mt-2">Live Chat Available</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CustomerService;

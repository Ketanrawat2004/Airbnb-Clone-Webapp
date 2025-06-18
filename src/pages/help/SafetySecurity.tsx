
import { motion } from 'framer-motion';
import { Shield, Lock, Eye,  UserCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const SafetySecurity = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'Data Encryption',
      description: 'All personal and payment data is encrypted using industry-standard SSL/TLS protocols',
      color: 'bg-green-500'
    },
    {
      icon: Lock,
      title: 'Secure Payments',
      description: 'PCI DSS compliant payment processing with multiple secure payment options',
      color: 'bg-blue-500'
    },
    {
      icon: UserCheck,
      title: 'Identity Verification',
      description: 'Multi-step verification process for both users and accommodation providers',
      color: 'bg-purple-500'
    },
    {
      icon: Eye,
      title: 'Privacy Protection',
      description: 'Strict privacy controls and transparent data usage policies',
      color: 'bg-orange-500'
    }
  ];

  const safetyTips = [
    {
      category: 'Before Booking',
      tips: [
        'Verify property photos and reviews',
        'Check host ratings and response times',
        'Read cancellation policies carefully',
        'Use secure payment methods only'
      ]
    },
    {
      category: 'During Travel',
      tips: [
        'Keep booking confirmations handy',
        'Share travel details with trusted contacts',
        'Report any safety concerns immediately',
        'Follow local safety guidelines'
      ]
    },
    {
      category: 'Payment Security',
      tips: [
        'Never pay outside the platform',
        'Monitor payment confirmations',
        'Report suspicious payment requests',
        'Keep payment receipts secure'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-green-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative py-20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center text-white max-w-4xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Safety & Security
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl leading-relaxed"
              >
                Your safety and security are our top priorities in every booking
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Security Features */}
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
                Our Security Measures
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We implement comprehensive security measures to protect your data and ensure safe transactions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Safety Guidelines */}
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
                Safety Guidelines
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Follow these guidelines to ensure a safe and secure booking experience
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {safetyTips.map((section, index) => (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">{section.category}</h3>
                      <ul className="space-y-3">
                        {section.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{tip}</span>
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

        {/* Trust & Safety Commitment */}
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
                  Our Commitment to Trust & Safety
                </h2>
                <div className="space-y-6 text-gray-700">
                  <p className="text-lg">
                    At Airbnb Clone+, we believe that everyone deserves to feel safe and secure 
                    when booking accommodations and flights. Our comprehensive safety program 
                    includes advanced technology, dedicated support teams, and community guidelines.
                  </p>
                  <p>
                    We continuously invest in safety measures, working with security experts 
                    and law enforcement to ensure our platform remains safe for all users. 
                    Our 24/7 safety team is always ready to respond to any concerns.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-6 w-6 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-green-800 mb-2">Safety Hotline</h4>
                        <p className="text-green-700">
                          If you ever feel unsafe or encounter any security issues, 
                          contact our 24/7 safety hotline immediately: <strong>+1 (555) SAFE-911</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl p-8 text-white"
              >
                <h3 className="text-2xl font-bold mb-6">Security Certifications</h3>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                    <h4 className="font-semibold mb-2">ISO 27001 Certified</h4>
                    <p className="text-sm">International standard for information security management</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                    <h4 className="font-semibold mb-2">PCI DSS Compliant</h4>
                    <p className="text-sm">Payment card industry data security standards certified</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                    <h4 className="font-semibold mb-2">GDPR Compliant</h4>
                    <p className="text-sm">Full compliance with European data protection regulations</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
                    <h4 className="font-semibold mb-2">SOC 2 Audited</h4>
                    <p className="text-sm">Regular security audits and compliance verification</p>
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

export default SafetySecurity;

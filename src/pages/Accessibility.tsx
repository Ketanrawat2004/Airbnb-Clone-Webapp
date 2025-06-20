
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Eye, Keyboard, MousePointer, Volume2, Settings, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Accessibility = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-25 to-blue-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative py-16 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center text-white max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex items-center justify-center mb-4"
              >
                <Heart className="h-12 w-12 mr-4" />
                <h1 className="text-3xl md:text-5xl font-bold">Accessibility</h1>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl"
              >
                Making travel accessible for everyone
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Our Commitment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="h-6 w-6 text-rose-600" />
                      <span>Our Commitment to Accessibility</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 text-lg">
                      At Airbnb Clone+, we believe that travel should be accessible to everyone, regardless 
                      of their abilities. We are committed to creating an inclusive digital experience that 
                      enables all users to search, discover, and book accommodations with ease.
                    </p>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Our Goals:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Provide equal access to information and functionality</li>
                        <li>• Support assistive technologies and screen readers</li>
                        <li>• Maintain clear navigation and intuitive design</li>
                        <li>• Continuously improve accessibility features</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Accessibility Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-6 w-6 text-green-600" />
                      <span>Accessibility Features</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      
                      {/* Visual Accessibility */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <Eye className="h-6 w-6 text-blue-600" />
                          <h4 className="font-medium text-lg">Visual Accessibility</h4>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <ul className="text-sm text-blue-700 space-y-2">
                            <li>• High contrast color schemes</li>
                            <li>• Large, readable fonts and clear typography</li>
                            <li>• Alternative text for all images</li>
                            <li>• Scalable text up to 200% without loss of functionality</li>
                            <li>• Clear visual focus indicators</li>
                            <li>• Color is not the only means of conveying information</li>
                          </ul>
                        </div>
                      </div>

                      {/* Motor Accessibility */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <MousePointer className="h-6 w-6 text-green-600" />
                          <h4 className="font-medium text-lg">Motor Accessibility</h4>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <ul className="text-sm text-green-700 space-y-2">
                            <li>• Large clickable areas for easier targeting</li>
                            <li>• Adequate spacing between interactive elements</li>
                            <li>• No time limits on user interactions</li>
                            <li>• Support for various input methods</li>
                            <li>• Drag and drop alternatives</li>
                            <li>• Mouse and touch-friendly interfaces</li>
                          </ul>
                        </div>
                      </div>

                      {/* Keyboard Navigation */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <Keyboard className="h-6 w-6 text-purple-600" />
                          <h4 className="font-medium text-lg">Keyboard Navigation</h4>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <ul className="text-sm text-purple-700 space-y-2">
                            <li>• Full keyboard navigation support</li>
                            <li>• Logical tab order throughout the site</li>
                            <li>• Skip navigation links</li>
                            <li>• Keyboard shortcuts for common actions</li>
                            <li>• No keyboard traps</li>
                            <li>• Clear focus management</li>
                          </ul>
                        </div>
                      </div>

                      {/* Screen Reader Support */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <Volume2 className="h-6 w-6 text-orange-600" />
                          <h4 className="font-medium text-lg">Screen Reader Support</h4>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <ul className="text-sm text-orange-700 space-y-2">
                            <li>• Semantic HTML structure</li>
                            <li>• Proper heading hierarchy</li>
                            <li>• Descriptive link text</li>
                            <li>• Form labels and instructions</li>
                            <li>• Live region announcements</li>
                            <li>• Compatible with JAWS, NVDA, and VoiceOver</li>
                          </ul>
                        </div>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Standards Compliance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Standards & Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">
                      Our website is designed to meet or exceed accessibility standards and guidelines:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">WCAG 2.1 Guidelines</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          We strive to meet WCAG 2.1 Level AA standards
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Perceivable content and UI</li>
                          <li>• Operable interface components</li>
                          <li>• Understandable information</li>
                          <li>• Robust content interpretation</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Additional Standards</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          We also follow these accessibility standards
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Section 508 compliance (US)</li>
                          <li>• EN 301 549 (European standard)</li>
                          <li>• ADA compliance guidelines</li>
                          <li>• AODA compliance (Ontario)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Assistive Technologies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Supported Assistive Technologies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">
                      Our website is compatible with a wide range of assistive technologies:
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <h4 className="font-medium text-blue-800 mb-2">Screen Readers</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• JAWS</li>
                          <li>• NVDA</li>
                          <li>• VoiceOver</li>
                          <li>• TalkBack</li>
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <h4 className="font-medium text-green-800 mb-2">Voice Control</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Dragon NaturallySpeaking</li>
                          <li>• Voice Control (iOS/macOS)</li>
                          <li>• Voice Access (Android)</li>
                          <li>• Windows Speech Recognition</li>
                        </ul>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <h4 className="font-medium text-purple-800 mb-2">Navigation Tools</h4>
                        <ul className="text-sm text-purple-700 space-y-1">
                          <li>• Switch controls</li>
                          <li>• Eye tracking devices</li>
                          <li>• Head mouse</li>
                          <li>• Joystick navigation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Browser Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Browser Accessibility Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">
                      Most modern browsers include accessibility features that can enhance your experience:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Text and Display</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Zoom: Ctrl + '+' or Cmd + '+' to increase text size</li>
                          <li>• High contrast mode in browser settings</li>
                          <li>• Custom CSS for personalized styling</li>
                          <li>• Font size adjustments</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Navigation</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Tab navigation: Use Tab key to move between elements</li>
                          <li>• Enter: Activate buttons and links</li>
                          <li>• Space: Scroll down or activate buttons</li>
                          <li>• Arrow keys: Navigate within components</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Feedback & Support */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Accessibility Feedback & Support</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">
                      We welcome your feedback on the accessibility of our website. If you encounter 
                      any barriers or have suggestions for improvement, please let us know.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Contact Methods</h4>
                        <div className="space-y-2 text-sm text-blue-700">
                          <p><strong>Email:</strong> accessibility@airbnbclone.com</p>
                          <p><strong>Phone:</strong> +91 1800-XXX-XXXX</p>
                          <p><strong>TTY:</strong> +91 1800-YYY-YYYY</p>
                          <p><strong>Response time:</strong> 2-3 business days</p>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">What to Include</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Description of the issue</li>
                          <li>• Page URL where problem occurred</li>
                          <li>• Browser and assistive technology used</li>
                          <li>• Operating system information</li>
                          <li>• Your contact information</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-yellow-800 font-medium mb-2">Alternative Access Methods:</p>
                      <p className="text-sm text-yellow-700">
                        If you're unable to access certain content or features, our customer support 
                        team can assist you via phone or email with booking, account management, 
                        and other services.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Ongoing Improvements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Ongoing Improvements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      Accessibility is an ongoing effort. We continuously work to improve our website 
                      and are committed to providing an inclusive experience for all users.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <p className="text-sm text-gray-600">
                          Regular accessibility audits and testing with real users
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <p className="text-sm text-gray-600">
                          Staff training on accessibility best practices
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <p className="text-sm text-gray-600">
                          Integration of accessibility into our development process
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <p className="text-sm text-gray-600">
                          Collaboration with disability organizations and experts
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-600">
                        Last updated: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Accessibility;

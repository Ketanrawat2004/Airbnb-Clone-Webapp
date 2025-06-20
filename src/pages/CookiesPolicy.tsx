
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Cookie, Settings, Shield, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CookiesPolicy = () => {
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
                <Cookie className="h-12 w-12 mr-4" />
                <h1 className="text-3xl md:text-5xl font-bold">Cookies Policy</h1>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl"
              >
                How we use cookies to enhance your browsing experience
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* What are Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Info className="h-6 w-6 text-blue-600" />
                      <span>What are Cookies?</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">
                      Cookies are small text files that are stored on your computer or mobile device when 
                      you visit a website. They help us provide you with a better experience by remembering 
                      your preferences and improving our services.
                    </p>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">How Cookies Work:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Stored locally on your device by your web browser</li>
                        <li>• Contain information about your visit to our website</li>
                        <li>• Help us recognize you when you return</li>
                        <li>• Enable personalized content and features</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Types of Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-6 w-6 text-green-600" />
                      <span>Types of Cookies We Use</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      
                      {/* Essential Cookies */}
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-2">Essential Cookies</h4>
                        <p className="text-sm text-red-700 mb-2">
                          Required for the website to function properly
                        </p>
                        <ul className="text-xs text-red-600 space-y-1">
                          <li>• Login authentication</li>
                          <li>• Shopping cart functionality</li>
                          <li>• Security features</li>
                          <li>• Form submission</li>
                        </ul>
                      </div>

                      {/* Performance Cookies */}
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-medium text-yellow-800 mb-2">Performance Cookies</h4>
                        <p className="text-sm text-yellow-700 mb-2">
                          Help us understand how visitors use our website
                        </p>
                        <ul className="text-xs text-yellow-600 space-y-1">
                          <li>• Page loading times</li>
                          <li>• Popular content areas</li>
                          <li>• Error reporting</li>
                          <li>• Usage analytics</li>
                        </ul>
                      </div>

                      {/* Functional Cookies */}
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Functional Cookies</h4>
                        <p className="text-sm text-blue-700 mb-2">
                          Remember your preferences and choices
                        </p>
                        <ul className="text-xs text-blue-600 space-y-1">
                          <li>• Language preferences</li>
                          <li>• Theme settings</li>
                          <li>• Search filters</li>
                          <li>• Location settings</li>
                        </ul>
                      </div>

                      {/* Targeting Cookies */}
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-medium text-purple-800 mb-2">Targeting Cookies</h4>
                        <p className="text-sm text-purple-700 mb-2">
                          Used to deliver relevant advertisements
                        </p>
                        <ul className="text-xs text-purple-600 space-y-1">
                          <li>• Personalized ads</li>
                          <li>• Social media integration</li>
                          <li>• Third-party advertising</li>
                          <li>• Marketing campaigns</li>
                        </ul>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Third-Party Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Third-Party Cookies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">
                      We may also use third-party cookies from trusted partners to enhance your experience:
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Google Analytics</h4>
                        <p className="text-sm text-gray-600">
                          Helps us understand website usage and improve performance
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Social Media</h4>
                        <p className="text-sm text-gray-600">
                          Enable sharing and social media integration features
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Payment Providers</h4>
                        <p className="text-sm text-gray-600">
                          Secure payment processing and fraud prevention
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Managing Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-6 w-6 text-green-600" />
                      <span>Managing Your Cookie Preferences</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">
                      You have full control over cookies and can manage them in several ways:
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">Browser Settings</h4>
                        <p className="text-sm text-green-700 mb-2">
                          Most browsers allow you to control cookies through their settings:
                        </p>
                        <ul className="text-xs text-green-600 space-y-1">
                          <li>• Block all cookies</li>
                          <li>• Block third-party cookies only</li>
                          <li>• Delete existing cookies</li>
                          <li>• Get notified when cookies are set</li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Our Cookie Banner</h4>
                        <p className="text-sm text-blue-700">
                          When you first visit our site, you'll see a cookie consent banner where you can:
                        </p>
                        <ul className="text-xs text-blue-600 space-y-1 mt-2">
                          <li>• Accept all cookies</li>
                          <li>• Customize your preferences</li>
                          <li>• Learn more about each cookie type</li>
                          <li>• Change settings anytime</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Impact of Disabling Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Impact of Disabling Cookies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <p className="text-yellow-800 font-medium mb-2">Important Notice:</p>
                      <p className="text-sm text-yellow-700">
                        Disabling certain cookies may impact your experience on our website.
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Essential Cookies Disabled:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Unable to log in or maintain session</li>
                          <li>• Shopping cart won't work</li>
                          <li>• Security features compromised</li>
                          <li>• Forms may not submit properly</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Other Cookies Disabled:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Preferences not remembered</li>
                          <li>• Less personalized experience</li>
                          <li>• Analytics data not collected</li>
                          <li>• Ads may be less relevant</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Questions About Cookies?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      If you have any questions about our use of cookies, please contact us:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Contact Information</h4>
                        <div className="space-y-1 text-sm">
                          <p><strong>Email:</strong> privacy@airbnbclone.com</p>
                          <p><strong>Phone:</strong> +91 1800-XXX-XXXX</p>
                          <p><strong>Address:</strong> Demo Address, Demo City, India</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Additional Resources</h4>
                        <div className="space-y-1 text-sm text-blue-600">
                          <p>• About Cookies (allaboutcookies.org)</p>
                          <p>• Your Online Choices (youronlinechoices.eu)</p>
                          <p>• Network Advertising Initiative (networkadvertising.org)</p>
                        </div>
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

export default CookiesPolicy;

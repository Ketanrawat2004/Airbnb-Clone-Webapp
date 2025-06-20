
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, Shield, Users, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService = () => {
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
                <FileText className="h-12 w-12 mr-4" />
                <h1 className="text-3xl md:text-5xl font-bold">Terms of Service</h1>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl"
              >
                Please read these terms carefully before using our services
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Demo Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-orange-800">
                      <AlertTriangle className="h-6 w-6" />
                      <span>Important: Demo Website Notice</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-orange-700">
                    <p>
                      This is a demonstration website created for showcase purposes only. All bookings, payments, 
                      and services are simulated. No real transactions, travel arrangements, or financial 
                      obligations are created through this platform.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Acceptance of Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-6 w-6 text-blue-600" />
                      <span>1. Acceptance of Terms</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">
                      By accessing and using this website, you accept and agree to be bound by the terms 
                      and provision of this agreement. If you do not agree to abide by the above, please 
                      do not use this service.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Key Points:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Terms are effective immediately upon access</li>
                        <li>• Continued use implies acceptance of any updates</li>
                        <li>• Users must be 18+ or have parental consent</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Use License */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-6 w-6 text-green-600" />
                      <span>2. Use License</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">
                      Permission is granted to temporarily download one copy of the materials on Airbnb Clone+ 
                      for personal, non-commercial transitory viewing only.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">You May:</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Browse and search for accommodations</li>
                          <li>• Create an account for personal use</li>
                          <li>• Make demo bookings for testing</li>
                          <li>• Contact customer support</li>
                        </ul>
                      </div>
                      
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-2">You May Not:</h4>
                        <ul className="text-sm text-red-700 space-y-1">
                          <li>• Modify or copy the materials</li>
                          <li>• Use materials for commercial purpose</li>
                          <li>• Attempt to reverse engineer software</li>
                          <li>• Remove copyright or proprietary notations</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* User Accounts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>3. User Accounts and Responsibilities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Account Security</h4>
                        <p className="text-sm text-gray-600">
                          You are responsible for maintaining the confidentiality of your account 
                          credentials and for all activities that occur under your account.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Accurate Information</h4>
                        <p className="text-sm text-gray-600">
                          You agree to provide accurate, current, and complete information during 
                          the registration process and to update such information as necessary.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Prohibited Activities</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Violating any applicable laws or regulations</li>
                          <li>• Interfering with the security of the website</li>
                          <li>• Using automated systems to access the website</li>
                          <li>• Attempting to gain unauthorized access</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Booking Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>4. Booking Terms (Demo Only)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <p className="text-yellow-800 font-medium mb-2">Demo Booking Notice:</p>
                      <p className="text-sm text-yellow-700">
                        All bookings made on this platform are for demonstration purposes only. 
                        No real reservations are created, and no actual services will be provided.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">If this were a real booking platform:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• All bookings would be subject to availability</li>
                        <li>• Prices would be subject to change until payment confirmation</li>
                        <li>• Cancellation policies would vary by property</li>
                        <li>• Additional fees might apply for certain services</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Limitation of Liability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>5. Limitation of Liability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      In no event shall Airbnb Clone+ or its suppliers be liable for any damages 
                      (including, without limitation, damages for loss of data or profit, or due to 
                      business interruption) arising out of the use or inability to use the materials 
                      on this website.
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Important:</strong> Since this is a demo website, no actual liability 
                        can arise from its use. This clause is included for demonstration of typical 
                        terms of service structure.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>6. Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      If you have any questions about these Terms of Service, please contact us:
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <p><strong>Email:</strong> legal@airbnbclone.com</p>
                      <p><strong>Phone:</strong> +91 1800-XXX-XXXX</p>
                      <p><strong>Address:</strong> Demo Address, Demo City, Demo State, India</p>
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

export default TermsOfService;

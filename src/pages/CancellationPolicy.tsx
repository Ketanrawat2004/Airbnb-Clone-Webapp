
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CancellationPolicy = () => {
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
                <Shield className="h-12 w-12 mr-4" />
                <h1 className="text-3xl md:text-5xl font-bold">Cancellation Policy</h1>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl"
              >
                Flexible cancellation options for your peace of mind
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Flight Cancellation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertCircle className="h-6 w-6 text-blue-600" />
                      <span>Flight Cancellation Policy</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <h3 className="font-semibold text-green-800">Free Cancellation</h3>
                        </div>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Within 24 hours of booking (if booked 7+ days before departure)</li>
                          <li>• Refundable tickets: Full refund</li>
                          <li>• Non-refundable tickets: Taxes refunded</li>
                        </ul>
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-3">
                          <Clock className="h-5 w-5 text-yellow-600" />
                          <h3 className="font-semibold text-yellow-800">Paid Cancellation</h3>
                        </div>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• More than 24 hours: Cancellation fees apply</li>
                          <li>• Domestic flights: ₹3,000 per passenger</li>
                          <li>• International flights: ₹6,000 per passenger</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">Important Notes:</h3>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Airline cancellation fees may apply separately</li>
                        <li>• Refund processing time: 7-10 business days</li>
                        <li>• Group bookings have different cancellation terms</li>
                        <li>• Peak season bookings may have stricter policies</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Hotel Cancellation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertCircle className="h-6 w-6 text-rose-600" />
                      <span>Hotel Cancellation Policy</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600 mb-2">Free</div>
                        <div className="text-sm text-green-700">
                          <div className="font-medium mb-1">48+ hours before</div>
                          <div>Full refund</div>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-yellow-600 mb-2">50%</div>
                        <div className="text-sm text-yellow-700">
                          <div className="font-medium mb-1">24-48 hours before</div>
                          <div>Partial refund</div>
                        </div>
                      </div>
                      
                      <div className="bg-red-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-red-600 mb-2">No Refund</div>
                        <div className="text-sm text-red-700">
                          <div className="font-medium mb-1">Less than 24 hours</div>
                          <div>No refund</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-rose-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-rose-800 mb-2">Hotel-Specific Policies:</h3>
                      <ul className="text-sm text-rose-700 space-y-1">
                        <li>• Luxury hotels may have stricter cancellation terms</li>
                        <li>• Special event periods have non-refundable policies</li>
                        <li>• Some hotels offer flexible booking options</li>
                        <li>• Resort bookings may require 7-day notice</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Refund Process */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <span>Refund Process</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">1</div>
                        <div>
                          <h3 className="font-medium">Cancel Your Booking</h3>
                          <p className="text-sm text-gray-600">Log in to your account and cancel through "My Bookings"</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">2</div>
                        <div>
                          <h3 className="font-medium">Refund Calculation</h3>
                          <p className="text-sm text-gray-600">Refund amount calculated based on cancellation policy</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">3</div>
                        <div>
                          <h3 className="font-medium">Processing</h3>
                          <p className="text-sm text-gray-600">Refund processed to original payment method within 7-10 business days</p>
                        </div>
                      </div>
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
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">Customer Support</h3>
                        <p className="text-sm text-gray-600 mb-2">Available 24/7 for cancellation assistance</p>
                        <p className="text-sm"><strong>Phone:</strong> +91 1800-XXX-XXXX</p>
                        <p className="text-sm"><strong>Email:</strong> support@airbnbclone.com</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Important Reminder</h3>
                        <p className="text-sm text-gray-600">
                          This is a demonstration website. All bookings and cancellations are for testing purposes only. 
                          No real payments or refunds will be processed.
                        </p>
                      </div>
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

export default CancellationPolicy;

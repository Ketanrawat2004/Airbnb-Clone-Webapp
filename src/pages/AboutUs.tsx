
import { motion } from 'framer-motion';
import { Code, Database, Globe, Lightbulb, Users, Zap, Github, Heart, Cpu, Cloud } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const AboutUs = () => {
  const technologies = [
    { name: 'React 18', description: 'Modern UI library with hooks and concurrent features', icon: '⚛️' },
    { name: 'TypeScript', description: 'Type-safe JavaScript for better development experience', icon: '📘' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid styling', icon: '🎨' },
    { name: 'Supabase', description: 'Backend-as-a-Service with PostgreSQL database', icon: '🗄️' },
    { name: 'Vite', description: 'Lightning-fast build tool and development server', icon: '⚡' },
    { name: 'Framer Motion', description: 'Smooth animations and transitions', icon: '🎭' }
  ];

  const features = [
    { title: 'Hotel Booking', description: 'Browse and book from thousands of hotels worldwide', icon: Globe },
    { title: 'Flight Search', description: 'Find and compare flights from major airlines', icon: Zap },
    { title: 'Secure Payments', description: 'Multiple payment options with bank-level security', icon: Database },
    { title: 'Real-time Updates', description: 'Live availability and pricing information', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-25 to-pink-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative py-20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center text-white max-w-4xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                About Airbnb Clone+
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl leading-relaxed"
              >
                Revolutionizing travel booking with cutting-edge technology and seamless user experience
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Story Section */}
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
                  Our Story & Vision
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    Airbnb Clone+ was born from a simple yet powerful idea: to create the most intuitive 
                    and comprehensive travel booking platform that combines the best of modern web technologies 
                    with real-world travel needs.
                  </p>
                  <p>
                    Developed by <strong>Ketan Rawat</strong>, a passionate B.Tech ECE student at NIT Jamshedpur, 
                    this project represents months of dedicated development, learning, and innovation in the 
                    field of full-stack web development.
                  </p>
                  <p>
                    The inspiration came from observing the fragmented nature of travel booking experiences 
                    and the desire to create a unified platform that seamlessly integrates hotel and flight 
                    bookings with modern UI/UX principles.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-3xl shadow-2xl">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-rose-500">
                      <img 
                        src="/lovable-uploads/2b5371a2-33f0-4ff1-90ac-f53e40ab5e75.png" 
                        alt="Ketan Rawat - Developer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Ketan Rawat</h3>
                      <p className="text-gray-600">Full-Stack Developer</p>
                      <p className="text-sm text-rose-600">B.Tech ECE, NIT Jamshedpur</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <Code className="h-8 w-8 text-rose-500 mx-auto mb-2" />
                      <p className="font-semibold">Full-Stack</p>
                      <p className="text-sm text-gray-600">Development</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <Heart className="h-8 w-8 text-rose-500 mx-auto mb-2" />
                      <p className="font-semibold">Passionate</p>
                      <p className="text-sm text-gray-600">Learner</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
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
                Technology Stack
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built with modern, industry-standard technologies for optimal performance, 
                scalability, and user experience
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-4">{tech.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{tech.name}</h3>
                      <p className="text-gray-600">{tech.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
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
                Key Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive travel booking solution with advanced features and seamless integration
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Development Process */}
        <section className="py-20 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center text-white mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Development Journey
              </h2>
              <p className="text-xl max-w-3xl mx-auto">
                From concept to deployment - the story of how Airbnb Clone+ came to life
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  phase: "Planning & Design",
                  description: "Research, wireframing, and UI/UX design using modern design principles",
                  icon: Lightbulb
                },
                {
                  phase: "Development",
                  description: "Full-stack development with React, TypeScript, and Supabase integration",
                  icon: Code
                },
                {
                  phase: "Testing & Deployment",
                  description: "Comprehensive testing, optimization, and cloud deployment",
                  icon: Cloud
                }
              ].map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center"
                  >
                    <Icon className="h-12 w-12 text-white mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-4">{phase.phase}</h3>
                    <p className="text-white/90">{phase.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Architecture Section */}
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
                System Architecture
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Modern, scalable architecture designed for performance and maintainability
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Frontend Layer</h3>
                      <p className="text-gray-600">React 18 with TypeScript, Tailwind CSS for responsive design, and Framer Motion for animations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Database className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Backend Services</h3>
                      <p className="text-gray-600">Supabase with PostgreSQL database, real-time subscriptions, and edge functions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Cpu className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Build & Deploy</h3>
                      <p className="text-gray-600">Vite for fast development and optimized production builds with modern deployment</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Database Schema</h3>
                <div className="space-y-4">
                  {['Hotels', 'Bookings', 'Users', 'Reviews', 'Payments'].map((table, index) => (
                    <motion.div
                      key={table}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-lg p-4 shadow-md"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                        <span className="font-semibold text-gray-900">{table} Table</span>
                      </div>
                    </motion.div>
                  ))}
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

export default AboutUs;

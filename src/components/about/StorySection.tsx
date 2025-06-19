
import { motion } from 'framer-motion';
import { Code, Heart } from 'lucide-react';

const StorySection = () => {
  return (
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
  );
};

export default StorySection;

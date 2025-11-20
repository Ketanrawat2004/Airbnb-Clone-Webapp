
import { motion } from 'framer-motion';
import founderPhoto from '@/assets/founder-photo.jpg';

const StorySection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Airbnb Clone+ was born from a passion to create the ultimate travel booking experience with 
                enterprise-grade security and modern technology. Our journey began with a simple vision: to make 
                travel planning effortless, secure, and enjoyable for everyone.
              </p>
              <p>
                Built with cutting-edge technology including React, TypeScript, Supabase, and implementing 
                advanced security features like role-based access control and Row-Level Security, our platform 
                combines the best of hotel and flight booking in one seamless, protected experience.
              </p>
              <p>
                From luxurious resorts to budget-friendly accommodations, from direct flights to 
                complex multi-city journeys, we've got you covered with secure payment processing and 
                authenticated user management. Our team works tirelessly to ensure that every booking is smooth, 
                secure, and satisfying.
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
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white">
              <img 
                src={founderPhoto}
                alt="Founder and CEO"
                className="w-full h-[400px] object-cover object-center bg-gray-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Founder & CEO</h3>
                <p className="text-white/95 font-medium">Leading innovation in secure travel technology</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;

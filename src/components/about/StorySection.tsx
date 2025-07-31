
import { motion } from 'framer-motion';

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
                Airbnb Clone+ was born from a passion to create the ultimate travel booking experience. 
                Our journey began with a simple vision: to make travel planning effortless and enjoyable 
                for everyone.
              </p>
              <p>
                Built with cutting-edge technology and a deep understanding of traveler needs, 
                our platform combines the best of hotel and flight booking in one seamless experience. 
                We're committed to providing you with the tools you need to discover amazing destinations 
                and create unforgettable memories.
              </p>
              <p>
                From luxurious resorts to budget-friendly accommodations, from direct flights to 
                complex multi-city journeys, we've got you covered. Our team works tirelessly to 
                ensure that every booking is smooth, secure, and satisfying.
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
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="/lovable-uploads/b9d28591-c478-4470-9c26-396c7f5a2711.png"
                alt="Our founder and CEO"
                className="w-full h-[400px] object-cover object-center bg-gray-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-1">Our Founder & CEO</h3>
                <p className="text-white/90">Leading innovation in travel technology</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;

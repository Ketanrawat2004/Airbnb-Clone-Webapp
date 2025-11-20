
import { motion } from 'framer-motion';
import { Shield, Lock, Database, UserCheck } from 'lucide-react';

const KeyFeatures = () => {
  const features = [
    { 
      title: 'Secure Authentication', 
      description: 'Enterprise-grade role-based access control with Supabase Auth', 
      icon: Lock 
    },
    { 
      title: 'Row-Level Security', 
      description: 'Database-level protection ensuring user data isolation', 
      icon: Database 
    },
    { 
      title: 'Protected Payments', 
      description: 'Razorpay integration with signature verification', 
      icon: Shield 
    },
    { 
      title: 'User Management', 
      description: 'Authenticated bookings, reviews, and profile management', 
      icon: UserCheck 
    }
  ];

  return (
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
            Security Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built with enterprise-grade security architecture protecting your data and transactions
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
  );
};

export default KeyFeatures;

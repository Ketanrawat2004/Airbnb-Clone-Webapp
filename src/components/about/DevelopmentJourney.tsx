
import { motion } from 'framer-motion';
import { Lightbulb, Code, Cloud } from 'lucide-react';

const DevelopmentJourney = () => {
  const phases = [
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
  ];

  return (
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
          {phases.map((phase, index) => {
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
  );
};

export default DevelopmentJourney;

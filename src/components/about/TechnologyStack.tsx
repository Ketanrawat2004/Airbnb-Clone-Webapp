
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const TechnologyStack = () => {
  const technologies = [
    { name: 'React 18', description: 'Modern UI library with hooks and concurrent features', icon: '⚛️' },
    { name: 'TypeScript', description: 'Type-safe JavaScript for better development experience', icon: '📘' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid styling', icon: '🎨' },
    { name: 'Supabase', description: 'Backend-as-a-Service with PostgreSQL database', icon: '🗄️' },
    { name: 'Vite', description: 'Lightning-fast build tool and development server', icon: '⚡' },
    { name: 'Framer Motion', description: 'Smooth animations and transitions', icon: '🎭' }
  ];

  return (
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
  );
};

export default TechnologyStack;

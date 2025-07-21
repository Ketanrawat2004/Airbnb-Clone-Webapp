import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CancellationPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Card className="glass-effect border-white/30 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl">Cancellation Policy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="prose max-w-none p-8">
            <p>Free cancellation up to 24 hours before check-in...</p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default CancellationPolicy;
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Video, Phone, MessageCircle, Clock, User, Calendar } from 'lucide-react';

const VideoCallWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleVideoCall = () => {
    // Open a video call service (you can integrate with actual video call services)
    window.open('https://meet.google.com/', '_blank');
    setIsOpen(false);
  };

  const handlePhoneCall = () => {
    window.open('tel:+917489898361', '_self');
    setIsOpen(false);
  };

  const handleChat = () => {
    // You can integrate with actual chat services
    window.open('https://wa.me/917489898361', '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-80 md:right-96 lg:right-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="rounded-full h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          >
            <Video className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                <Video className="h-5 w-5 text-white" />
              </div>
              <span>Contact Support</span>
            </DialogTitle>
            <DialogDescription>
              Get instant help from our customer care team or hotel owners
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Video Call Option */}
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={handleVideoCall}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Video className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Video Call</h3>
                    <p className="text-sm text-gray-600">Face-to-face support</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-xs text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      Available Now
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phone Call Option */}
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={handlePhoneCall}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Phone Support</h3>
                    <p className="text-sm text-gray-600">+91-7489898361</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      24/7 Available
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chat Option */}
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={handleChat}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <MessageCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">WhatsApp Chat</h3>
                    <p className="text-sm text-gray-600">Quick text support</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-xs text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      Online
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hotel Owner Direct Contact */}
            <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center space-x-2">
                  <User className="h-4 w-4 text-orange-600" />
                  <span>Connect with Hotel Owners</span>
                </CardTitle>
                <CardDescription className="text-sm">
                  Direct communication with property managers for special requests
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-orange-300 text-orange-700 hover:bg-orange-100"
                  onClick={() => {
                    window.open('https://calendly.com/', '_blank');
                    setIsOpen(false);
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoCallWidget;
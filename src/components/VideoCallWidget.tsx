import { useState } from 'react';
import { Video, Phone, PhoneOff, Mic, MicOff, Camera, CameraOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const VideoCallWidget = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const startCall = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsCallActive(true);
    }, 2000);
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsMuted(false);
    setIsCameraOff(false);
  };

  if (!isCallActive && !isConnecting) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Video className="w-4 h-4" />
            Video Consultation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Video className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold">Need Help Choosing?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Connect with our travel experts for personalized recommendations
            </p>
          </div>
          <Button onClick={startCall} className="w-full">
            <Video className="w-4 h-4 mr-2" />
            Start Video Call
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isConnecting) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 animate-pulse">
              <Video className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm font-medium">Connecting...</p>
            <p className="text-xs text-muted-foreground">Please wait while we connect you with an expert</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            Video Call Active
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
            Connected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Video Area */}
        <div className="relative bg-black rounded-lg h-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
                <Video className="w-6 h-6" />
              </div>
              <p className="text-sm">Travel Expert</p>
              <p className="text-xs opacity-75">Sarah Johnson</p>
            </div>
          </div>
          
          {/* Self Video (Small) */}
          <div className="absolute bottom-2 right-2 w-20 h-16 bg-gray-800 rounded border-2 border-white">
            {isCameraOff ? (
              <div className="w-full h-full flex items-center justify-center">
                <CameraOff className="w-4 h-4 text-white" />
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500"></div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-2">
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          
          <Button
            variant={isCameraOff ? "destructive" : "secondary"}
            size="sm"
            onClick={() => setIsCameraOff(!isCameraOff)}
          >
            {isCameraOff ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={endCall}
          >
            <PhoneOff className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Call duration: 2:34
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCallWidget;
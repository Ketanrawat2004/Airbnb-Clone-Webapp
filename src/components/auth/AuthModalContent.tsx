
import { useState } from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/Logo';
import GoogleSignInButton from './GoogleSignInButton';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

interface AuthModalContentProps {
  onClose: () => void;
}

const AuthModalContent = ({ onClose }: AuthModalContentProps) => {
  const [googleLoading, setGoogleLoading] = useState(false);

  return (
    <>
      <DialogHeader>
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Logo />
          <DialogTitle className="text-xl">Airbnb Clone+</DialogTitle>
        </div>
        <DialogDescription>
          Sign in to your account or create a new one.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        {/* Google Sign In Button */}
        <GoogleSignInButton disabled={googleLoading} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <SignInForm onSuccess={onClose} disabled={googleLoading} />
        </TabsContent>

        <TabsContent value="signup">
          <SignUpForm onSuccess={onClose} disabled={googleLoading} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default AuthModalContent;

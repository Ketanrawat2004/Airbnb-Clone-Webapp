
import Logo from '@/components/Logo';

interface AuthConfirmHeaderProps {
  title?: string;
  subtitle?: string;
}

const AuthConfirmHeader = ({ 
  title = "Airbnb Clone+", 
  subtitle 
}: AuthConfirmHeaderProps) => {
  return (
    <div className="flex items-center justify-center space-x-3 mb-6">
      <Logo />
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-rose-500">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-600">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default AuthConfirmHeader;

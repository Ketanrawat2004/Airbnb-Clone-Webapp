
import { Building2, Plane } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'hotels' | 'flights';
  onTabChange: (tab: 'hotels' | 'flights') => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="flex mb-4 bg-gray-100 rounded-xl p-1">
      <button
        type="button"
        onClick={() => onTabChange('hotels')}
        className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
          activeTab === 'hotels'
            ? 'bg-white text-rose-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Building2 className="h-4 w-4" />
        <span>Hotels</span>
      </button>
      <button
        type="button"
        onClick={() => onTabChange('flights')}
        className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
          activeTab === 'flights'
            ? 'bg-white text-rose-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Plane className="h-4 w-4" />
        <span>Flights</span>
      </button>
    </div>
  );
};

export default TabNavigation;


import { Building2, Plane, Train, Bus } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'hotels' | 'flights' | 'trains' | 'buses';
  onTabChange: (tab: 'hotels' | 'flights' | 'trains' | 'buses') => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const tabs = [
    { id: 'hotels' as const, icon: Building2, label: 'Hotels' },
    { id: 'flights' as const, icon: Plane, label: 'Flights' },
    { id: 'trains' as const, icon: Train, label: 'Trains' },
    { id: 'buses' as const, icon: Bus, label: 'Buses' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 bg-gray-100 rounded-xl p-2">
      {tabs.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onTabChange(id)}
          className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            activeTab === id
              ? 'bg-white text-rose-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;

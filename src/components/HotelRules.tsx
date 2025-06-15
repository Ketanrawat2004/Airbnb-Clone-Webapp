
interface HotelRulesProps {
  rules: string[];
}

const HotelRules = ({ rules }: HotelRulesProps) => {
  if (!rules || rules.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Rules & Regulations</h2>
      <ul className="space-y-2">
        {rules.map((rule, index) => (
          <li key={index} className="text-gray-700 text-sm flex items-start space-x-2">
            <span className="text-rose-500 mt-1">•</span>
            <span>{rule}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelRules;

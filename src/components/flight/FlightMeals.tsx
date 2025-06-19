
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FlightMealsProps {
  selectedMeal: string;
  onMealSelect: (mealId: string) => void;
}

const FlightMeals = ({ selectedMeal, onMealSelect }: FlightMealsProps) => {
  const mealOptions = [
    { id: 'veg', name: 'Vegetarian', price: 0, description: 'Fresh vegetarian meal with seasonal vegetables' },
    { id: 'non-veg', name: 'Non-Vegetarian', price: 250, description: 'Chicken curry with rice and bread' },
    { id: 'vegan', name: 'Vegan', price: 150, description: 'Plant-based meal with organic ingredients' },
    { id: 'jain', name: 'Jain Vegetarian', price: 200, description: 'Jain-friendly meal without root vegetables' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pre-order Your Meal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mealOptions.map((meal) => (
            <div 
              key={meal.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedMeal === meal.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onMealSelect(meal.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{meal.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{meal.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">
                    {meal.price === 0 ? 'Included' : `+₹${meal.price}`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightMeals;

import { Car, Wrench, Settings, Navigation } from 'lucide-react';

export default function AllCategorySection() {
  const categories = [
    {
      title: "Car Reviews",
      description: "In-depth reviews of the latest vehicles, covering performance, features, safety ratings, and value for money to help you make informed decisions.",
      icon: Car,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Maintenance Tips",
      description: "Expert advice on keeping your vehicle in top condition, including seasonal maintenance, DIY repairs, and cost-effective service schedules.",
      icon: Wrench,
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Car Modifications",
      description: "Explore performance upgrades, aesthetic enhancements, and custom modifications to personalize your vehicle and improve its capabilities.",
      icon: Settings,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Driving Tips",
      description: "Professional driving techniques, safety tips, fuel efficiency strategies, and advanced driving skills for all weather conditions and terrains.",
      icon: Navigation,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-16 text-center">All Category</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {categories.map((category, index) => (
            <div
              key={index}
              className="text-center p-6 md:p-8 bg-gray-50 rounded-lg hover:shadow-xl transition-shadow h-60 md:h-80 flex flex-col justify-center"
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 ${category.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <category.icon size={32} className="md:w-10 md:h-10" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">{category.title}</h3>
              <p className="text-gray-600 text-base md:text-lg">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

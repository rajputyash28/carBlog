import { Button } from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section 
      className="bg-[#232536] text-white relative min-h-[500px] md:min-h-[594px]"
      style={{
        backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/5/53/Luxury_Vehicle_Resort_%28Unsplash%29.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[500px] md:h-[594px] flex items-center relative z-10">
        <div className="w-full text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              Your Journey<br />
              Your Car<br />
              Your Way
            </h1>
            <p className="text-white mb-8 text-base md:text-lg max-w-md mx-auto md:mx-0 drop-shadow-lg">
              Discover comprehensive car reviews, expert maintenance tips, and the latest automotive technology. Your trusted source for making informed vehicle decisions and enhancing your driving experience.
            </p>
            <Button size="lg" className="drop-shadow-lg" isSubscribe>
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
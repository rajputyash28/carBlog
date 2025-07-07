import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
      
      {/* Intro Section */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Our Car Blog</h1>
        <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto">
          Your ultimate destination for automotive insights, reviews, and futuristic car trends.
        </p>
      </div>

      {/* Hero Image */}
      <div className="relative mb-16 h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-lg">
        <Image
          src="https://plus.unsplash.com/premium_photo-1687153733088-9fc19cbc59bf?w=600&h=400&fit=crop"
          alt="Futuristic Car"
          fill
          className="object-cover"
          sizes="(min-width: 768px) 100vw, 100vw"
        />
      </div>

      {/* Why We Exist */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Why This Car Blog Exists</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 mb-4 text-base md:text-lg">
              Our blog connects automotive enthusiasts with the latest industry developments. Whether you're a collector or buying your first car, we ensure you stay informed with engaging, accurate content.
            </p>
            <p className="text-gray-700 text-base md:text-lg">
              As car technology evolves rapidly, we help you understand trends, new models, and practical ownership advice.
            </p>
          </div>
          <div className="w-full h-60 md:h-80 relative rounded-lg overflow-hidden shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&auto=format&fit=crop"
              alt="Modern Car"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">What We Cover</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Electric Vehicles (EVs)",
              desc: "Comprehensive EV reviews, charging updates, and sustainable driving tips.",
              img: "https://images.unsplash.com/photo-1688893287874-ac7fbd686c24?w=600&h=400&fit=crop",
            },
            {
              title: "SUV Reviews",
              desc: "In-depth analysis of SUVs, from compact crossovers to full-size adventure vehicles.",
              img: "https://images.unsplash.com/photo-1729349385457-dee64f37ad31?w=600&h=400&fit=crop",
            },
            {
              title: "Maintenance Tips",
              desc: "Expert advice to keep your car in top condition and save money.",
              img: "https://images.unsplash.com/photo-1589148938909-4d241c91ee52?w=600&h=400&fit=crop",
            },
            {
              title: "Luxury Cars",
              desc: "Reviews and insights into premium vehicles and luxury automotive brands.",
              img: "https://images.unsplash.com/photo-1605475300318-c377291697ac?q=80&w=800&auto=format&fit=crop",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="relative h-40 md:h-56 w-full mb-4 rounded-md overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
       {/* Tech Stack */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Tech Stack</h2>
        <div className="bg-gray-100 p-6 md:p-8 rounded-lg">
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base md:text-lg">
            <li><strong>Next.js </strong> — React framework with App Router for SSR & performance</li>
            <li><strong>TypeScript</strong> — Type-safe development for better code quality</li>
            <li><strong>Tailwind CSS</strong> — Utility-first CSS for responsive, modern design</li>
            <li><strong>Lucide React</strong> — Beautiful, customizable icon set</li>
            <li><strong>JSONPlaceholder API</strong> — Dynamic, mock content for demo purposes</li>
            <li><strong>FakeCar API</strong> — Dynamic, mock content for demo purposes</li>
            <li><strong>Responsive Design</strong> — Mobile-first layouts for a great experience everywhere</li>
          </ul>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 md:p-12 rounded-lg text-center shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4 text-base md:text-lg max-w-2xl mx-auto">
          We are dedicated to providing unbiased, informative, and engaging automotive content that empowers our readers to make confident decisions. From buying guides to car care — we cover it all.
        </p>
        <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto">
          Join us as we explore the ever-evolving, futuristic world of automobiles together!
        </p>
      </section>
    </div>
  );
}

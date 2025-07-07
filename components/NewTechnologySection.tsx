import Image from 'next/image';
import Link from 'next/link';

export default function NewTechnologySection() {
  const techPosts = [
    {
      title: "Advanced Driver Assistance Systems: The Future of Road Safety",
      author: "Alex Thompson",
      date: "Dec 15, 2024",
      readTime: "4 Min Read",
      image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=300&h=200&fit=crop"
    },
    {
      title: "Electric Vehicle Charging Infrastructure: What's Coming in 2025",
      author: "Maria Garcia",
      date: "Dec 12, 2024",
      readTime: "6 Min Read",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop"
    },
    {
      title: "Autonomous Driving Technology: Current State and Future Prospects",
      author: "David Kim",
      date: "Dec 10, 2024",
      readTime: "5 Min Read",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&h=200&fit=crop"
    },
    {
      title: "Hybrid Powertrains: Bridging the Gap to Full Electrification",
      author: "Jennifer Lee",
      date: "Dec 8, 2024",
      readTime: "3 Min Read",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop"
    }
  ];

  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">New Technology</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm md:text-base">
            
            
          
            <Link href="/blogs" className="text-blue-600 hover:text-blue-800 text-sm md:text-base">
                See all
              </Link>
            
            
            </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {techPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src={post.image}
                alt={post.title}
                width={300}
                height={200}
                className="w-full h-50 md:h-80 object-cover"
              />
              <div className="p-4 md:p-6">
                <h3 className="font-bold text-sm md:text-lg mb-3 line-clamp-2">{post.title}</h3>
                <div className="flex items-center text-xs md:text-sm text-gray-500">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-2 md:mr-3 flex items-center justify-center text-white text-xs font-bold">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <p>{post.date} • {post.readTime}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
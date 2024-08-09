import Image from "next/image"
import ServiceCard from "./ServiceCard"
import Link from "next/link"


const Services = () => {
  return (
    <section>
    <div className="min-h-screen bg-white p-10 relative">
      {/* Image positioned at top left */}
      <Image src="/assets/images/Rectangle 9.png" alt="Rectangle 9" width={200} height={150} className="absolute top-0 left-0" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-sm font-semibold text-gray-500 mb-2 mt-20">CATEGORY</h2>
        <h1 className="text-3xl font-bold text-gray-800 mb-10">We Offer Best Services</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard 
            title="Donate Now"
            icon="🚀"
            bgColor="bg-red-500"
          />
          <ServiceCard 
            title="CAMPAIGNS"
            icon="📅"
            bgColor="bg-blue-900"
          />
          <ServiceCard 
            title="Events"
            icon="🎉"
            bgColor="bg-green-900"
          />
          <Link href="/stories">
          <ServiceCard 
            title="Donor Wall"
            icon="🏆"
            bgColor="bg-green-500"
          /></Link>

          
        </div>
      </div>
    </div>
  </section>
  )
}

export default Services

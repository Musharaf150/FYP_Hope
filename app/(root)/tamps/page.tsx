import React from 'react'

const tamps = () => {
    return (
        <section className="bg-gray-100 text-gray-900">
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-bold text-center mb-8">Browse <span className="text-blue-600">Campaigns</span></h2>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                
                    <div className="bg-white rounded-lg ">
                        <div className="relative">
                            <img src="https://via.placeholder.com/300" alt="Campaign Image" className="w-full h-48 object-cover rounded-t-lg" />
                            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">URGENT</div>
                            <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">Zakat Eligible</div>
                        </div>
                        <div className="mt-4 p-3">
                            <h3 className="text-lg font-semibold">Combat Communicable Diseases in Sindh's</h3>
                            <p className="text-gray-600 mt-2"><a href="#" className="text-blue-600 font-semibold">[Read More]</a></p>
                            <div className="mt-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span>Rs. 6,900,000</span>
                                    <span className="text-gray-600">Required</span>
                                </div>
                                <div className="flex items-center justify-between text-sm mt-1">
                                    <span>Rs. 2,528,449</span>
                                    <span className="text-gray-600">Raised</span>
                                </div>
                                
                            </div>
                            <button className="w-full bg-blue-600 text-white font-semibold py-2 px-2 rounded mt-4">DONATE NOW</button>
                        </div>
                    </div>

                    
                </div>
            </div>
        </section>

    )
}

export default tamps
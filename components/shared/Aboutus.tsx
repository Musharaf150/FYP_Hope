import Image from "next/image";
import React from "react";

function AboutUs() {
    return (
        <>
            <section className="wrapper pt-5">
                <div className=" p-4">

                    <div className="text-center my-8">
                        <h1 className="text-4xl font-semibold text-gray-800 mt-4">
                            <span className="text-blue-600"> Hope Foundation </span> Is Providing A Fundraising Website to NGO To Make Things Easier And Convenient To them
                        </h1>
                    </div>

                    <div className="px-5 flex flex-row gap-3 flex-wrap md:flex-row">
                        <div className="text-lg text-gray-700 md:w-2/4">
                            <p className="mb-4 max-w-5xl">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis voluptatum repellat rem dignissimos quis vero odit autem maiores dicta facilis?
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis voluptatum repellat rem dignissimos quis vero odit autem maiores dicta facilis?
                                ipsum dolor, sit amet consectetur adipisicing elit. Perferendis voluptatum repellat rem dignissimos quis vero odit autem maiores dicta facilis?
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis voluptatum repellat rem dignissimos quis vero odit autem maiores dicta facilis?
                            </p>
                            <a href="#">   <button className="bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-purple-700">
                                Join Volunteer team
                            </button></a>
                        </div>

                        <div className=" md:mt-0 rounded-lg shadow-2xl">
                            <Image
                                src="/assets/images/aboutus_ngo_img.jpg"
                                alt="ngo"
                                width={500}
                                height={300}
                                className="w-250 object-cover rounded-lg" />
                        </div>
                    </div>
                </div>
            </section>


            <section className="bg-white-100 text-gray-900">
                <div className="container mx-auto p-6">
                    <h2 className="text-3xl font-bold text-center mb-8 pt-5">Executive Management and Trustees</h2>
                    <div className="flex flex-wrap justify-center">
                        {/* <!-- Card 1 --> */}
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <div className="p-6 text-center">
                                <img src="https://via.placeholder.com/150" alt="hellofounder" className="w-32 h-32 rounded-full mx-auto mb-4" />
                                <h3 className="text-xl font-semibold">hellofounder</h3>
                                <p className="text-sm text-gray-600">(Tamgha-e-Imtiaz)</p>
                                <p className="text-green-600 font-semibold mb-2">CEO - Founder Hope foundation</p>
                                <div className="flex justify-center space-x-4 mt-4">

                                    <a href="mailto:hello@storytailors.tv" className="text-green-600 hover:text-green-800">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.6 3.4h-19.2c-1.32 0-2.4 1.08-2.4 2.4v12.4c0 1.32 1.08 2.4 2.4 2.4h19.2c1.32 0 2.4-1.08 2.4-2.4v-12.4c0-1.32-1.08-2.4-2.4-2.4zm-19.2 2.4h19.2l-9.6 7.2-9.6-7.2zm19.2 12.4h-19.2v-9.6l9.6 7.2 9.6-7.2v9.6z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Card 1 --> */}
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <div className="p-6 text-center">
                                <img src="https://via.placeholder.com/150" alt="hellofounder" className="w-32 h-32 rounded-full mx-auto mb-4" />
                                <h3 className="text-xl font-semibold">hellofounder</h3>
                                <p className="text-sm text-gray-600">(Tamgha-e-Imtiaz)</p>
                                <p className="text-green-600 font-semibold mb-2">CEO - Founder Hope foundation</p>
                                <div className="flex justify-center space-x-4 mt-4">

                                    <a href="mailto:hello@storytailors.tv" className="text-green-600 hover:text-green-800">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.6 3.4h-19.2c-1.32 0-2.4 1.08-2.4 2.4v12.4c0 1.32 1.08 2.4 2.4 2.4h19.2c1.32 0 2.4-1.08 2.4-2.4v-12.4c0-1.32-1.08-2.4-2.4-2.4zm-19.2 2.4h19.2l-9.6 7.2-9.6-7.2zm19.2 12.4h-19.2v-9.6l9.6 7.2 9.6-7.2v9.6z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Card 1 --> */}
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <div className="p-6 text-center">
                                <img src="https://via.placeholder.com/150" alt="hellofounder" className="w-32 h-32 rounded-full mx-auto mb-4" />
                                <h3 className="text-xl font-semibold">hellofounder</h3>
                                <p className="text-sm text-gray-600">(Tamgha-e-Imtiaz)</p>
                                <p className="text-green-600 font-semibold mb-2">CEO - Founder Hope foundation</p>
                                <div className="flex justify-center space-x-4 mt-4">

                                    <a href="mailto:hello@storytailors.tv" className="text-green-600 hover:text-green-800">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.6 3.4h-19.2c-1.32 0-2.4 1.08-2.4 2.4v12.4c0 1.32 1.08 2.4 2.4 2.4h19.2c1.32 0 2.4-1.08 2.4-2.4v-12.4c0-1.32-1.08-2.4-2.4-2.4zm-19.2 2.4h19.2l-9.6 7.2-9.6-7.2zm19.2 12.4h-19.2v-9.6l9.6 7.2 9.6-7.2v9.6z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Card 1 --> */}
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <div className="p-6 text-center">
                                <img src="https://via.placeholder.com/150" alt="hellofounder" className="w-32 h-32 rounded-full mx-auto mb-4" />
                                <h3 className="text-xl font-semibold">hellofounder</h3>
                                <p className="text-sm text-gray-600">(Tamgha-e-Imtiaz)</p>
                                <p className="text-green-600 font-semibold mb-2">CEO - Founder Hope foundation</p>
                                <div className="flex justify-center space-x-4 mt-4">

                                    <a href="mailto:hello@storytailors.tv" className="text-green-600 hover:text-green-800">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.6 3.4h-19.2c-1.32 0-2.4 1.08-2.4 2.4v12.4c0 1.32 1.08 2.4 2.4 2.4h19.2c1.32 0 2.4-1.08 2.4-2.4v-12.4c0-1.32-1.08-2.4-2.4-2.4zm-19.2 2.4h19.2l-9.6 7.2-9.6-7.2zm19.2 12.4h-19.2v-9.6l9.6 7.2 9.6-7.2v9.6z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Card 1 --> */}
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <div className="p-6 text-center">
                                <img src="https://via.placeholder.com/150" alt="hellofounder" className="w-32 h-32 rounded-full mx-auto mb-4" />
                                <h3 className="text-xl font-semibold">hellofounder</h3>
                                <p className="text-sm text-gray-600">(Tamgha-e-Imtiaz)</p>
                                <p className="text-green-600 font-semibold mb-2">CEO - Founder Hope foundation</p>
                                <div className="flex justify-center space-x-4 mt-4">

                                    <a href="mailto:hello@storytailors.tv" className="text-green-600 hover:text-green-800">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.6 3.4h-19.2c-1.32 0-2.4 1.08-2.4 2.4v12.4c0 1.32 1.08 2.4 2.4 2.4h19.2c1.32 0 2.4-1.08 2.4-2.4v-12.4c0-1.32-1.08-2.4-2.4-2.4zm-19.2 2.4h19.2l-9.6 7.2-9.6-7.2zm19.2 12.4h-19.2v-9.6l9.6 7.2 9.6-7.2v9.6z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Card 1 --> */}
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <div className="p-6 text-center">
                                <img src="https://via.placeholder.com/150" alt="hellofounder" className="w-32 h-32 rounded-full mx-auto mb-4" />
                                <h3 className="text-xl font-semibold">hellofounder</h3>
                                <p className="text-sm text-gray-600">(Tamgha-e-Imtiaz)</p>
                                <p className="text-green-600 font-semibold mb-2">CEO - Founder Hope foundation</p>
                                <div className="flex justify-center space-x-4 mt-4">

                                    <a href="mailto:hello@storytailors.tv" className="text-green-600 hover:text-green-800">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.6 3.4h-19.2c-1.32 0-2.4 1.08-2.4 2.4v12.4c0 1.32 1.08 2.4 2.4 2.4h19.2c1.32 0 2.4-1.08 2.4-2.4v-12.4c0-1.32-1.08-2.4-2.4-2.4zm-19.2 2.4h19.2l-9.6 7.2-9.6-7.2zm19.2 12.4h-19.2v-9.6l9.6 7.2 9.6-7.2v9.6z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Card 1 --> */}
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <div className="p-6 text-center">
                                <img src="https://via.placeholder.com/150" alt="hellofounder" className="w-32 h-32 rounded-full mx-auto mb-4" />
                                <h3 className="text-xl font-semibold">hellofounder</h3>
                                <p className="text-sm text-gray-600">(Tamgha-e-Imtiaz)</p>
                                <p className="text-green-600 font-semibold mb-2">CEO - Founder Hope foundation</p>
                                <div className="flex justify-center space-x-4 mt-4">

                                    <a href="mailto:hello@storytailors.tv" className="text-green-600 hover:text-green-800">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.6 3.4h-19.2c-1.32 0-2.4 1.08-2.4 2.4v12.4c0 1.32 1.08 2.4 2.4 2.4h19.2c1.32 0 2.4-1.08 2.4-2.4v-12.4c0-1.32-1.08-2.4-2.4-2.4zm-19.2 2.4h19.2l-9.6 7.2-9.6-7.2zm19.2 12.4h-19.2v-9.6l9.6 7.2 9.6-7.2v9.6z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>





                    </div>
                </div>
            </section>
        </>

    );
}

export default AboutUs


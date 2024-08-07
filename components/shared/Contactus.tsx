import Image from 'next/image'
import React from 'react'

function Contactus() {
  return (
    <section className=" text-gray-900 flex items-center justify-center h-screen">
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div className="mb-6 lg:mb-0 lg:mr-6">
            <h2 className="text-3xl font-bold mb-4">Contact details</h2>
            <ul className="pl-0">
              <li className="flex items-center gap-3">
                <Image
                  src="/assets/images/email 1.png"
                  alt="Email"
                  width={50}
                  height={100}
                  className="w-12 h-12 object-contain" />
                <div>
                  <p className="font-semibold text-md pt-3 m-0">Write to us at</p>
                  <p className="text-md">hello@hopeFoundation.tv</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Image
                  src="/assets/images/phone-call 1.png"
                  alt="Phone"
                  width={50}
                  height={100}
                  className="w-12 h-12 object-contain " />

                <div>
                  <p className="font-semibold text-md pt-3 m-0">Call us at</p>
                  <p className="text-md">+44-7742-492-665</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
              <Image
                  src="/assets/images/building 1.png"
                  alt="Address"
                  width={50}
                  height={100}
                  className="w-12 h-12 object-contain " />
                <div>
                  <p className="font-semibold text-md pt-3 m-0">Visit us at</p>
                  <p className="text-md">71-75 Shelton Street, London WC2H 9JQ</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
              <Image
                  src="/assets/images/facebook-logo 1.png"
                  alt="Fb"
                  width={50}
                  height={100}
                  className="w-12 h-12 object-contain " />
                <div>
                  <p className="font-semibold text-md pt-3 m-0">Let's keep in touch on Facebook:</p>
                  <p className="text-md">facebook.com/hopeFoundation.tv</p>
                </div>
              </li>
            </ul>
          </div>

          {/* <!-- Contact Form --> */}
          <div className="bg-white p-6 rounded-lg shadow-xl shadow-slate-500 w-full lg:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Get in touch</h2>
            <form action="#" method="POST">
              <div className="mb-4">
                <input type="text" name="name" placeholder="Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <input type="email" name="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <textarea name="message" grid-rows="4" placeholder="Message" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <div className="flex items-center mb-4">
                <input type="checkbox" name="privacy" id="privacy" className="mr-2" />
                <label htmlFor="privacy" className="text-md">By using this form you agree to our <a href="#" className="text-blue-500 no-underline">privacy policy</a>.</label>
              </div>
              <div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Contact us</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contactus


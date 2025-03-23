import React from 'react'
import 'flowbite'

function NotFound() {
  return (
    <>
        <section class="bg-gray-900 h-screen py-16">
          <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div class="mx-auto max-w-screen-sm text-center">
                  <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-lime-500">404</h1>
                  <p class="mb-4 text-3xl tracking-tight font-bold text-white md:text-4xl">Something's missing.</p>
                  <p class="mb-4 text-lg font-light text-white">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                  <a href="/Home" class="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-2 focus:outline-none focus:ring-lime-500 border border:ring-lime-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Back to Homepage</a>
              </div>   
          </div>
      </section>
    </>
  )
}

export default NotFound
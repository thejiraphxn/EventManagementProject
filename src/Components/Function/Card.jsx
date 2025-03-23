import React from 'react'
import 'flowbite'

export default function Card({src, title, description}) {
    const ref = 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'


  return (
        <a className="group block" href="#">
            <div className="aspect-w-full aspect-h-full overflow-hidden bg-gray-100 rounded-2xl dark:bg-neutral-800">
                <img className="group-hover:scale-105 transition-transform duration-500 ease-in-out object-cover rounded-2xl" src={src} alt="Image Description" />
            </div>
            <div className="pt-4">
                <h3 className="relative inline-block font-medium text-lg text-white before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400 before:transition before:origin-left before:scale-x-0 group-hover:before:scale-x-100 text-white">
                {title}
                </h3>
                <p className="mt-1 text-neutral-400">
                {description}
                </p>
            </div>
        </a>


  )
}

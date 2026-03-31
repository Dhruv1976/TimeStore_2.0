import React, { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 pt-16 bg-white text-gray-800">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-wide text-center">
        About <span className="text-gray-700">TimeStore</span>
      </h1>

      <div className="max-w-3xl text-center text-gray-600 leading-relaxed space-y-4">
        <p>
          <span className="font-semibold text-gray-900">TimeStore</span> is a
          full-stack e-commerce project created to practice and showcase
          modern web development skills. The project focuses on building a
          responsive, functional, and visually appealing e-commerce platform
          with both frontend and backend components.
        </p>
        <p>
          <span className="font-medium text-gray-900">Frontend</span> is built using{" "}
          <span className="font-medium text-gray-900">React.js</span>,{" "}
          <span className="font-medium text-gray-900">Redux Toolkit</span>, and{" "}
          <span className="font-medium text-gray-900">Tailwind CSS</span> for a fast,
          clean, and scalable user interface.
        </p>
        <p>
          <span className="font-medium text-gray-900">Backend</span> is built using{" "}
          <span className="font-medium text-gray-900">Node.js</span>,{" "}
          <span className="font-medium text-gray-900">Express.js</span>,{" "}
          <span className="font-medium text-gray-900">MongoDB</span>, and{" "}
          <span className="font-medium text-gray-900">Cloudinary</span> for robust API
          services, database management, and media storage.
        </p>
        <p>
          This platform is <span className="font-semibold">not a real store</span>; it was
          developed for learning and educational purposes to demonstrate full-stack development capabilities.
        </p>
      </div>

      <div className="mt-10 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm p-8 text-center w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Developer Information
        </h2>
        <p className="text-gray-700 mb-2">
          <span className="font-medium text-gray-900">Name:</span> Dhruv
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium text-gray-900">Email:</span>{" "}
          <a
            href="mailto:dhruv.web7700@gmail.com"
            className="text-gray-900 hover:underline"
          >
            dhruv.web7700@gmail.com
          </a>
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium text-gray-900">GitHub:</span>{" "}
          <a
            href="https://github.com/Dhruv1976"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 hover:underline"
          >
            github.com/Dhruv1976
          </a>
        </p>
        <p className="text-gray-700">
          <span className="font-medium text-gray-900">LinkedIn:</span>{" "}
          <a
            href="https://www.linkedin.com/in/dhruv7700/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 hover:underline"
          >linkedin.com/in/dhruv7700
          </a>
        </p>
      </div>

    </div>
  );
};

export default AboutUs;

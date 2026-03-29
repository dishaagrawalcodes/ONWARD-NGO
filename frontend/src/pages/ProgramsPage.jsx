import Education1 from "../assets/Education1.jpg";
import Education2 from "../assets/Education2.jpg";
import Education3 from "../assets/Education3.jpg";

import Health1 from "../assets/Health1.jpg";
import Health2 from "../assets/Health2.jpg";
import Health3 from "../assets/Health3.jpg";

import Food6 from "../assets/Food6.jpg";
import Food7 from "../assets/Food7.jpg";
import Food3 from "../assets/food3.jpg";

import Environment1 from "../assets/Environment1.jpg";
import Environment2 from "../assets/Environment2.jpg";
import Environment3 from "../assets/Environment3.jpg";

import Women1 from "../assets/women1.jpg";
import Women2 from "../assets/women2.jpg";
import Women3 from "../assets/women3.jpg";

const programs = [
  {
    title: "Education Program",
    location: "Rural & Urban Slum Areas",
    description:
      "Providing access to quality education, school supplies, and mentorship to underprivileged children.",
    images: [Education1, Education2, Education3],
  },
  {
    title: "Health Camps",
    location: "Community Centers & Villages",
    description:
      "Organizing free medical checkups, health awareness sessions, and medicine distribution.",
    images: [Health1, Health2, Health3],
  },
  {
    title: "Food Distribution",
    location: "Low-income Communities",
    description:
      "Ensuring nutritious meals reach families facing food insecurity.",
    images: [Food6, Food7, Food3],
  },
  {
    title: "Environment Activities",
    location: "Schools & Public Spaces",
    description:
      "Tree plantation drives, cleanliness campaigns, and sustainability awareness programs.",
    images: [Environment1, Environment2, Environment3],
  },
  {
    title: "Women Empowerment",
    location: "Community Skill Centers",
    description:
      "Skill development, self-employment training, and awareness programs for women.",
    images: [Women1, Women2, Women3],
  },
];

const ProgramsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* PAGE HEADER */}
      <section className="bg-blue-900 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h1>
        <p className="max-w-2xl mx-auto text-gray-200">
          Discover the impactful programs through which we serve communities
          and bring positive change.
        </p>
      </section>

      {/* PROGRAMS */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {programs.map((program, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition"
          >
            {/* IMAGES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {program.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={program.title}
                  className="h-56 w-full object-contain"
                  loading="lazy"
                />
              ))}
            </div>

            {/* CONTENT */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                {program.title}
              </h2>
              <p className="text-sm text-blue-700 font-medium mb-3">
                📍 {program.location}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {program.description}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProgramsPage;

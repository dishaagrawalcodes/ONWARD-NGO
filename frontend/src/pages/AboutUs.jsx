import { FaChalkboardTeacher, FaHeartbeat, FaHandsHelping, FaChild } from "react-icons/fa";
import { GiHumanTarget, GiBookshelf, GiSkills, GiHealthNormal } from "react-icons/gi";

const AboutUs = () => {
  const focusAreas = [
    { title: "Women Empowerment & Gender Equality", icon: <FaHandsHelping className="text-green-600 w-8 h-8 mx-auto mb-2" /> },
    { title: "Human Rights Advocacy & Awareness", icon: <GiHumanTarget className="text-red-500 w-8 h-8 mx-auto mb-2" /> },
    { title: "Education & Digital Literacy", icon: <GiBookshelf className="text-blue-500 w-8 h-8 mx-auto mb-2" /> },
    { title: "Skill Development & Livelihoods", icon: <GiSkills className="text-yellow-500 w-8 h-8 mx-auto mb-2" /> },
    { title: "Healthcare & Mental Well-being", icon: <FaHeartbeat className="text-pink-500 w-8 h-8 mx-auto mb-2" /> },
    { title: "Agriculture & Sustainable Development", icon: <GiHealthNormal className="text-green-700 w-8 h-8 mx-auto mb-2" /> },
    { title: "Child Rights & Protection", icon: <FaChild className="text-purple-500 w-8 h-8 mx-auto mb-2" /> },
    { title: "Socio-political Awareness & E-Governance", icon: <FaChalkboardTeacher className="text-orange-500 w-8 h-8 mx-auto mb-2" /> },
  ];

  return (
    <section className="bg-gradient-to-br from-yellow-50 via-white to-slate-100 py-24 px-6 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-green-100 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            About Us
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-600 mx-auto my-6 rounded-full"></div>
          <p className="text-slate-700 max-w-3xl mx-auto text-lg leading-relaxed">
            Onward Foundation is a Section 8 non-profit organization
            dedicated to social justice, human rights, and inclusive development across India.
          </p>
        </div>

        {/* WHO WE ARE */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/30 rounded-3xl shadow-2xl p-12 mb-20 hover:scale-105 transform transition duration-500">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Who We Are
          </h2>
          <p className="text-slate-700 leading-loose text-lg">
            Onward Foundation is a not-for-profit organization
            registered under the Companies Act, 2013. We strive to uplift marginalized
            communities by promoting education, healthcare, skill development,
            gender equality, and human rights through impactful initiatives
            and community-driven programs.
          </p>
        </div>

        {/* VISION & MISSION */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition transform hover:-translate-y-2">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Our Vision</h3>
            <p className="text-slate-700 leading-relaxed">
              To build an inclusive and just society where every individual
              lives with dignity, equality, and access to opportunities.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition transform hover:-translate-y-2">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Our Mission</h3>
            <p className="text-slate-700 leading-relaxed">
              To empower communities through education, advocacy, skill development,
              and sustainable initiatives that promote social justice and equality.
            </p>
          </div>
        </div>

        {/* FOCUS AREAS */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-14">
            Our Key Focus Areas
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {focusAreas.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-6 text-center hover:-translate-y-3 hover:shadow-2xl transition transform duration-500 cursor-pointer"
              >
                {item.icon}
                <p className="font-medium text-slate-800 mt-2">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;

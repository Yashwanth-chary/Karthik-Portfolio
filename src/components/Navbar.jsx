import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, Folder, Code, Mail } from "lucide-react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = ["home", "experience", "projects", "skills", "contact"];
      let foundSection = "home"; // Default to home
  
      for (let section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const sectionTop = el.offsetTop - 150;
          const sectionBottom = sectionTop + el.offsetHeight;
  
          // Check if the current scroll position is within the section
          if (scrollY >= sectionTop && scrollY < sectionBottom) {
            foundSection = section;
          }
        }
      }
  
      // Special case: If the user scrolls to the bottom, activate "contact"
      if (window.innerHeight + scrollY >= document.body.scrollHeight - 50) {
        foundSection = "contact";
      }
  
      setActiveSection(foundSection);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

  const navItems = [
    { name: "Home", icon: <Home size={22} />, id: "home" },
    { name: "Experience", icon: <Briefcase size={22} />, id: "experience" },
    { name: "Projects", icon: <Folder size={22} />, id: "projects" },
    { name: "Skills", icon: <Code size={22} />, id: "skills" },
    { name: "Contact", icon: <Mail size={22} />, id: "contact" },
  ];

  return (
<motion.nav
  className="fixed inset-0 flex items-end bottom-8 justify-center z-50"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  <div className="bg-white/50 backdrop-blur-lg shadow-xl px-6 py-3 rounded-full flex gap-10 justify-center border border-gray-300">
  {navItems.map(({ name, icon, id }) => (
    <a
      key={id}
      href={`#${id}`}
      className={`flex flex-col items-center justify-center text-sm font-medium transition-all duration-300 ${
        activeSection === id
          ? "text-white bg-indigo-500 px-4 py-2 rounded-full shadow-lg"
          : "text-gray-800 hover:text-indigo-600"
      }`}
    >
      <span className="flex items-center justify-center">{icon}</span>
      <span className="mt-1">{name}</span>
    </a>
  ))}
  </div>
</motion.nav>

  );
}

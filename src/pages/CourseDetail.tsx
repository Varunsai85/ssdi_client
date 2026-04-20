import { useParams } from "react-router";
import { useMemo,useEffect } from "react";
import OrbitingCircles from "../components/OrbitingCircles";
import { Clock, BarChart } from "lucide-react";
import { slugify } from "../lib/utils";
import { motion } from "framer-motion";
import  courses  from "@/lib/courses.json";

const CourseDetail = ({ setProgress }: { setProgress: (progress: number) => void }) => {
  const { slug } = useParams();
  useEffect(() => {
    setProgress(30);
    const timer = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timer);
  }, []);
  const course = useMemo(() => {
  if (!slug || courses.length === 0) return null;
  return courses.find((c) => slugify(c.title) === slug) || null;
}, [slug, courses]);

  if (!course) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
  }

  // Extract icon URLs from course technologies, or use fallback
  const displayTechnologies = course.technologies && course.technologies.length > 0 
    ? course.technologies.map(t => t.iconUrl)
    : [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
    "https://cdn.iconscout.com/icon/free/png-256/free-javascript-logo-icon-download-in-svg-png-gif-file-formats--brand-development-tools-pack-logos-icons-225993.png?f=webp&w=256",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png",
    "https://cdn.iconscout.com/icon/free/png-256/free-python-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-5-pack-logos-icons-2945099.png?f=webp&w=256",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8X3DqaYw_qQG1OBy_cReeF6f7K7F35_wQ9w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ35-p9-J0p6Qd_8p3q7q-q-q-q-q-q-q-q-q&s"
  ];

  return (
    <div className="relative min-h-screen bg-background pt-24 pb-12 overflow-hidden">
      {/* Background Gradient - Moved from OrbitingCircles for page-wide consistency */}
       <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>
      
      <motion.div 
          key={slug} // Trigger animation when slug changes
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">{course.title}</h1>
                <p className="text-lg text-muted-foreground mb-8">{course.description}</p>
                 <div className="flex gap-4 mb-8">
                    <span className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg font-medium">
                        <Clock className="w-5 h-5" /> {course.duration || "Self-Paced"}
                    </span>
                    <span className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg font-medium">
                        <BarChart className="w-5 h-5" /> {course.level || "All Levels"}
                    </span>
                </div>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="rounded-2xl overflow-hidden shadow-2xl"
            >
                <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
            </motion.div>
        </div>

        {/* Technologies Section with Orbiting Circles */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-16 border-t border-border"
        >
            <h2 className="text-3xl font-bold text-center mb-12">Technologies You Will Learn</h2>
            <div className="flex justify-center">
                 <OrbitingCircles technologies={displayTechnologies} />
            </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default CourseDetail;

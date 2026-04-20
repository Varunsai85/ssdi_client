import { motion } from "framer-motion";
import { ArrowRight, Terminal, Database, Cloud } from "lucide-react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-primary/20 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-200 h-200 bg-purple-500/10 rounded-full blur-[100px] opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Admissions Open for 2026 Batch
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-purple-600 to-pink-500">
                SSD Technologies,
              </span>{" "}
              Career-Focused IT Training & Internships
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Unlock your potential with industry-leading IT courses. Master Full Stack, Data Science, and DevOps with expert mentorship, real-time projects and Internships.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/25 flex items-center gap-2"
              >
                Explore Courses <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Visual Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
             <div className="relative w-full aspect-square max-w-125 mx-auto">
                {/* Floating Cards */}
                <motion.div 
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="absolute top-0 right-10 p-6 rounded-2xl bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-white/20 shadow-2xl z-20"
                >
                    <Terminal className="w-10 h-10 text-blue-500 mb-2" />
                    <div className="h-2 w-24 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 w-16 bg-gray-200 rounded"></div>
                </motion.div>

                <motion.div 
                    animate={{ y: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-10 left-0 p-6 rounded-2xl bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-white/20 shadow-2xl z-20"
                >
                    <Database className="w-10 h-10 text-green-500 mb-2" />
                    <div className="h-2 w-24 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 w-16 bg-gray-200 rounded"></div>
                </motion.div>

                 <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 rounded-full bg-linear-to-br from-primary to-purple-600 shadow-2xl z-10 flex items-center justify-center"
                >
                    <Cloud className="w-16 h-16 text-white" />
                </motion.div>
                
                {/* Circle Decoration */}
                <div className="absolute inset-0 rounded-full border border-dashed border-gray-300 dark:border-gray-700 animate-[spin_60s_linear_infinite]" />
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

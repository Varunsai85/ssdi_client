import { useEffect } from "react";
import { useStore } from "../store/useStore";
import { motion } from "framer-motion";
import { Clock, BarChart, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { slugify } from "../lib/utils";

const CoursesSection = ({ setProgress }: { setProgress: (progress: number) => void }) => {
    const { courses, fetchCourses, isLoading } = useStore();

    useEffect(() => {
        setProgress(30);
        fetchCourses().then(() => setProgress(100));
    }, [fetchCourses, setProgress]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

  return (
    <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Popular <span className="text-primary">Courses</span></h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Choose from our wide range of industry-oriented courses designed to help you master the latest technologies.
                </p>
            </div>
            
            {isLoading ? (
                <div className="flex flex-wrap justify-center gap-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-96 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-sm" />
                    ))}
                </div>
            ) : (
                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-8"
                >
                    {courses.map((course) => (
                        <motion.div 
                            key={course.id}
                            variants={item}
                            className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-sm"
                        >
                            <div className="aspect-video overflow-hidden">
                                <img 
                                    src={course.imageUrl} 
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground mb-3">
                                    <span className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md">
                                        <Clock className="w-3 h-3" /> {course.duration}
                                    </span>
                                    <span className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md">
                                        <BarChart className="w-3 h-3" /> {course.level}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                    {course.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                                    {course.description}
                                </p>
                                <Link 
                                    to={`/courses/${slugify(course.title)}`}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                                >
                                    View Syllabus <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
            
            <div className="mt-12 text-center">
                 <Link
                    to="/courses"
                    className="px-8 py-3 rounded-full border border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-all"
                >
                    View All Courses
                </Link>
            </div>
        </div>
    </section>
  );
};

export default CoursesSection;

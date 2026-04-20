import { motion } from "framer-motion";
import { Award, Users, MonitorPlay, Briefcase } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Industry Expert Trainers",
    description: "Learn from veterans with 10+ years of experience in top MNCs.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: MonitorPlay,
    title: "Real-time Projects",
    description: "Work on live projects to gain hands-on experience and build your portfolio.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Briefcase,
    title: "100% Placement Support",
    description: "Dedicated placement cell to help you land your dream job.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Users,
    title: "Lifetime Access",
    description: "Get lifetime access to course materials and recorded sessions.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-600">SSD Technologies?</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We don't just teach technology; we shape careers. Here is what makes us the best choice for your IT journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

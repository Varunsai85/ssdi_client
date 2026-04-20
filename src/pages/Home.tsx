import Hero from "../components/Hero";
import CoursesSection from "./CoursesSection";
import FeaturesSection from "./FeaturesSection";

function Home({ setProgress }: { setProgress: (progress: number) => void }) {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero />
      <CoursesSection setProgress={setProgress} />
      <FeaturesSection />
    </main>
  );
}

export default Home;

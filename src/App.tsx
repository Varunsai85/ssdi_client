import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CoursesSection from './pages/CoursesSection';
import FeaturesSection from './pages/FeaturesSection';
import CourseDetail from './pages/CourseDetail';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';

function App() {
  const [progress, setProgress] = useState(0);
  return (
    <div className="flex flex-col min-h-screen">
      <LoadingBar
        color="#3B82F6" // Primary Blue color to match theme
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path='/' element={<Home setProgress={setProgress} />} />
          <Route path='about' element={<FeaturesSection />} />
          <Route path='courses' element={<CoursesSection setProgress={setProgress} />} />
          <Route path='courses/:slug' element={<CourseDetail setProgress={setProgress} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

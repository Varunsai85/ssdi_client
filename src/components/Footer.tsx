import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router";
import XIcon from "./ui/XIcon";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { slugify } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { FacebookIcon, LinkedInIcon } from "./ui/icons";

const Footer = () => {
  const { courses, fetchCourses, isLoading } = useStore();
  
      useEffect(() => {
          fetchCourses();
      }, [fetchCourses]);
  
    const quickLinks = [
      {
        title:"Home",
        url:"/"
      },
      {
        title:"Courses",
        url:"/courses"
      },
      {
        title:"About Us",
        url:"/about"
      },
      {
        title:"Contact",
        url:"/contact"
      },
      {
        title:"Blog",
        url:"/blog"
      }
    ]

    const socialMediaAccs=[
      {
        url:"#",
        icon:FacebookIcon
      },
      
      {
        url:"https://x.com/ssditech",
        icon:XIcon
      },
      
      {
        url:"https://www.instagram.com/ssd__technologies",
        icon:Instagram
      },
      
      {
        url:"https://www.linkedin.com/company/ssd-technlogies/",
        icon:LinkedInIcon
      },
      
    ]
  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src="favicon.ico" className="w-10" alt="ssd technologies logo" />
              <span className="text-xl font-bold">SSD Technologies</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Empowering the next generation of IT professionals with industry-leading training and mentorship.
            </p>
            <div className="flex gap-4">
              {socialMediaAccs.map((items, index) => (
                <a
                  key={index}
                  href={items.url}
                  target="_blank"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-background border border-border hover:border-primary/50 hover:text-primary transition-colors"
                >
                  <items.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {quickLinks.map((item,idx) => (
                <li key={idx}>
                  <Link to={item.url} 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}className="hover:text-primary transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Courses */}
           <div>
            <h3 className="font-semibold mb-4">Popular Courses</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {isLoading ? (
                <div className="flex flex-wrap justify-between gap-2">
                    {[1, 2, 3, 4, 5].map((idx) => (
                        <Skeleton key={idx} className="h-4 w-3/4" />
                    ))}
                </div>
            ) : (courses.map((course) => (
                <li key={course.id}>
                   <Link to={`/courses/${slugify(course.title)}`} 
                   onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}className="hover:text-primary transition-colors">
                    {course.title}
                  </Link>
                </li>
              )))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>10th Floor, Vasavi MPM Grand, Ameerpet, Hyderabad, Telangana 500016</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:careers@ssdtech.in" className="hover:text-primary">careers@ssdtech.in</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+919963063195" className="hover:text-primary">+91 99630 63195</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-2 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SSD Technologies. All rights reserved.</p>
          {/* <div className="flex gap-6">
            <Link to="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="#" className="hover:text-foreground">Terms of Service</Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

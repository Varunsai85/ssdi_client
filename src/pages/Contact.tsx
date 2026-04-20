import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from "lucide-react";

import { useStore } from "../store/useStore";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
}

const Contact = ({ setProgress }: { setProgress: (progress: number) => void }) => {
  const { registerUser } = useStore();
  
  useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Validation rules (used for both live check & submit)
  const nameRegex = /^[a-zA-Z\s'-]+$/; // no special chars
  // Stricter email: local@domain.tld where tld is 2+ alpha chars
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^(?:\+91[ -]?|0)?[6-9]\d{9}$/;

  // --- Email domain typo detection ---
  const KNOWN_DOMAINS = [
    "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com",
    "icloud.com", "me.com", "rediffmail.com", "ymail.com", "protonmail.com",
    "zoho.com", "aol.com", "msn.com", "googlemail.com", "yahoo.in",
  ];

  const levenshtein = (a: string, b: string): number => {
    const dp: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
      Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++)
        dp[i][j] = a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    return dp[a.length][b.length];
  };

  // Returns "Did you mean @gmail.com?" string if domain looks like a typo, else null
  const suggestEmailDomain = (email: string): string | null => {
    const atIdx = email.lastIndexOf("@");
    if (atIdx === -1) return null;
    const domain = email.slice(atIdx + 1).toLowerCase();
    if (KNOWN_DOMAINS.includes(domain)) return null; // exact match, all good
    let bestDomain = "";
    let bestDist = Infinity;
    for (const known of KNOWN_DOMAINS) {
      const dist = levenshtein(domain, known);
      if (dist < bestDist) { bestDist = dist; bestDomain = known; }
    }
    // Flag as typo if within edit-distance 2
    return bestDist <= 2 ? `Did you mean @${bestDomain}?` : null;
  };

  // Derived: are all fields currently valid? (for disabling the button)
  const isFormValid =
    formData.firstName.trim().length >= 3 &&
    nameRegex.test(formData.firstName.trim()) &&
    formData.lastName.trim().length >= 3 &&
    nameRegex.test(formData.lastName.trim()) &&
    emailRegex.test(formData.email.trim()) &&
    suggestEmailDomain(formData.email.trim()) === null &&
    mobileRegex.test(formData.mobileNumber.trim());

  // Validation Logic (runs on submit, sets error messages)
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // First Name: min 3 chars, no special characters
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else if (formData.firstName.trim().length < 3) {
      newErrors.firstName = "First name must be at least 3 characters";
      isValid = false;
    } else if (!nameRegex.test(formData.firstName.trim())) {
      newErrors.firstName = "First name must not contain special characters";
      isValid = false;
    }

    // Last Name: min 3 chars, no special characters
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else if (formData.lastName.trim().length < 3) {
      newErrors.lastName = "Last name must be at least 3 characters";
      isValid = false;
    } else if (!nameRegex.test(formData.lastName.trim())) {
      newErrors.lastName = "Last name must not contain special characters";
      isValid = false;
    }

    // Email: strict regex + domain typo check
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    } else {
      const suggestion = suggestEmailDomain(formData.email.trim());
      if (suggestion) {
        newErrors.email = suggestion;
        isValid = false;
      }
    }

    // Mobile Number: Indian Mobile Number Pattern
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
      isValid = false;
    } else if (!mobileRegex.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = "Invalid Indian Mobile Number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Validate a single field, returns error string or undefined
  const validateField = (name: string, value: string): string | undefined => {
    const v = value.trim();
    if (name === "firstName" || name === "lastName") {
      const label = name === "firstName" ? "First" : "Last";
      if (!v) return `${label} name is required`;
      if (v.length < 3) return `${label} name must be at least 3 characters`;
      if (!nameRegex.test(v)) return `${label} name must not contain special characters`;
    }
    if (name === "email") {
      if (!v) return "Email is required";
      if (!emailRegex.test(v)) return "Please enter a valid email address";
      const suggestion = suggestEmailDomain(v);
      if (suggestion) return suggestion;
    }
    if (name === "mobileNumber") {
      if (!v) return "Mobile number is required";
      if (!mobileRegex.test(v)) return "Invalid Mobile Number";
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // If field already has an error (was touched), re-validate live so error clears as soon as valid
    if (errors[name as keyof FormErrors] !== undefined) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
    if (submitError) setSubmitError(null);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        await registerUser(formData);
        setIsSuccess(true);
        // Reset form after success
        setFormData({ firstName: "", lastName: "", email: "", mobileNumber: "" });
        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } catch (error) {
        console.error("Registration failed", error);
        setSubmitError("Something went wrong. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="grid lg:grid-cols-2 gap-16"
        >
          {/* Left Column: Institute Highlights */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Get in Touch with SSD Technologies
            </h1>
            <p className="text-xl text-muted-foreground mb-12 ">
              Start your journey towards a successful IT career. We are here to answer your questions and guide you to the right path.
            </p>

            <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                        <p className="text-muted-foreground">10th Floor, Vasavi MPM Grand, Ameerpet,<br/>Hyderabad, Telangana 500016</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <Phone className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                        <p className="text-muted-foreground">+91 99630 63195</p>
                        <p className="text-sm text-muted-foreground mt-1">Mon-Sat, 9am - 6pm</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                        <p className="text-muted-foreground">careers@ssdtech.in</p>
                    </div>
                </div>
            </div>

             {/* Stats or Highlight Card */}
             <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Why Contact Us?</h3>
                <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Free Career Counseling</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Course Demo Scheduling</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Placement Assistance Queries</li>
                </ul>
             </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden">
             {/* Decorative gradient blob */}
             <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

             <h2 className="text-2xl font-bold mb-2">Student Registration</h2>
             <p className="text-muted-foreground mb-8">Fill in your details and we will get back to you.</p>

             {submitError && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 text-red-500 text-sm">
                    {submitError}
                </div>
             )}

             {isSuccess ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500/10 border border-green-500/50 rounded-xl p-6 text-center"
                >
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-green-500 mb-2">Success!</h3>
                    <p className="text-muted-foreground">Your request has been submitted successfully. We will contact you shortly.</p>
                </motion.div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'} bg-background focus:outline-none focus:ring-2 transition-all`}
                                placeholder="John"
                            />
                            {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'} bg-background focus:outline-none focus:ring-2 transition-all`}
                                placeholder="Doe"
                            />
                            {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'} bg-background focus:outline-none focus:ring-2 transition-all`}
                            placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="mobileNumber" className="text-sm font-medium">Mobile Number</label>
                        <input
                            type="tel"
                            id="mobileNumber"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.mobileNumber ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'} bg-background focus:outline-none focus:ring-2 transition-all`}
                            placeholder="+91 9876543210"
                        />
                        {errors.mobileNumber && <p className="text-xs text-red-500">{errors.mobileNumber}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !isFormValid}
                        className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                            </>
                        ) : (
                            <>
                                Submit Request <Send className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>
             )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

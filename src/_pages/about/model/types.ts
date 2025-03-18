export type Locale = "ko" | "en" | "jp";

export type Profile = {
  name: string;
  job: string;
  location: string;
  link: {
    name: string;
    href: string;
    icon: React.ElementType;
  }[];
  introduction: string[];
  education: {
    institution: string;
    degree: string;
    period: string;
  }[];
  experience: {
    title: string;
    role: string;
    period: string;
    responsibilities: string[];
  }[];
  copied: string;
};

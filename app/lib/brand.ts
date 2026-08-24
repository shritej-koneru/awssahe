export interface BrandIdentity {
  name: string;
  shortName: string;
  institution: string;
  location: string;
  taglines: {
    hero: string;
    mission: string;
    operational: string;
    caption: string;
  };
  social: {
    meetup: string;
    instagram: string;
    linkedin: string;
  };
  colors: {
    bg: string;
    elevated: string;
    purple: string;
    purpleGlow: string;
    cardDark: string;
    cardLight: string;
    fg: string;
  };
  departments: Array<{
    title: string;
    desc: string;
  }>;
}

export const brandData: BrandIdentity = {
  name: "AWS Student Builders Group",
  shortName: "AWS SAHE",
  institution: "Siddhartha Academy of Higher Education",
  location: "Vijayawada, Andhra Pradesh, India",
  taglines: {
    hero: "BUILD BEYOND",
    mission: "Building the future, one cloud at a time.",
    operational:
      "A student-led cloud computing community at Siddhartha Academy of Higher Education, Vijayawada.",
    caption: "Empowering peers to build, deploy and scale the future with AWS.",
  },
  social: {
    meetup:
      "https://www.meetup.com/aws-sbg-at-velagapudi-ramakrishna-siddhartha-engineering-col/",
    instagram: "https://www.instagram.com/awsstudentbuilders_sahe/",
    linkedin:
      "https://www.linkedin.com/company/aws-sahe/posts/?feedView=all",
  },
  colors: {
    bg: "#000000",
    elevated: "#0b0b0b",
    purple: "#a855f7",
    purpleGlow: "rgba(168,85,247,0.4)",
    cardDark: "rgba(13,8,24,0.85)",
    cardLight: "#f5f5f5",
    fg: "#ffffff",
  },
  departments: [
    {
      title: "Technical & Cloud",
      desc: "AWS architecture, serverless, containers, and cloud-native deployments.",
    },
    {
      title: "Web Designing",
      desc: "Modern, responsive interfaces with a focus on user experience and performance.",
    },
    {
      title: "Marketing",
      desc: "Campaigns, social media, and community outreach that amplifies our reach.",
    },
    {
      title: "Content Creation",
      desc: "Technical blogs, tutorials, and visual content that educates and inspires.",
    },
  ],
};

export const BRAND = brandData;

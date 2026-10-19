export type EventStatus = "upcoming" | "ongoing" | "completed";

export interface AgendaItem {
  time: string;
  title: string;
  desc: string;
}

export interface EventSession {
  date: string;
  time: string;
  venue: string;
  classes: string;
}

export type SpeakerLinkIcon = "website" | "linkedin" | "instagram";

export interface SpeakerLink {
  label: string;
  href: string;
  icon: SpeakerLinkIcon;
}

export interface EventSpeaker {
  name: string;
  tagline: string;
  bio: string[];
  credentials: string[];
  links: SpeakerLink[];
}

export interface ClubEvent {
  id: string;
  title: string;
  tagline: string;
  status: EventStatus;
  category: string;
  date: string;
  time: string;
  venue: string;
  mode: "Online" | "In-Person" | "Hybrid";
  eligibility: string;
  registrationDeadline: string;
  seats: string;
  fee: string;
  description: string[];
  agenda: AgendaItem[];
  takeaways: string[];
  prerequisites: string[];
  skills: string[];
  organizer: string;
  sessions?: EventSession[];
  speaker?: EventSpeaker;
}

export const events: ClubEvent[] = [
  {
    id: "aws-cloudx-workshop",
    title: "AWS CloudX Workshop",
    tagline:
      "A multi-day hands-on workshop on AWS Cloud for III B.Tech students, covering cloud fundamentals, Lambda, S3, and more.",
    status: "completed",
    category: "Workshop",
    date: "August 20 – 29, 2026",
    time: "9:00 AM – 4:30 PM",
    venue: "CSE Seminar Hall-1 & Central Auditorium",
    mode: "In-Person",
    eligibility:
      "Mandatory for III B.Tech students of CSE-A, CSE-B, CSE-C, CSE-D, CSE-E, AI&DS-A, AI&DS-B & AI&ML. As per directions of the HOD Sir.",
    registrationDeadline: "August 19, 2026",
    seats: "—",
    fee: "Free",
    description: [
      "As per the directions of the HOD Sir, the AWS CloudX workshop is being conducted for the III B.Tech students. This multi-day workshop covers hands-on sessions on AWS cloud services including compute, storage, databases, and serverless architectures.",
      "All concerned faculty members are requested to suspend regular class work for the respective students during the above sessions.",
    ],
    sessions: [
      {
        date: "20th – 21st August 2026 (Thursday & Friday)",
        time: "9:00 AM – 4:30 PM",
        venue: "CSE Seminar Hall-1",
        classes: "CSE-A, CSE-B & AI&DS-B",
      },
      {
        date: "22nd August 2026 (Saturday)",
        time: "9:00 AM – 1:00 PM",
        venue: "Central Auditorium",
        classes: "CSE-C, CSE-D, CSE-E, AI&DS-A & AI&ML",
      },
      {
        date: "28th August 2026 (Friday)",
        time: "9:00 AM – 4:30 PM",
        venue: "CSE Seminar Hall-1",
        classes: "CSE-C, CSE-D & CSE-E",
      },
      {
        date: "29th August 2026 (Saturday)",
        time: "9:00 AM – 4:30 PM",
        venue: "CSE Seminar Hall-1",
        classes: "AI&DS-A & AI&ML",
      },
    ],
    agenda: [
      {
        time: "Day 1",
        title: "Cloud Fundamentals & AWS Console",
        desc: "Introduction to cloud computing, AWS console walkthrough, IAM setup, and free-tier overview.",
      },
      {
        time: "Day 2",
        title: "Compute & Storage",
        desc: "Hands-on with EC2, S3, and managing instances and buckets from the console.",
      },
      {
        time: "Day 3",
        title: "Databases & Networking",
        desc: "Working with DynamoDB, RDS basics, VPC concepts, and security groups.",
      },
      {
        time: "Day 4",
        title: "Serverless & Deployment",
        desc: "Building with Lambda, API Gateway, and deploying a simple serverless application.",
      },
    ],
    takeaways: [
      "Hands-on experience with AWS core services",
      "Working knowledge of EC2, S3, Lambda, and DynamoDB",
      "Certificate of participation",
      "Confidence to build on AWS independently",
    ],
    prerequisites: [
      "III B.Tech students (CSE / AI&DS / AI&ML branches)",
      "A laptop — mandatory for all participants",
    ],
    skills: ["AWS EC2", "S3", "Lambda", "DynamoDB", "IAM", "API Gateway"],
    organizer: "AWS Student Builders Group, SAHE",
    speaker: {
      name: "Vishnu Rachapudi",
      tagline: "From Java to Cloud · 24× Certified",
      bio: [
        "Vishnu Rachapudi is a 24× certified cloud professional and holds the prestigious AWS Golden Jacket (14×), alongside certifications from HashiCorp, CNCF, Oracle, NVIDIA, Anthropic, and Azure.",
        "An AWS Community Builder, he is a sought-after speaker at AWS Summit, AWS Community Days, and GITEX Global, where he shares his journey from Java development to the cloud with student and professional audiences worldwide.",
      ],
      credentials: [
        "AWS Golden Jacket (14×)",
        "24× Certified",
        "HashiCorp",
        "CNCF",
        "Oracle",
        "NVIDIA",
        "Anthropic",
        "Azure",
        "AWS Community Builder",
        "Speaker — AWS Summit",
        "Speaker — AWS Community Days",
        "Speaker — GITEX Global",
      ],
      links: [
        { label: "Website", href: "https://www.vishnurachapudi.com/", icon: "website" },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/vishnu-rachapudi-28956920b",
          icon: "linkedin",
        },
        {
          label: "Instagram",
          href: "https://www.instagram.com/vishnurachapudi",
          icon: "instagram",
        },
      ],
    },
  },
];

export function getEventById(id: string): ClubEvent | undefined {
  return events.find((event) => event.id === id);
}

export function getUpcomingEvents(): ClubEvent[] {
  return events.filter((event) => event.status === "upcoming" || event.status === "ongoing");
}

export function getCompletedEvents(): ClubEvent[] {
  return events.filter((event) => event.status === "completed");
}

export function getEventIds(): string[] {
  return events.map((event) => event.id);
}

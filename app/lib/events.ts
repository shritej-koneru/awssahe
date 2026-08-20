export type EventStatus = "upcoming" | "completed";

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
}

export const events: ClubEvent[] = [
  {
    id: "aws-cloudx-workshop",
    title: "AWS CloudX Workshop",
    tagline:
      "A multi-day hands-on workshop on AWS Cloud for III B.Tech students, covering cloud fundamentals, Lambda, S3, and more.",
    status: "upcoming",
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
  },
];

export function getEventById(id: string): ClubEvent | undefined {
  return events.find((event) => event.id === id);
}

export function getUpcomingEvents(): ClubEvent[] {
  return events.filter((event) => event.status === "upcoming");
}

export function getCompletedEvents(): ClubEvent[] {
  return events.filter((event) => event.status === "completed");
}

export function getEventIds(): string[] {
  return events.map((event) => event.id);
}

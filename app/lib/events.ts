export type EventStatus = "upcoming" | "completed";

export interface AgendaItem {
  time: string;
  title: string;
  desc: string;
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
}

export const events: ClubEvent[] = [
  {
    id: "aws-cloud-bootcamp",
    title: "AWS Cloud Bootcamp",
    tagline:
      "Go from zero to a live serverless application in a single day — build an API, host a site, and ship it to the world.",
    status: "upcoming",
    category: "Workshop",
    date: "Saturday, August 22, 2026",
    time: "9:00 AM – 4:30 PM",
    venue: "VL Block CSE Seminar Hall - 1",
    mode: "Hybrid",
    eligibility:
      "Open to every student at SAHE — all years, all branches. No prior AWS or cloud experience needed. Bring your laptop and your curiosity.",
    registrationDeadline: "August 20, 2026",
    seats: "120",
    fee: "Free",
    description: [
      "The AWS Cloud Bootcamp is our flagship hands-on workshop of the semester. Over a full day you will design, build, and deploy a real serverless application on AWS — not in a slide deck, but in your own browser terminal.",
      "By the end of the day you will have a working REST API powered by Lambda and DynamoDB, a static website served from S3 through CloudFront, and the confidence to keep building on your own. Mentors from the club will be on the floor all day to unblock you.",
    ],
    agenda: [
      {
        time: "9:00 – 9:30",
        title: "Kickoff & Cloud 101",
        desc: "Welcome note, what the cloud actually is, and why AWS powers half of the internet.",
      },
      {
        time: "9:30 – 10:30",
        title: "Setup Sprint",
        desc: "Create your free AWS account, install the CLI, and configure IAM users the safe way.",
      },
      {
        time: "10:30 – 12:00",
        title: "Build: Serverless API",
        desc: "Ship a REST API with Lambda + API Gateway backed by DynamoDB, all from the console.",
      },
      {
        time: "12:00 – 1:00",
        title: "Lunch & Networking",
        desc: "Lunch with the team — talk cloud, careers, and internships with the mentors.",
      },
      {
        time: "1:00 – 3:00",
        title: "Deploy: Static Site to S3",
        desc: "Host a portfolio on S3, front it with CloudFront, and wire up your custom domain.",
      },
      {
        time: "3:00 – 4:30",
        title: "Show & Tell + Certificates",
        desc: "Demo what you built, ask mentors anything, and grab your certificate of participation.",
      },
    ],
    takeaways: [
      "A deployed serverless API of your own",
      "A live static website running on AWS",
      "Working knowledge of IAM, Lambda, S3, and DynamoDB",
      "The full session recording and slide deck",
      "Certificate of participation from AWS Student Builders Group",
    ],
    prerequisites: [
      "A laptop — any operating system works",
      "An AWS account (we will help you set up a free tier on the spot)",
      "Enthusiasm to build, break, and rebuild",
    ],
    skills: ["AWS Lambda", "API Gateway", "DynamoDB", "S3", "IAM"],
    organizer: "AWS Student Builders Group, SAHE",
  },
  {
    id: "aws-discovery-session",
    title: "AWS Discovery Session",
    tagline:
      "An introduction to cloud computing and the AWS platform, made for students starting from absolute zero.",
    status: "completed",
    category: "Session",
    date: "Saturday, February 14, 2026",
    time: "10:00 AM – 1:00 PM",
    venue: "VL Block CSE Seminar Hall - 1",
    mode: "In-Person",
    eligibility:
      "Open to all students of SAHE. No prior experience required — perfect for first-years discovering the cloud for the first time.",
    registrationDeadline: "—",
    seats: "200",
    fee: "Free",
    description: [
      "The Discovery Session was our first big event of the semester — a 3-hour crash course on what the cloud is, why AWS dominates the industry, and how students can use free-tier services to learn without spending a rupee.",
      "We walked through live demos of EC2, S3, and the billing console, and ended with an open Q&A where first-years could ask mentors anything about getting started.",
    ],
    agenda: [
      {
        time: "10:00 – 10:30",
        title: "Welcome & Club Intro",
        desc: "Meet the core team and hear about the roadmap for the semester.",
      },
      {
        time: "10:30 – 12:00",
        title: "The Cloud in 90 Minutes",
        desc: "Live demos of EC2, S3, and free-tier billing explained in plain language.",
      },
      {
        time: "12:00 – 1:00",
        title: "Q&A with Mentors",
        desc: "Ask anything — careers, certifications, or where to start your cloud journey.",
      },
    ],
    takeaways: [
      "A clear mental model of how the cloud works",
      "A step-by-step free-tier roadmap to learn without spending",
      "The club's roadmap and how to get involved",
    ],
    prerequisites: ["None — this session was designed for complete beginners"],
    skills: ["Cloud Fundamentals", "EC2", "S3", "Billing"],
    organizer: "AWS Student Builders Group, SAHE",
  },
  {
    id: "lambda-serverless-workshop",
    title: "Serverless with AWS Lambda",
    tagline:
      "Write your first serverless function, trigger it with real events, and watch it scale automatically.",
    status: "completed",
    category: "Workshop",
    date: "Saturday, April 4, 2026",
    time: "9:30 AM – 3:30 PM",
    venue: "VL Block CSE Seminar Hall - 1",
    mode: "In-Person",
    eligibility:
      "Open to all SAHE students. Attendance at the AWS Discovery Session or basic familiarity with the AWS console was recommended.",
    registrationDeadline: "—",
    seats: "60",
    fee: "Free",
    description: [
      "In this hands-on workshop members wrote their very first serverless functions. We moved beyond theory: every participant deployed a Lambda function, wired it to real AWS events, and saw how the platform scales from one request to thousands with zero server management.",
      "The final open-build session turned the workshop into a mini hackathon, with members chaining Lambda to S3 to build tiny file-processing services.",
    ],
    agenda: [
      {
        time: "9:30 – 10:00",
        title: "Serverless in 30 Minutes",
        desc: "A fast recap of what serverless means and why teams love Lambda.",
      },
      {
        time: "10:00 – 11:30",
        title: "Your First Lambda",
        desc: "Write, deploy, and invoke a Lambda function from the console and the CLI.",
      },
      {
        time: "11:30 – 1:00",
        title: "Triggering with S3 Events",
        desc: "Auto-run functions whenever files land in a bucket.",
      },
      {
        time: "1:00 – 2:00",
        title: "Lunch",
        desc: "Break, food, and chats with the team.",
      },
      {
        time: "2:00 – 3:30",
        title: "Open Build: Mini Projects",
        desc: "A hands-on build session to turn what you learned into a tiny project.",
      },
    ],
    takeaways: [
      "A deployed Lambda function of your own",
      "Hands-on experience with event-driven architecture",
      "Code samples and notes from the full workshop",
    ],
    prerequisites: ["A laptop", "A laptop — prior attendance recommended but not required"],
    skills: ["AWS Lambda", "CloudWatch", "EventBridge", "S3"],
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

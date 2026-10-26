export interface Recognition {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  sourceTitle: string;
  sourceUrl?: string;
  image?: string;
  imageAlt?: string;
  featured: boolean;
  verified: boolean;
  evidence: string;
}
export const recognition: readonly Recognition[] = [
  {
    id: "rubyconf",
    image: "/images/recognition/rubyconf-kenya-2018.jpg",
    imageAlt: "Samuel speaking at the RubyConf Kenya conference in 2018.",
    title: "RubyConf Kenya",
    date: "2018-06-28",
    category: "Public Speaking / Developer Community",
    description:
      "An opportunity to share my journey in software development with a wider community of developers and technology professionals.",
    sourceTitle: "Conference reference · Yasuhiro Yoshida",
    sourceUrl: "https://twitter.com/yoppuyoppu/status/1012222722817122304",
    featured: true,
    verified: true,
    evidence:
      "User-supplied speaking history, corroborated by the embedded post and date in legacy index.html at 0fa3724. Authentic conference photograph supplied by the user.",
  },
  {
    id: "bitature",
    title: "Recognition by Patrick Bitature",
    date: "2018-04-26",
    category: "Public Recognition",
    description:
      "An early acknowledgment of my initiative in software development and independent technical learning.",
    sourceTitle: "Original acknowledgment · Patrick Bitature",
    sourceUrl: "https://twitter.com/patrickbitature/status/989348844579192838",
    featured: false,
    verified: true,
    evidence:
      "User-approved description, corroborated by the embedded acknowledgment and date in legacy index.html at 0fa3724.",
  },
  {
    id: "outbox",
    title: "Outbox Hub / Richard Zulu",
    date: "2018-01-26",
    category: "Developer Community / Recognition",
    description:
      "Recognition by Richard Zulu for participating in the Connect Kampala hackathon and Outbox Hub’s technical workshops at age 13.",
    sourceTitle: "Original post · Richard Zulu / Outbox Hub",
    sourceUrl: "https://x.com/richardzulu/status/956923823118483457",
    featured: false,
    verified: true,
    evidence:
      "User-supplied Richard Zulu post, verified through the official X embed. The post identifies Sam as a 13-year-old participant in the Connect Kampala hackathon and Outbox Hub technical workshops.",
  },
];
export const verifiedRecognition = recognition.filter((item) => item.verified);

export const communityPhotography = [
  {
    image: "/images/recognition/developer-community-session.jpg",
    alt: "Samuel attending a developer community session alongside other participants.",
    caption: "DEVELOPER COMMUNITY / SHARED IDEAS",
    width: 1200,
    height: 900,
  },
  {
    image: "/images/recognition/hands-on-coding-session.jpg",
    alt: "Samuel working on a laptop during a hands-on coding session.",
    caption: "HANDS-ON LEARNING / WORKING TOGETHER",
    width: 1200,
    height: 800,
  },
] as const;

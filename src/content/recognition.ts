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
      "User-supplied speaking history, corroborated by the embedded post and date in legacy index.html at 0fa3724. Original photograph not present.",
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
    id: "innovation-village",
    title: "Innovation Village / StartupDigest Africa",
    date: "2018-04-09",
    category: "Community Recognition / Media Coverage",
    description:
      "Featured for an early interest in technology, independent learning and software development.",
    sourceTitle: "Coverage reference · Innovation Village",
    sourceUrl: "https://twitter.com/InnovationVilla/status/983278463577739264",
    featured: false,
    verified: true,
    evidence:
      "Exact source URL and embedded text naming StartupDigest recovered from legacy index.html at 0fa3724. Original article URL not verified.",
  },
];
export const verifiedRecognition = recognition.filter((item) => item.verified);

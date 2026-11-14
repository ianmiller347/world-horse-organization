export type NewsLink = { text: string; href: string };

/** A paragraph is a run of plain text and links. */
export type NewsParagraph = (string | NewsLink)[];

export type NewsPost = {
  slug: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  title: string;
  summary: string;
  campaignHref?: string;
  body: NewsParagraph[];
  sources: NewsLink[];
};

/** Newest first. */
export const NEWS_POSTS: NewsPost[] = [
  {
    slug: 'mayor-mamdani-will-sign-romanchs-law',
    date: '2026-11-04',
    title: "Mayor Mamdani says he will sign Romanch's Law",
    summary:
      'After a public hearing where carriage drivers asked for a veto, the mayor told reporters he is signing the carriage phase-out.',
    campaignHref: '/free-the-horses',
    body: [
      [
        "Mayor Zohran Mamdani held a public hearing on Romanch's Law in City Hall's Blue Room on November 4. Carriage drivers asked him to veto it. Afterward he told reporters, \"I will be signing [the bill].\"",
      ],
      [
        'He also said the drivers "should not be demonized," that many are still in debt from buying their medallions, and that the city is committed to "a fair and just and real transition" for them. The day before, he visited the carriage stables in Hell\'s Kitchen to hear from workers directly.',
      ],
      [
        'The Transport Workers Union, which represents the drivers, has said it will file a federal lawsuit and seek a restraining order once the mayor signs. The city\'s Law Department says it is ready to defend the law.',
      ],
      [
        'For the horses, the next date that matters is June 1, 2027. By then every carriage horse owner has to certify that no horse will go to slaughter, to another carriage business, or to any inhumane purpose. ',
        { text: 'See the full timeline', href: '/free-the-horses#won' },
        '.',
      ],
    ],
    sources: [
      {
        text: 'NBC New York: Zohran Mamdani plans to sign NYC horse carriage ban',
        href: 'https://www.nbcnewyork.com/news/local/mamdani-plan-horse-carriage-ban-transition/6567728/',
      },
      {
        text: "amNewYork: Horse carriage workers beg Mamdani to veto industry ban bill, but mayor says he's still signing it",
        href: 'https://www.amny.com/news/horse-carriage-workers-mamdani-veto-industry-ban-bill/',
      },
    ],
  },
  {
    slug: 'council-passes-romanchs-law',
    date: '2026-10-22',
    title: "City Council passes Romanch's Law, 40–7",
    summary:
      'New York City votes to end horse-drawn carriages in Central Park by June 1, 2028, with protections for the horses and a transition program for drivers.',
    campaignHref: '/free-the-horses',
    body: [
      [
        "The New York City Council passed Romanch's Law 40–7 on October 22, a veto-proof majority. The law is named for Romanch Mahajan, an 18-year-old visitor who died in June after a carriage overturned in Central Park.",
      ],
      [
        'No new horse-drawn cab licenses are issued after May 31, 2028, and carriage operations end June 1, 2028. Carriage horses cannot be sold or transferred for slaughter, for another carriage business, or for any inhumane purpose.',
      ],
      [
        "The city has to build a workforce transition program for drivers, with a plan due April 1, 2027, and consider compensating them for their licenses, businesses, and equipment. Speaker Julie Menin is the first sitting Speaker to support a carriage ban. The Council first introduced one in 2007.",
      ],
    ],
    sources: [
      {
        text: "New York City Council: Speaker Menin and the Council pass Romanch's Law",
        href: 'https://council.nyc.gov/press/2026/10/22/3306/',
      },
      {
        text: 'The Chief: TWU vows lawsuit after Council votes to ban horse carriages',
        href: 'https://www.thechiefleader.com/stories/twu-wows-lawsuit-after-council-votes-to-ban-horse-carriages,57883',
      },
    ],
  },
  {
    slug: 'mayor-and-speaker-reach-carriage-deal',
    date: '2026-10-13',
    title: 'Mayor and Speaker reach a deal to end carriage rides',
    summary:
      'Mayor Mamdani backs the carriage phase-out after the bill adds stronger worker protections, setting up a full Council vote.',
    campaignHref: '/free-the-horses',
    body: [
      [
        "Mayor Zohran Mamdani agreed to back the carriage phase-out bill after Council Speaker Julie Menin and sponsor Christopher Marte strengthened its worker protections. Menin scheduled a full Council vote for October 22.",
      ],
    ],
    sources: [
      {
        text: 'Politico: Mamdani and Menin strike a deal to end the carriage industry',
        href: 'https://www.politico.com/news/2026/10/13/mamdani-menin-horse-drawn-carriages-nyc-01116617',
      },
      {
        text: 'CNN: Mamdani and the Council reach a deal to end carriage rides',
        href: 'https://www.cnn.com/2026/10/13/us/nyc-horse-carriage-ban',
      },
    ],
  },
];

export function getNewsPost(slug: string): NewsPost | undefined {
  return NEWS_POSTS.find((post) => post.slug === slug);
}

export function formatNewsDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

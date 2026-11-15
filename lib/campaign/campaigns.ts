export type CampaignStatus = 'won' | 'active' | 'researching';

export type Campaign = {
  name: string;
  href: string;
  location: string;
  status: CampaignStatus;
  summary: string;
};

export const CAMPAIGN_STATUS_LABELS: Record<CampaignStatus, string> = {
  won: 'Won',
  active: 'Active',
  researching: 'Researching',
};

export const CAMPAIGNS: Campaign[] = [
  {
    name: 'Free the Horses from Central Park',
    href: '/free-the-horses',
    location: 'New York City',
    status: 'won',
    summary:
      "End horse-drawn carriages in Central Park. The City Council passed Romanch's Law 40–7 and Mayor Mamdani says he's signing it. Carriages end June 1, 2028. Now the work is making sure every retired horse lands somewhere good.",
  },
];

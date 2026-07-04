/** Health Committee hearing on winding down NYC horse-drawn cabs. Update after July 15, 2026. */

export const HEALTH_COMMITTEE_HEARING = {
  dateLabel: 'Wednesday, July 15, 2026',
  timeLabel: '10:00 a.m.',
  dateTimeLabel: 'Wednesday, July 15, 2026, 10:00 a.m.',
  location: 'Council Chambers, New York City Hall',
  committee: 'Health Committee',
  chair: 'Council Member Lynn Schulman',
  subject:
    'legislation to begin winding down the horse-drawn cab industry in New York City',
  /** Shown on council.nyc.gov/testify — users must pick this hearing from the list. */
  testifySelectHint:
    'On the registration form, select the July 15, 2026 Health Committee hearing on winding down horse-drawn cabs.',
  confirmedBy: "Speaker Menin's office (July 2, 2026)",
} as const;

export const HEARING_TESTIFY_URL = 'https://council.nyc.gov/testify/';
export const HEARING_LIVESTREAM_URL = 'https://council.nyc.gov/livestream/';
export const HEARING_TESTIMONY_EMAIL = 'testimony@council.nyc.gov';

import {
  youtubeChannelLink,
  youtubeMoreLinkText,
} from 'src/utilities/emptyStateLandingUtils';

import type {
  ResourcesHeaders,
  ResourcesLinkSection,
  ResourcesLinks,
} from 'src/components/EmptyLandingPageResources/ResourcesLinksTypes';

export const headers: ResourcesHeaders = {
  description:
    'Add high availability, high peformance, geographical load balancing across all datacenters',
  subtitle: 'DNS-based global load balancing service',
  title: 'GlobalBalancers',
};

export const gettingStartedGuides: ResourcesLinkSection = {
  links: [
    {
      text: 'Getting Started with GlobalBalancers',
      to:
        'TODO',
    },
    {
      text: 'Create a GlobalBalancer',
      to:
        'TODO',
    },
    {
      text: 'Configuration Options for GlobalBalancers',
      to:
        'TODO',
    },
  ],
  moreInfo: {
    text: 'View additional GlobalBalancer documentation',
    to: 'TODO',
  },
  title: 'Getting Started Guides',
};

export const youtubeLinkData: ResourcesLinkSection = {
  links: [
    {
      external: true,
      text:
        'Getting Started With GlobalBalancers | How To Prepare For Global Load Balancing',
      to: 'https://www.youtube.com/watch?v=JlXgl_rtM_s',
    },
    {
      external: true,
      text:
        'Linode GlobalBalancers Explained | Manage Scale and Performance with Global Load Distribution',
      to: 'https://www.youtube.com/watch?v=U6xxgydIG9w',
    },
  ],
  moreInfo: {
    text: youtubeMoreLinkText,
    to: youtubeChannelLink,
  },
  title: 'Video Playlist',
};

export const linkAnalyticsEvent: ResourcesLinks['linkAnalyticsEvent'] = {
  action: 'Click:link',
  category: 'GlobalBalancers landing page empty',
};

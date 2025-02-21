import * as React from 'react';
import { useHistory } from 'react-router-dom';

import NetworkIcon from 'src/assets/icons/entityIcons/networking.svg';
import { DocumentTitleSegment } from 'src/components/DocumentTitle';
import { ResourcesSection } from 'src/components/EmptyLandingPageResources/ResourcesSection';
import { getRestrictedResourceText } from 'src/features/Account/utils';
import { useRestrictedGlobalGrantCheck } from 'src/hooks/useRestrictedGlobalGrantCheck';
import { sendEvent } from 'src/utilities/analytics/utils';

import {
  gettingStartedGuides,
  headers,
  linkAnalyticsEvent,
  youtubeLinkData,
} from './GlobalBalancersLandingEmptyStateData';

export const GlobalBalancerLandingEmptyState = () => {
  const { push } = useHistory();

  const isRestricted = useRestrictedGlobalGrantCheck({
    globalGrantType: 'add_nodebalancers',
  });

  return (
    <React.Fragment>
      <DocumentTitleSegment segment="GlobalBalancers" />
      <ResourcesSection
        buttonProps={[
          {
            children: 'Create GlobalBalancer',
            disabled: isRestricted,
            onClick: () => {
              sendEvent({
                action: 'Click:button',
                category: linkAnalyticsEvent.category,
                label: 'Create GlobalBalancer',
              });
              push('/globalbalancers/create');
            },
            tooltipText: getRestrictedResourceText({
              action: 'create',
              isSingular: false,
              resourceType: 'NodeBalancers',
            }),
          },
        ]}
        gettingStartedGuidesData={gettingStartedGuides}
        headers={headers}
        icon={NetworkIcon}
        linkAnalyticsEvent={linkAnalyticsEvent}
        youtubeLinkData={youtubeLinkData}
      />
    </React.Fragment>
  );
};

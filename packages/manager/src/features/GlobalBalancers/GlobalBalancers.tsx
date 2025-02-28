import { CircleProgress } from '@linode/ui';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ProductInformationBanner } from 'src/components/ProductInformationBanner/ProductInformationBanner';

const GlobalBalancerDetail = React.lazy(() =>
  import('../NodeBalancers/NodeBalancerDetail/NodeBalancerDetail').then((module) => ({
    default: module.NodeBalancerDetail,
  }))
);
const GlobalBalancersLanding = React.lazy(
  () => import('./GlobalBalancersLanding/GlobalBalancersLanding')
);
const GlobalBalancerCreate = React.lazy(() => import('./GlobalBalancerCreate'));

const GlobalBalancers = () => {
  return (
    <React.Suspense fallback={<CircleProgress />}>
      <ProductInformationBanner bannerLocation="NodeBalancers" />
      <Switch>
        <Route component={GlobalBalancersLanding} exact path="/globalbalancers" />
        <Route
          component={GlobalBalancerCreate}
          exact
          path="/globalbalancers/create"
        />
        <Route
          component={GlobalBalancerDetail}
          path="/globalbalancers/:globalBalancerId?/:tab?/:configId?"
        />
      </Switch>
    </React.Suspense>
  );
};

export default GlobalBalancers;

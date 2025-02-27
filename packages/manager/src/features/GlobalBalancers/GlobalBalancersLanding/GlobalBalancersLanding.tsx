import { CircleProgress } from '@linode/ui';
import { createLazyRoute } from '@tanstack/react-router';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { DocumentTitleSegment } from 'src/components/DocumentTitle';
import { ErrorState } from 'src/components/ErrorState/ErrorState';
import { LandingHeader } from 'src/components/LandingHeader';
import { PaginationFooter } from 'src/components/PaginationFooter/PaginationFooter';
import { Table } from 'src/components/Table';
import { TableBody } from 'src/components/TableBody';
import { TableCell } from 'src/components/TableCell';
import { TableHead } from 'src/components/TableHead';
import { TableRow } from 'src/components/TableRow';
import { TableSortCell } from 'src/components/TableSortCell/TableSortCell';
import { getRestrictedResourceText } from 'src/features/Account/utils';
import { useOrder } from 'src/hooks/useOrder';
import { usePagination } from 'src/hooks/usePagination';
import { useRestrictedGlobalGrantCheck } from 'src/hooks/useRestrictedGlobalGrantCheck';
import { useNodeBalancersQuery } from 'src/queries/nodebalancers';

import { NodeBalancerDeleteDialog } from '../../NodeBalancers/NodeBalancerDeleteDialog';
import { GlobalBalancerLandingEmptyState } from './GlobalBalancersLandingEmptyState';
import { GlobalBalancerTableRow } from './GlobalBalancerTableRow';
const preferenceKey = 'globalbalancers';

export const NodeBalancersLanding = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState<boolean>(
    false
  );
  const [
    selectedNodeBalancerId,
    setSelectedNodeBalancerId,
  ] = React.useState<number>(-1);

  const history = useHistory();
  const pagination = usePagination(1, preferenceKey);
  const isRestricted = useRestrictedGlobalGrantCheck({
    globalGrantType: 'add_nodebalancers',
  });

  const { handleOrderChange, order, orderBy } = useOrder(
    {
      order: 'asc',
      orderBy: 'label',
    },
    preferenceKey
  );

  const filter = {
    ['+order']: order,
    ['+order_by']: orderBy,
  };

  //return <GlobalBalancerLandingEmptyState />;

  const { data, error, isLoading } = useNodeBalancersQuery(
    {
      page: pagination.page,
      page_size: pagination.pageSize,
    },
    filter
  );

  const selectedNodeBalancer = data?.data.find(
    (nodebalancer) => nodebalancer.id === selectedNodeBalancerId
  );

  const onDelete = (nodeBalancerId: number) => {
    setSelectedNodeBalancerId(nodeBalancerId);
    setIsDeleteDialogOpen(true);
  };

  if (error) {
    return (
      <ErrorState
        errorText={error?.[0].reason ?? 'Unable to load your NodeBalancers'}
      />
    );
  }

  if (isLoading) {
    return <CircleProgress />;
  }

  if (data?.results === 0) {
    return <GlobalBalancerLandingEmptyState />;
  }

  return (
    <>
      <DocumentTitleSegment segment="GlobalBalancers" />
      <LandingHeader
        buttonDataAttrs={{
          tooltipText: getRestrictedResourceText({
            action: 'create',
            isSingular: false,
            resourceType: 'NodeBalancers',
          }),
        }}
        disabledCreateButton={isRestricted}
        docsLink="https://techdocs.akamai.com/cloud-computing/docs/getting-started-with-globalbalancers"
        entity="GlobalBalancer"
        onButtonClick={() => history.push('/globalbalancers/create')}
        title="GlobalBalancers"
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableSortCell
              active={orderBy === 'label'}
              direction={order}
              handleClick={handleOrderChange}
              label="label"
            >
              Label
            </TableSortCell>
            <TableCell>
              Status
            </TableCell>
            <TableCell>Domain Name</TableCell>
            <TableCell>
                Last Modified
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((nodebalancer) => (
            <GlobalBalancerTableRow
              key={nodebalancer.id}
              onDelete={() => onDelete(nodebalancer.id)}
              {...nodebalancer}
            />
          ))}
        </TableBody>
      </Table>
      <PaginationFooter
        count={data?.results ?? 0}
        eventCategory="GlobalBalancers Table"
        handlePageChange={pagination.handlePageChange}
        handleSizeChange={pagination.handlePageSizeChange}
        page={pagination.page}
        pageSize={pagination.pageSize}
      />
      <NodeBalancerDeleteDialog
        id={selectedNodeBalancerId}
        label={selectedNodeBalancer?.label ?? ''}
        onClose={() => setIsDeleteDialogOpen(false)}
        open={isDeleteDialogOpen}
      />
    </>
  );
};

export const nodeBalancersLandingLazyRoute = createLazyRoute('/nodebalancers')({
  component: NodeBalancersLanding,
});

export default NodeBalancersLanding;

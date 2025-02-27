import * as React from 'react';

import { Link } from 'src/components/Link';
import { TableCell } from 'src/components/TableCell';
import { TableRow } from 'src/components/TableRow';
import { StatusIcon } from 'src/components/StatusIcon/StatusIcon';
import { DateTimeDisplay } from 'src/components/DateTimeDisplay';

import { NodeBalancerActionMenu } from '../../NodeBalancers/NodeBalancersLanding/NodeBalancerActionMenu';

import type { NodeBalancer } from '@linode/api-v4/lib/nodebalancers';

interface Props extends NodeBalancer {
  onDelete: () => void;
}

export const GlobalBalancerTableRow = (props: Props) => {
  const { id, label, onDelete } = props;

  return (
    <TableRow key={id}>
      <TableCell>
        <Link tabIndex={0} to={`/nodebalancers/${id}`}>
          demo-global-balancer
        </Link>
      </TableCell>
      <TableCell statusCell>
        <StatusIcon status='active' />
        Active
      </TableCell>
      <TableCell noWrap>
        demo.astoler-gtm-linode.akadns.net
      </TableCell>
      <TableCell>
        2025-02-27 15:48
      </TableCell>
      <TableCell actionCell>
        <NodeBalancerActionMenu
          label={label}
          nodeBalancerId={id}
          toggleDialog={onDelete}
        />
      </TableCell>
    </TableRow>
  );
};

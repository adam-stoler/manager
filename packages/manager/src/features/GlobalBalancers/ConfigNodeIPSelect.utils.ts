import { isPrivateIP } from 'src/utilities/ipUtils';

import type { Linode, NodeBalancer } from '@linode/api-v4';

interface PublicIPOption {
  /**
   * A private IPv4 address
   */
  label: string;
  /**
   * The Linode associated with the private IPv4 address
   */
  linode: Linode | NodeBalancer;
}

/**
 * Given an array of Linodes, this function returns an array of private
 * IPv4 options intended to be used in a Select component.
 */
export const getPublicIPOptions = (linodes: Linode[] | undefined, nodebalancers: NodeBalancer[] | undefined) => {
  if (!linodes && !nodebalancers) {
    return [];
  }

  const options: PublicIPOption[] = [];

  if (linodes) {
    for (const linode of linodes) {
      for (const ip of linode.ipv4) {
        if (!isPrivateIP(ip)) {
          options.push({ label: ip, linode: linode });
        }
      }
    }
  }

  if (nodebalancers) {
    for (const nodebalancer of nodebalancers) {
      const ip = nodebalancer.ipv4;
      if (!isPrivateIP(ip)) {
        options.push({ label: ip, linode: nodebalancer });
      }
    }
  }

  return options;
};

import { SetApprovalForAllCallParams, IsApprovedForAllQueryParams } from './types';
import makeContract from './makeContract';

export function setApprovalForAll(params: SetApprovalForAllCallParams): Promise<void> {
  const { provider, asset, toAddress } = params;

  let contract = makeContract(provider, asset.assetAddress);
  contract = contract.connect(provider.getSigner());

  return contract.setApprovalForAll(toAddress, true);
}

export async function isApprovedForAll(params: IsApprovedForAllQueryParams): Promise<boolean> {
  const { provider, spenderAddress, holderAddress, assetAddress } = params;
  const contract = makeContract(provider, assetAddress);
  return contract.isApprovedForAll(holderAddress, spenderAddress);
}

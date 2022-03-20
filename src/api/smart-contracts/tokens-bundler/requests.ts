import makeContract from './makeContract';
import { WrapTokensCallParams, ContractParams, UnwrapTokensCallParams } from './types';

export async function wrapTokens(
  params: WrapTokensCallParams,
  contractParams: ContractParams = {},
): Promise<void> {
  const { provider, assets } = params;

  let contract = makeContract(provider, contractParams);
  contract = contract.connect(provider.getSigner());

  return contract.create(assets);
}

export async function unwrapTokens(
  params: UnwrapTokensCallParams,
  contractParams: ContractParams = {},
): Promise<void> {
  const { provider, tokenId } = params;

  let contract = makeContract(provider, contractParams);
  contract = contract.connect(provider.getSigner());

  return contract.unwrap(tokenId);
}

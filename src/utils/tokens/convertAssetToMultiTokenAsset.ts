import { MultiTokenAsset, MultiTokenAssetCategory } from '@/api/smart-contracts';
import { Asset } from '@/api/open-sea';

export function convertAssetToMultiTokenAsset(asset: Asset, amount: string): MultiTokenAsset {
  return {
    id: asset.token_id,
    amount,
    assetAddress: asset.asset_contract.address,
    category: MultiTokenAssetCategory[asset.asset_contract.schema_name],
  };
}

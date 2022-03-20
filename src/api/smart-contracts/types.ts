export enum MultiTokenAssetCategory {
  ERC20,
  ERC721,
  ERC1155,
}

export interface MultiTokenAsset {
  id: string;
  amount: string;
  assetAddress: string;
  category: MultiTokenAssetCategory;
}

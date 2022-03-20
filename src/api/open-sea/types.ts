import { ChainId } from '@/types/app';

export interface HttpFactoryParams {
  chainId?: ChainId;
}

export enum AssetsOrderBy {
  SaleDate = 'sale_date',
  SaleCount = 'sale_count',
  SalePrice = 'sale_price',
}

export interface Asset {
  id: number;
  token_id: string;
  image_url: string;
  background_color: null | string;
  name: null | string;
  external_link: null | string;
  asset_contract: {
    address: string;
    name: string;
    symbol: string;
    schema_name: 'ERC20' | 'ERC721' | 'ERC1155';
  };
  owner: {
    address: string;
  };
}

export interface FetchAssetsParams {
  owner?: string;
  token_ids?: string[];
  asset_contract_address?: string;
  asset_contract_addresses?: string[];
  order_by?: AssetsOrderBy;
  order_direction?: 'asc' | 'desc';
  offset?: number;
  limit?: number;
  collection?: string;
}

export interface FetchAssetsResponse {
  next: null | string;
  previous: null | string;
  assets: Asset[];
}

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    networkVersion: string;
    chainId: string;
    selectedAddress: string | null;
    isConnected: () => boolean;
    request: (request: { method: string; params?: Array<any> }) => Promise<any>;
    on: (...args: any[]) => void;
    removeListener: (...args: any[]) => void;
  };
}

declare module '*.svg' {
  import Vue, { VueConstructor } from 'vue';
  const content: VueConstructor<Vue>;
  export default content;
}

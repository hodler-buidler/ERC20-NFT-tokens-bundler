import { createEventBus } from '@/logic/events/createEventBus';

export enum TokensBundlerEvents {
  ACTION_REQUESTED = 'ACTION_REQUESTED',
}

export interface TokensBundlerEventsMap {
  [TokensBundlerEvents.ACTION_REQUESTED]: null;
}

export const TokensBundlerEventBus = createEventBus<TokensBundlerEventsMap>();

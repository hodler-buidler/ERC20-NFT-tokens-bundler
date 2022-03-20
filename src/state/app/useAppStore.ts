import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { AppMessage } from '@/types/app';

export interface AppState {
  messages: Array<AppMessage & { uuid: string }>;
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    messages: [],
  }),
  actions: {
    showMessage(message: AppMessage) {
      this.messages.push({
        ...message,
        uuid: uuidv4(),
      });
    },

    removeMessage(message: AppMessage & { uuid: string }) {
      const messageIdx = this.messages.findIndex((msg) => msg.uuid === message.uuid);
      if (messageIdx > -1) this.messages.splice(messageIdx, 1);
    },
  },
});

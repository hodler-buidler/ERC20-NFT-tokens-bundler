import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { notification } from 'ant-design-vue';
import { useAppStore } from './useAppStore';

export function useAppMessages() {
  const appState = useAppStore();
  const { messages } = storeToRefs(appState);

  watch(
    messages,
    () => {
      messages.value.forEach((message) => {
        const copyMessage = { ...message };
        appState.removeMessage(message);

        notification[copyMessage.type]({
          message: message.title,
          description: message.description,
          placement: message.placement,
        });
      });
    },
    { deep: true },
  );
}

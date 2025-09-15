import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { UiState, UiStateKeys } from '~/types/stores/ui-store';

export const useUiStore = defineStore('ui', () => {
  const uiState = reactive<UiState>({
    isSearch: false,
    isLoginDialog: false,
    isRegisterDialog: false,
  });

  const setUiState = (key: UiStateKeys, value: boolean) => {
    if (key in uiState) {
      uiState[key] = value;
    } else {
      console.warn(`UI state "${key}" không tồn tại`);
    }
  };

  const getUiState = (key: UiStateKeys) => {
    return uiState[key] ?? false;
  };

  const toggleUiState = (key: UiStateKeys) => {
    if (key in uiState) {
      uiState[key] = !uiState[key];
    }
  };

  return {
    uiState,
    setUiState,
    getUiState,
    toggleUiState,
  };
});
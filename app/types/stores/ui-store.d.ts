export type UiStateKeys = 'isSearch' | 'isLoginDialog' | 'isRegisterDialog';

export interface UiState {
  [key: string]: boolean;
  isSearch: boolean;
  isLoginDialog: boolean;
  isRegisterDialog: boolean;
}
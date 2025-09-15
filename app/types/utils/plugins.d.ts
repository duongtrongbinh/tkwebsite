import { Plugin } from '@nuxt/types';

declare module '@nuxt/types' {
  interface Context {
    $exportToExcelWidthColor: (tableId: string, filename?: string) => Promise<void>;
  }

  interface NuxtAppOptions {
    $exportToExcelWidthColor: (tableId: string, filename?: string) => Promise<void>;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $exportToExcelWidthColor: (tableId: string, filename?: string) => Promise<void>;
  }
}

declare const exportHtmlTableToExcel: Plugin;

export default exportHtmlTableToExcel;

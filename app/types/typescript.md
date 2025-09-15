## Overview

This document describes the TypeScript coding style used in the project.

## Table of Contents

1. [Rules](#rules)
2. [Define Types](#types)
3. [Folder Structure](#folder-structure)
5. [Imports](#imports)
6. [Intergation with Nuxt](#intergation-with-nuxt)

## Rules

- Use TypeScript for all new code.
- Use `any` only as a last resort.
- Use `unknown` instead of `any` when don't know the type of a value.
- Use `readonly` modifier for properties that should not be changed.
  ```typescript
      export interface Supplier = {
        readonly id: number,
        ...
    }
  ```

## Define Types

- Define related types in the same file.
- Use `type` keyword for defining types.
  ```typescript
    export type Option = {
      value: string | number | null;
      text: string;
    }
  ```
- Use `interface` keyword for defining the shape of an object.
  ```typescript
    export interface Supplier = {
        readonly id: number,
        ...
    }
  ```
- Use `enum` keyword for defining enums.
  ```typescript
    export enum Status {
      Active = 'active',
      Inactive = 'inactive',
    }
  ```

## Folder Structure

- Group related types in a single file.
- Use `types` folder for defining types.
- All models related should be in `types/models` folder.
- All enums should be in `types/enums` folder.
- Other types should be in `utils` folder.
- Use `types/index.ts` file to export all types from the project.
  ```typescript
    export * from './models/supplier';
    export * from './enums/status';
    export * from './utils/selection';
  ```

## Imports

- Use absolute imports for all files.
- All __types__ should be imported from `types/index.ts`.
  ```typescript
    import { Supplier } from '~/types';
  ```
- Use `import type` for importing types.
  ```typescript
    import type { Supplier } from '~/types';
  ```

## Intergation with Nuxt

- Add `lang="ts"` to the script tag in `.vue` files.
  ```html
    <script lang="ts">
  ```
- Use `defineComponent` for defining components.
  ```typescript
    import { defineComponent } from 'vue';

    export default defineComponent({
      ...
    });
  ```

- Use __Arrow Functions__ instead of __Function Declarations__ for `data` to to avoid problems related to the `this` keyword.
  ```typescript
    // Bad
    export default defineComponent({
        data () {
          ...
        },
      });

    // Good
    export default defineComponent({
      data: () => ({
        ...
      }),
    });
  ```

- Do not use `$route.params` directly in the component. Instead, use `computed` property to defind __type__ for __param__.
  ```typescript
    // Bad
    export default defineComponent({
      methods: {
        fetchSupplier() {
          const response = await this.GET<Supplier>(`/supplier/${this.$route.params.id}`)
          ...
        },
      }
    });

    // Good
    export default defineComponent({
      computed: {
        id() {
          return Number(this.$route.params.id);
        },
      },
      methods: {
        fetchSupplier() {
          const response = await this.GET<Supplier>(`/supplier/${this.id}`)
          ...
        },
      }
    });
  ```

- All `methods`, `computed` defined in `mixins/common.ts` (___plugin___) must be re-defined __type__ in `vue-shim.d.ts`

- Use `v-slot:slotName="{ option }"` instead of `slot="slotName" slot-scope="{ option }"` in `<template>` tag
```html
   <!-- Bad -->
  <template slot="slotName" slot-scope="{ option }">
   <!-- use option prop -->
  </template>
  
  <!-- Good -->
  <template v-slot:slotName="{ option }">
    <!-- use option prop -->
  </template>
```

- Todo: Add more rules when needed.

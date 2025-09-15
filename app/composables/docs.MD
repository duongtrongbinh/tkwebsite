Composables trong Dự án Nuxt 3
1. Composables là gì?
Composables là các hàm tái sử dụng được viết bằng Composition API của Vue 3, đóng gói logic liên quan đến state, computed properties, hoặc side effects (như gọi API, quản lý dark mode, hoặc xử lý i18n). Trong Nuxt 3, composables tận dụng các tiện ích như useFetch, useAsyncData, useState, và useNuxtApp để truy cập context.
2. Nội dung của Composables
Composables chứa:

State Management: Sử dụng ref hoặc reactive để quản lý trạng thái (ví dụ: dữ liệu sản phẩm, trạng thái loading).
API Calls: Gọi services để lấy dữ liệu từ API.
Logic: Xử lý logic như chuyển đổi dark mode, đổi ngôn ngữ, hoặc thêm sản phẩm vào giỏ hàng.

Ví dụ cụ thể trong dự án:

useProduct.ts: Lấy chi tiết sản phẩm và sản phẩm liên quan từ productService.
useCart.ts: Thêm sản phẩm vào giỏ hàng thông qua cartService.
useColorModeToggle.ts: Chuyển đổi giữa dark/light mode.
useLanguageSwitcher.ts: Chuyển đổi ngôn ngữ và cập nhật URL.

3. Vị trí và cấu trúc

Thư mục: composables/
    Cấu trúc file:// composables/useProduct.ts
    import { ref } from 'vue';
    import { productService } from '~/services/productService';

    export const useProduct = (id: string) => {
      const product = ref<Product | null>(null);
      const loading = ref(false);

      const fetchProduct = async () => {
        // Gọi service
      };

      return { product, loading, fetchProduct };
    };



4. Cách sử dụng
Composables được import và sử dụng trong components (trong <script setup>) hoặc pages. Ví dụ:

Component ProductInfo sử dụng useCart để thêm sản phẩm vào giỏ hàng.
Page _id.vue sử dụng useProduct để lấy dữ liệu sản phẩm và truyền vào ProductDetailLayout.

    Ví dụ:
    <script setup lang="ts">
    import { useCart } from '~/composables/useCart';

    const { addToCart } = useCart();
    </script>

5. Tích hợp với các tính năng khác

Đa ngôn ngữ (i18n): Composables sử dụng $i18n.locale.value để truyền ngôn ngữ vào services.
Dark Mode: Composables như useColorModeToggle quản lý trạng thái dark/light mode.
TypeScript: Sử dụng interface để định nghĩa kiểu dữ liệu (ví dụ: Product, RelatedProduct).
SCSS: Composables không trực tiếp liên quan, nhưng dữ liệu từ composables có thể ảnh hưởng đến style (ví dụ: hiển thị sản phẩm với style dark mode).

6. Lợi ích

Tăng tính tái sử dụng của logic.
Tách biệt logic khỏi component, dễ kiểm tra và bảo trì.
Tích hợp mượt mà với Nuxt 3 và Composition API.

7. Lưu ý

Đặt tên composables theo chuẩn useSomething (ví dụ: useProduct).
Tránh đặt logic giao diện trong composables; chỉ xử lý state và side effects.
Sử dụng useFetch trong composables để tận dụng caching của Nuxt 3.


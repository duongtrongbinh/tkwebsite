Services trong Dự án Nuxt 3
1. Services là gì?
Services là các module TypeScript (file .ts) chịu trách nhiệm xử lý logic giao tiếp với API backend, database, hoặc các dịch vụ bên thứ ba (như Hygraph, Firebase). Chúng đóng vai trò như một lớp trừu tượng (abstraction layer) giữa giao diện người dùng (components/composables) và các yêu cầu API, giúp tách biệt logic gọi API để dễ bảo trì và tái sử dụng.
2. Nội dung của Services
Services chứa các hàm xử lý các yêu cầu HTTP (GET, POST, PUT, DELETE) để tương tác với API. Trong dự án, các services thường:

Gọi API sử dụng $axios (từ @nuxtjs/axios) với các header như Accept-Language để hỗ trợ đa ngôn ngữ (i18n).
Xử lý lỗi và định dạng dữ liệu trả về.
Được tổ chức theo chức năng (ví dụ: sản phẩm, giỏ hàng hóa).

Ví dụ cụ thể trong dự án:

productService.ts:
getProduct(id, locale): Lấy chi tiết sản phẩm từ /api/products/:id.
getRelatedProducts(id, locale): Lấy sản phẩm liên quan từ /products/related/api/:id`.


cartService.ts:
addToCart(product): Thêm sản phẩm vào giỏ hàng qua /api/cart.



3. Vị trí và cấu trúc

Thư mục: services/
Cấu trúc file:// services/productService.ts
import type { NuxtAxiosInstance } from '@nuxtjs/axios';

interface Product { /* Định nghĩa interface */ }
interface RelatedProduct { /* Định nghĩa interface */ }

export const productService = {
  async getProduct($axios: NuxtAxiosInstance, id: string, locale: string): Promise<Product> {
    // Gọi API
  },
  // Các hàm khác
};



4. Cách sử dụng
Services được gọi bởi composables hoặc trực tiếp trong components (thường thông qua composables để tái sử dụng). Ví dụ:

Composable useProduct sử dụng productService.getProduct để lấy dữ liệu sản phẩm.
Component _id.vue sử dụng composable useProduct để hiển thị dữ liệu.

5. Tích hợp với các tính năng khác

Đa ngôn ngữ (i18n): Services gửi header Accept-Language để lấy dữ liệu dịch theo ngôn ngữ hiện tại.
TypeScript: Sử dụng interface để đảm bảo type safety cho dữ liệu API.
Error Handling: Xử lý lỗi API và trả về thông báo cho composables.

6. Lợi ích

Tách biệt logic API khỏi giao diện người dùng.
Dễ dàng thay đổi backend hoặc API mà không ảnh hưởng đến component.
Tăng tính tái sử dụng và khả năng kiểm tra (testing).

7. Lưu ý

Tránh đặt logic giao diện (UI logic) trong services; chỉ xử lý API call.
Sử dụng $axios hoặc useFetch để gọi API, tận dụng caching của Nuxt 3 nếu cần.
Đảm bảo xử lý lỗi rõ ràng để composables hoặc components có thể hiển thị thông báo lỗi.


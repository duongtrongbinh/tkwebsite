APIs trong Dự án Nuxt 3
1. APIs là gì?
APIs là các điểm cuối (endpoints) được cung cấp bởi backend hoặc dịch vụ bên thứ ba để giao tiếp với ứng dụng frontend. Trong dự án Nuxt 3, APIs trả về dữ liệu (thường là JSON) để hiển thị trong các component, như chi tiết sản phẩm, giỏ hàng hóa, hoặc đánh giá.
2. Nội dung của APIs
APIs trong dự án bao gồm các endpoint để:

Lấy dữ liệu sản phẩm: GET /api/products/:id.
Lấy sản phẩm liên quan: GET /api/products/related/:id.
Thêm sản phẩm vào giỏ hàng: POST /api/cart.
Dữ liệu trả về được dịch theo ngôn ngữ thông qua header Accept-Language.

    Ví dụ dữ liệu trả về:
    {
      "id": 1,
      "name": "Sample Product",
      "price": 99.99,
      "images": [{ "src": "image.jpg", "alt": "Product Image" }],
      "description": "This is a sample product.",
      "reviews": [{ "id": 1, "user": "John", "rating": 5, "comment": "Great!" }]
    }

3. Vị trí và cấu hình

Backend: APIs được định nghĩa và triển khai phía backend (ví dụ: Node.js, Hygraph).
Frontend: Cấu hình base URL trong nuxt.config.ts hoặc file .env:axios: {
  baseURL: process.env.API_BASE_URL || 'http://localhost:3000'
}


Gọi API: Sử dụng $axios, useFetch, hoặc fetch thông qua services.

4. Cách sử dụng

Services gọi API thông qua $axios hoặc useFetch, truyền header Accept-Language để hỗ trợ i18n.
Composables sử dụng services để lấy dữ liệu API và quản lý state.
Components nhận dữ liệu từ composables để hiển thị trong template.

Ví dụ quy trình:

Component _id.vue sử dụng composable useProduct.
Composable useProduct gọi productService.getProduct.
Service productService gửi yêu cầu GET /api/products/:id với $axios.

5. Tích hợp với các tính năng khác

Đa ngôn ngữ (i18n): APIs nhận header Accept-Language (ví dụ: en-US, vi-VN) để trả về dữ liệu dịch.
Dark Mode: Không trực tiếp liên quan, nhưng dữ liệu từ API có thể ảnh hưởng đến giao diện (ví dụ: hình ảnh tối ưu cho dark mode).
TypeScript: Dữ liệu API được định nghĩa bằng interface để đảm bảo type safety.

6. Lợi ích

Cung cấp dữ liệu động cho ứng dụng.
Hỗ trợ đa ngôn ngữ thông qua header.
Tách biệt backend và frontend, dễ dàng mở rộng.

7. Lưu ý

Đảm bảo API trả về dữ liệu đúng định dạng và ngôn ngữ.
Xử lý lỗi API (404, 500, v.v.) trong services để tránh crash ứng dụng.
Tối ưu hiệu suất bằng caching (dùng useFetch với key trong Nuxt 3).


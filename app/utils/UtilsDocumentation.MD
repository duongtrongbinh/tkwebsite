Utils Documentation
Mục đích
Thư mục utils/ chứa các hàm tiện ích (utility functions) thuần JavaScript/TypeScript, được thiết kế để xử lý logic chung, độc lập với hệ sinh thái Vue/Nuxt. Các hàm này không sử dụng reactive state hoặc context của Nuxt, giúp chúng có thể tái sử dụng ở bất kỳ đâu trong dự án, bao gồm components, store, middleware, hoặc server routes.
Khi nào sử dụng

Khi bạn cần các hàm xử lý logic chung như định dạng dữ liệu, kiểm tra dữ liệu, hoặc gọi API cơ bản.
Khi logic không phụ thuộc vào reactive state hoặc các API của Vue/Nuxt như ref, reactive, useFetch.
Khi hàm cần được sử dụng ở nhiều nơi, kể cả ngoài components (ví dụ: trong middleware hoặc server-side logic).

Cấu trúc thư mục
utils/
├── index.ts          // Export tất cả utils để dễ import
├── api.ts           // Xử lý cấu hình và logic gọi API
├── formatters.ts    // Định dạng dữ liệu (ngày, tiền tệ, chuỗi)
├── validators.ts    // Kiểm tra dữ liệu đầu vào (email, phone)
├── helpers.ts       // Các hàm tiện ích chung (debounce, random ID)
├── constants.ts     // Hằng số và enum
├── storage.ts       // Quản lý localStorage/sessionStorage
├── auth.ts          // Logic liên quan đến xác thực (JWT, token)

Ví dụ
1. Định dạng ngày (formatters.ts)
import { format, parseISO } from 'date-fns';
import vi from 'date-fns/locale/vi';

export const formatDate = (date: string | Date, pattern = 'dd/MM/yyyy'): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, pattern, { locale: vi });
};

Sử dụng:
<!-- <script lang="ts">
import { defineComponent } from 'vue';
import { formatDate } from '~/utils/formatters';

export default defineComponent({
  computed: {
    formattedDate() {
      return formatDate(new Date()); // Output: "12/06/2025"
    },
  },
});
</script> -->

2. Kiểm tra email (validators.ts)
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

Sử dụng:
import { isValidEmail } from '~/utils/validators';

if (isValidEmail('user@example.com')) {
  console.log('Email hợp lệ');
}

3. Gọi API (api.ts)
import axios from 'axios';

export const fetchUsers = async (): Promise<any[]> => {
  const response = await axios.get('/api/users');
  return response.data;
};

Sử dụng:
import { fetchUsers } from '~/utils/api';

async function loadData() {
  const users = await fetchUsers();
  console.log(users);
}

Nguyên tắc sử dụng

Logic thuần túy: Chỉ đặt các hàm không cần reactive state hoặc Vue/Nuxt context vào utils/.
Tái sử dụng: Đảm bảo hàm có thể dùng ở nhiều nơi (components, middleware, server routes).
TypeScript: Sử dụng types/interfaces trong thư mục types/ để đảm bảo type safety.
Tổ chức: Chia nhỏ logic thành các file như formatters.ts, validators.ts để dễ quản lý.
Tài liệu hóa: Thêm JSDoc hoặc comment để mô tả chức năng của hàm.

Lưu ý

Tránh đặt logic reactive (như ref, reactive) vào utils/. Những logic này thuộc về composables/.
Nếu utils/ trở nên quá lớn, cân nhắc chia nhỏ thành subfolder như utils/api/, utils/format/.
Viết unit test cho các hàm trong utils/ bằng Jest/Vitest để đảm bảo chất lượng.


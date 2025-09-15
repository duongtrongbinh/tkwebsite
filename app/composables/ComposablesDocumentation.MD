Composables Documentation
Mục đích
Thư mục composables/ chứa các composable functions tận dụng hệ sinh thái Vue/Nuxt, đặc biệt là reactive system (ref, reactive, computed) và các API của Nuxt (useFetch, useRoute, useState). Các composable được thiết kế để quản lý state, side effects, hoặc logic giao diện trong components/pages.
Khi nào sử dụng

Khi bạn cần quản lý trạng thái reactive hoặc theo dõi thay đổi dữ liệu trong components.
Khi logic gắn liền với Vue/Nuxt context (như truy cập route, state, hoặc API như useFetch).
Khi bạn muốn tổ chức logic giao diện (như form, danh sách dữ liệu, hoặc tương tác người dùng).

Cấu trúc thư mục
composables/
├── index.ts          // Export tất cả composables để dễ import
├── useAuth.ts       // Quản lý xác thực (đăng nhập, đăng xuất)
├── useForm.ts       // Quản lý trạng thái và logic của form
├── useUsers.ts      // Quản lý danh sách người dùng từ API
├── useCart.ts       // Quản lý giỏ hàng

Ví dụ
1. Quản lý form (useForm.ts)
import { ref, computed } from 'vue';
import { isValidEmail } from '~/utils/validators';

export const useForm = () => {
  const email = ref('');
  const error = ref<string | null>(null);

  const isValid = computed(() => isValidEmail(email.value));

  const validate = () => {
    if (!isValid.value) {
      error.value = 'Email không hợp lệ';
    } else {
      error.value = null;
    }
  };

  return { email, error, isValid, validate };
};

Sử dụng:
<!-- <template>
  <div>
    <input v-model="email" @input="validate" />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useForm } from '~/composables/useForm';

export default defineComponent({
  setup() {
    const { email, error, validate } = useForm();
    return { email, error, validate };
  },
});
</script> -->

2. Quản lý danh sách người dùng (useUsers.ts)
import { ref } from 'vue';
import { fetchUsers } from '~/utils/api';

export const useUsers = () => {
  const users = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadUsers = async () => {
    loading.value = true;
    try {
      users.value = await fetchUsers();
    } catch (err) {
      error.value = 'Không thể tải danh sách người dùng';
    } finally {
      loading.value = false;
    }
  };

  return { users, loading, error, loadUsers };
};

Sử dụng:
<!-- <template>
  <div>
    <button @click="loadUsers">Tải người dùng</button>
    <p v-if="loading">Đang tải...</p>
    <p v-if="error">{{ error }}</p>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUsers } from '~/composables/useUsers';

export default defineComponent({
  setup() {
    const { users, loading, error, loadUsers } = useUsers();
    return { users, loading, error, loadUsers };
  },
});
</script> -->

Nguyên tắc sử dụng

Reactive logic: Đặt các hàm sử dụng ref, reactive, computed, hoặc API của Nuxt như useFetch, useRoute vào composables/.
Gắn với UI: Tập trung vào logic liên quan đến giao diện hoặc state trong components/pages.
Tái sử dụng: Tổ chức composable theo chức năng (VD: useAuth, useCart) để dễ tái sử dụng.
Kết hợp với utils: Có thể gọi các hàm từ utils/ để xử lý logic thuần túy (VD: isValidEmail trong useForm).
Tài liệu hóa: Thêm JSDoc hoặc comment để giải thích chức năng và giá trị trả về.

Lưu ý

Tránh đặt logic thuần túy (không reactive) vào composables/. Những logic này thuộc về utils/.
Quản lý reactive state cẩn thận để tránh memory leaks (VD: dùng watch hoặc onUnmounted đúng cách).
Đặt tên composable theo quy ước useSomething để rõ ràng mục đích.
Viết unit test cho composables nếu chúng chứa logic phức tạp.


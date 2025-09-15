import { ElNotification  } from "element-plus"

export const singletonToast = (type: "success" | "error", message: string) => {
  ElNotification({
    type,
    message,
    duration: 3000
  })
}

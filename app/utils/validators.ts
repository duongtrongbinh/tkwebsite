export const EMAIL_REGEX = /^[a-z0-9.+\-_]+@[a-z0-9.+\-_]+$/
export const PHONE_REGEX = /^(0[3|5|7|8|9])([0-9]{8})$/

export const REQUIRED = (attribute: string) => `${attribute} không được để trống`
export const MAX_STRING = (attribute: string, max: string | number) => `${attribute} giới hạn ${max} kí tự`
export const MIN_STRING = (attribute: string, max: string | number) => `${attribute} tối thiểu ${max} kí tự`
export const INVALID = (attribute: string | null) => `${attribute} không hợp lệ`
export const ACCEPT_TERM = `Chấp nhận điều khoản để tiếp tục`
export const PASSWORD_CONFIRMATION = `Mật khẩu xác nhận không khớp`
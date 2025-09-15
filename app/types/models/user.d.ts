export interface User {
  readonly id: number,
  name: string,
  email: string,
  avatar: string | null,
  employee_id: string,
  date_of_birth: string | Date | null,
  phone_number: string | null,
  join_date: string | Date | null,
  position_user: CustomOption | null,
}

export interface UserAuthorizationData {
  user: User;
  authorization: Authorization;
}

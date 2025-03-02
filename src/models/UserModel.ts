export interface Permission {
  name: string;
  description: string;
}

export interface Role {
  name: string;
  description: string;
  permissions: Permission[];
}



export interface UserModel {
  id: string;
  password: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  location?: string | null;
  dob?: string | null;
  createAt?: string;
  gender?: string;
  phone?: string;
  roles?: Role[];  // Danh sách vai trò của user
  isActivation?: boolean;  // Trạng thái kích hoạt
  noPassword?: string | null;  // Không rõ giá trị, có thể cần kiểm tra API
}
export interface UserUpdateRequest {
  // password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  location?: string;
  dob?: string | null;
  gender?: string;
  phone?: string;
  isActivation?: boolean;
  roles?: string[]; // Chỉ truyền danh sách ID của role
}


import { UserModel, UserUpdateRequest } from "../models/UserModel";
import { KEY_TOKEN } from "../service/LocalStorageService";

export const deleteUser = async (id: string) => {
    try {
        const token = localStorage.getItem(KEY_TOKEN);
        if (!token) {
            throw new Error("No token found");
        }

        const response = await fetch(`http://localhost:8080/users/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete user: ${response.statusText}`);
        }

        return { success: true };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { success: false };
    }
};

export const getAllUsers = async () => {
    try {
        const token = localStorage.getItem(KEY_TOKEN);
        if (!token) {
            throw new Error("No token found");
        }

        const response = await fetch(`http://localhost:8080/users`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        // console.log("Response status:", response.status); // Kiểm tra mã phản hồi HTTP
        // console.log("Response headers:", response.headers); // Kiểm tra headers

        if (!response.ok) {
            throw new Error(`Failed to get user: ${response.statusText}`);
        }

        const result = await response.json();
        // console.log("API response data:", result); // Kiểm tra dữ liệu trả về từ API

        return result || []; // Nếu API trả về object có `data`, lấy `data`; nếu không, trả về []
    } catch (error) {
        // console.error("Fetch users error:", error);
        return []; // Trả về mảng rỗng nếu lỗi
    }
};

export const updateUserAsAdmin = async (id: string, userUpdate: UserUpdateRequest) => {
    try {
      const token = localStorage.getItem(KEY_TOKEN);
      console.log("Token: " + token)
      if (!token) {
        throw new Error("Authentication token not found");
      }
      console.log("Userupdate:", JSON.stringify(userUpdate, null, 2));
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userUpdate),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update user: ${errorData.message || response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Update successful:", result);
      return result;
    } catch (error) {
      console.error("Update user error:", error);
      throw error;
    }
};
  

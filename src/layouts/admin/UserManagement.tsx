import React, { useEffect, useState } from "react";
import { UserModel, UserUpdateRequest } from "../../models/UserModel";
import { deleteUser, getAllUsers, updateUserAsAdmin } from "../../api/AdminAPI";
import UserTable from "./components/UserTable";
import { message, Modal } from "antd";

const { confirm } = Modal;

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<UserModel[]>([]);


    
    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            const filteredUsers = data?.result?.filter(
                (user: UserModel) => !user.roles?.some((role) => role.name === "")
            ) ?? [];
            setUsers(filteredUsers);
        } catch (error) {
            console.error("Error fetching users:", error);
            message.error("Failed to load users");
        }
    };

    useEffect(() => {
        fetchUsers();
        // const interval = setInterval(fetchUsers, 3000); // Gọi API mỗi 5 giây  (TON TAI NGUYEN)
        // return () => clearInterval(interval); // Xóa interval khi unmount
    }, []);

    const handleDelete = (id: string) => {
        confirm({
            title: "Are you sure you want to delete this user?",
            onOk: async () => {
                try {
                    const success = await deleteUser(id);
                    if (success) {
                        message.success("User deleted successfully!");
                        await fetchUsers();
                        // Cập nhật state để loại bỏ user khỏi danh sách
                        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
                    } else {
                        message.error("Failed to delete user.");
                    }
                } catch (error) {
                    message.error("Error deleting user");
                    console.error("Delete user error:", error);
                }
            },
        });
    };

    const handleUpdateUser = async (id: string, updatedUser: UserModel) => {
        const userUpdateRequest: UserUpdateRequest = {
            //   password: updatedUser.password ?? "",
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            location: updatedUser.location ?? "",
            dob: updatedUser.dob ?? null,
            gender: updatedUser.gender ?? "",
            phone: updatedUser.phone ?? "",
            isActivation: updatedUser.isActivation,
            // Handle roles safely - assuming roles is now an array of strings from the form
            roles: updatedUser.roles?.map((role: any) =>
                typeof role === 'string' ? role : role?.name || role?.id
            )?.filter(Boolean) ?? []
        };

        try {
            await updateUserAsAdmin(id, userUpdateRequest);
            message.success("User updated successfully!");
            await fetchUsers();
            // Cập nhật state
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                  user.id === id ? { ...user, ...updatedUser } : user
                )
              );
        } catch (error) {
            console.error("Update user error:", error);
            message.error("Failed to update user.");
        }
    };

    return (
        <UserTable
            users={users}
            onEdit={handleUpdateUser}
            onDelete={handleDelete}
        />
    );
};
export default UserManagement;
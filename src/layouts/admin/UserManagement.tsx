import React, { useEffect, useState } from "react";
import { UserModel } from "../../models/UserModel";
import { deleteUser, getAllUsers } from "../../api/AdminAPI";
import UserTable from "./components/UserTable";
import { message, Modal } from "antd";



const { confirm } = Modal;
const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        getAllUsers().then((data) => {
            console.log("Users data from API:", data); // Debug xem data có đúng không
            if (data?.result) {
                setUsers(data.result); // Chỉ lấy phần `result` của API
            } else {
                setUsers([]); // Đề phòng lỗi, đảm bảo state không bị undefined
            }
        });
    }, []);


    const fetchUsers = async () => {
        const data = await getAllUsers();
        setUsers(data);
    };

    const handleDelete = (id: string) => {
        confirm({
            title: "Are you sure you want to delete this user?",
            onOk: async () => {
                const success = await deleteUser(id);
                if (success) {
                    message.success("User deleted successfully!");
                    fetchUsers(); // Load lại danh sách user sau khi xóa
                } else {
                    message.error("Failed to delete user.");
                }
            },
        });
    };

    return (
        <UserTable users={users} onEdit={(id) => console.log("Edit:", id)} onDelete={handleDelete} />
    );
};

export default UserManagement;
import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button, Modal, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { UserModel } from "../../../models/UserModel";

const { confirm } = Modal;


interface UserTableProps {
    users: UserModel[];  // Danh sách user
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;

}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
    console.log("Received users data:", users); // Kiểm tra dữ liệu users nhận được
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Roles",
            dataIndex: "roles",
            key: "roles",
            render: (roles: { name: string }[]) => (
                <>
                    {roles?.map((role) => (
                        <Tag color="blue" key={role.name}>{role.name}</Tag>
                    ))}
                </>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (text: any, record: UserModel) => (
                <Space>
                    <Tooltip title="Edit">
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => onEdit(record.id)}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                            onClick={() => onDelete(record.id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return <Table columns={columns} dataSource={users} rowKey="id" />;
};

export default UserTable;
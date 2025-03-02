import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Button, Modal, Tooltip, Form, Input, Select, Switch } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { UserModel } from "../../../models/UserModel";

const { Option } = Select;

interface UserTableProps {
    users: UserModel[];
    onEdit: (id: string, updatedUser: UserModel) => void;
    onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
    const [form] = Form.useForm(); // Tạo form instance

    useEffect(() => {
        if (selectedUser) {
            form.setFieldsValue({
                ...selectedUser,
                roles: selectedUser.roles?.map(role => (typeof role === "string" ? role : role.name)) || [], // Đảm bảo đúng kiểu dữ liệu
            });
        }
    }, [selectedUser, form]);




    const showEditModal = (user: UserModel) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleSave = (values: Partial<UserModel>) => {
        if (selectedUser) {
            const updatedUser: UserModel = {
                ...selectedUser, // Giữ nguyên các giá trị cũ
                ...values, // Ghi đè giá trị mới vào
                roles: values.roles || selectedUser.roles, // Nếu không cập nhật roles, giữ nguyên
                isActivation: values.isActivation ?? selectedUser.isActivation, // Tránh null cho boolean
                password: selectedUser.password, // Giữ nguyên password nếu không cập nhật
            };
            onEdit(selectedUser.id, updatedUser);
        }
        setIsModalOpen(false);
    };
    





    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Username", dataIndex: "username", key: "username" },
        { title: "Email", dataIndex: "email", key: "email" },
        {
            title: "Roles",
            dataIndex: "roles",
            key: "roles",
            render: (roles: string[] | { name: string }[]) => (
                <>
                    {(roles || []).map((role) => {
                        const roleName = typeof role === "string" ? role : role.name; // Xử lý cả 2 trường hợp
                        return <Tag color="blue" key={roleName}>{roleName}</Tag>;
                    })}
                </>
            ),
        }
        ,
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: UserModel) => (
                <Space>
                    <Tooltip title="Edit">
                        <Button icon={<EditOutlined />} onClick={() => showEditModal(record)} />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button icon={<DeleteOutlined />} danger onClick={() => onDelete(record.id)} />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={users} rowKey="id" />

            {/* Modal Chỉnh Sửa User */}
            <Modal
                title="Edit User"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                {selectedUser && (
                    <Form
                        form={form} // Gắn form vào
                        layout="vertical"
                        onFinish={handleSave}
                    >
                        <Form.Item label="Username" name="username">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Phone" name="phone">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Gender" name="gender">
                            <Select>
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Active Account" name="isActivation" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                        <Form.Item label="Roles" name="roles">
                            <Select mode="multiple" placeholder="Select roles">
                                <Option value="ADMIN">ADMIN</Option>
                                <Option value="USER">USER</Option>
                                <Option value="EMPLOYER">EMPLOYER</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">Save</Button>
                        </Form.Item>

                    </Form>
                )}
            </Modal>
        </>
    );
};

export default UserTable;

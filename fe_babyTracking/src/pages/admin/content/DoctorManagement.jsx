import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Table, Tooltip } from "antd";
import { useForm } from "antd/es/form/Form";
import { Option } from "antd/es/mentions";
import { useState } from "react";

function DoctorManagement() {
  const [showModal, setShowModal] = useState(false);
  const [formVar] = useForm();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOk = () => {
    formVar.submit();
    handleCloseModal();
  };

  const handlePostAccount = async (values) => {};
  const handleDeleteAccount = async () => {};
  const handleUpdateAccount = async (values) => {};

  //=======================
  const dataSource = [
    {
      key: "1",
      id: "D001",
      username: "dr_jones",
      email: "dr.jones@example.com",
      password: "hashed_password_11",
      role: "Doctor",
      status: "active",
    },
    {
      key: "2",
      id: "D002",
      username: "dr_smith",
      email: "dr.smith@example.com",
      password: "hashed_password_12",
      role: "Doctor",
      status: "active",
    },
    {
      key: "3",
      id: "D003",
      username: "dr_emily",
      email: "dr.emily@example.com",
      password: "hashed_password_13",
      role: "Doctor",
      status: "inactive",
    },
    {
      key: "4",
      id: "D004",
      username: "dr_williams",
      email: "dr.williams@example.com",
      password: "hashed_password_14",
      role: "Doctor",
      status: "active",
    },
    {
      key: "5",
      id: "D005",
      username: "dr_clark",
      email: "dr.clark@example.com",
      password: "hashed_password_15",
      role: "Doctor",
      status: "inactive",
    },
  ];

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status === "active" ? "🟢 Active" : "🔴 Inactive"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Tooltip title="Edit">
            <EditOutlined
              style={{ color: "blue", marginRight: 10, cursor: "pointer" }}
              onClick={handleUpdateAccount}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined
              style={{ color: "red", cursor: "pointer" }}
              onClick={handleDeleteAccount}
            />
          </Tooltip>
        </span>
      ),
    },
  ];
  //========================

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Add new doctor
      </Button>
      <Modal
        title="Add new Account"
        open={showModal}
        onCancel={handleCloseModal}
        onOk={handleOk}
      >
        <Form
          labelCol={{ span: 8 }}
          form={formVar}
          onFinish={handlePostAccount}
          labelAlign="left"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please select role!",
              },
            ]}
          >
            <Select placeholder="Select Role">
              <Option value="User">User</Option>
              <Option value="Doctor">Doctor</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default DoctorManagement;

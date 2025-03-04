import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Tooltip,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { Option } from "antd/es/mentions";
import { getAllUserAccounts } from "../../../services/APIServices";

function UserManagement() {
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
      id: "U001",
      username: "mike123",
      email: "mike123@example.com",
      password: "hashed_password_1",
      role: "User",
      status: "active",
    },
    {
      key: "2",
      id: "U002",
      username: "john_doe",
      email: "john.doe@example.com",
      password: "hashed_password_2",
      role: "User",
      status: "inactive",
    },
    {
      key: "3",
      id: "U003",
      username: "sarah_99",
      email: "sarah99@example.com",
      password: "hashed_password_3",
      role: "User",
      status: "active",
    },
    {
      key: "4",
      id: "U004",
      username: "david_w",
      email: "david.w@example.com",
      password: "hashed_password_4",
      role: "User",
      status: "active",
    },
    {
      key: "5",
      id: "U005",
      username: "emma_watson",
      email: "emma.w@example.com",
      password: "hashed_password_5",
      role: "User",
      status: "inactive",
    },
    {
      key: "6",
      id: "U006",
      username: "robert_c",
      email: "robert.c@example.com",
      password: "hashed_password_6",
      role: "User",
      status: "active",
    },
    {
      key: "7",
      id: "U007",
      username: "linda_x",
      email: "linda.x@example.com",
      password: "hashed_password_7",
      role: "User",
      status: "inactive",
    },
    {
      key: "8",
      id: "U008",
      username: "will_smith",
      email: "will.s@example.com",
      password: "hashed_password_8",
      role: "User",
      status: "active",
    },
    {
      key: "9",
      id: "U009",
      username: "natalie_p",
      email: "natalie.p@example.com",
      password: "hashed_password_9",
      role: "User",
      status: "active",
    },
    {
      key: "10",
      id: "U010",
      username: "steve_jobs",
      email: "steve.jobs@example.com",
      password: "hashed_password_10",
      role: "User",
      status: "inactive",
    },
    {
      key: "11",
      id: "U011",
      username: "kevin_m",
      email: "kevin.m@example.com",
      password: "hashed_password_11",
      role: "User",
      status: "active",
    },
    {
      key: "12",
      id: "U012",
      username: "laura_b",
      email: "laura.b@example.com",
      password: "hashed_password_12",
      role: "User",
      status: "inactive",
    },
    {
      key: "13",
      id: "U013",
      username: "jason_r",
      email: "jason.r@example.com",
      password: "hashed_password_13",
      role: "User",
      status: "active",
    },
    {
      key: "14",
      id: "U014",
      username: "olivia_k",
      email: "olivia.k@example.com",
      password: "hashed_password_14",
      role: "User",
      status: "active",
    },
    {
      key: "15",
      id: "U015",
      username: "brandon_t",
      email: "brandon.t@example.com",
      password: "hashed_password_15",
      role: "User",
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
        Add new user
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

export default UserManagement;

import { useState, useEffect } from "react";
import { Table, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const AccountManagement = () => {
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
    {
      key: "6",
      id: "U001",
      username: "mike123",
      email: "mike123@example.com",
      password: "hashed_password_1",
      role: "User",
      status: "active",
    },
    {
      key: "7",
      id: "U002",
      username: "john_doe",
      email: "john.doe@example.com",
      password: "hashed_password_2",
      role: "User",
      status: "inactive",
    },
    {
      key: "8",
      id: "U003",
      username: "sarah_99",
      email: "sarah99@example.com",
      password: "hashed_password_3",
      role: "User",
      status: "active",
    },
    {
      key: "9",
      id: "U004",
      username: "david_w",
      email: "david.w@example.com",
      password: "hashed_password_4",
      role: "User",
      status: "active",
    },
    {
      key: "10",
      id: "U005",
      username: "emma_watson",
      email: "emma.w@example.com",
      password: "hashed_password_5",
      role: "User",
      status: "inactive",
    },
    {
      key: "11",
      id: "U006",
      username: "robert_c",
      email: "robert.c@example.com",
      password: "hashed_password_6",
      role: "User",
      status: "active",
    },
    {
      key: "12",
      id: "U007",
      username: "linda_x",
      email: "linda.x@example.com",
      password: "hashed_password_7",
      role: "User",
      status: "inactive",
    },
    {
      key: "13",
      id: "U008",
      username: "will_smith",
      email: "will.s@example.com",
      password: "hashed_password_8",
      role: "User",
      status: "active",
    },
    {
      key: "14",
      id: "U009",
      username: "natalie_p",
      email: "natalie.p@example.com",
      password: "hashed_password_9",
      role: "User",
      status: "active",
    },
    {
      key: "15",
      id: "U010",
      username: "steve_jobs",
      email: "steve.jobs@example.com",
      password: "hashed_password_10",
      role: "User",
      status: "inactive",
    },
    {
      key: "16",
      id: "U011",
      username: "kevin_m",
      email: "kevin.m@example.com",
      password: "hashed_password_11",
      role: "User",
      status: "active",
    },
    {
      key: "17",
      id: "U012",
      username: "laura_b",
      email: "laura.b@example.com",
      password: "hashed_password_12",
      role: "User",
      status: "inactive",
    },
    {
      key: "18",
      id: "U013",
      username: "jason_r",
      email: "jason.r@example.com",
      password: "hashed_password_13",
      role: "User",
      status: "active",
    },
    {
      key: "19",
      id: "U014",
      username: "olivia_k",
      email: "olivia.k@example.com",
      password: "hashed_password_14",
      role: "User",
      status: "active",
    },
    {
      key: "20",
      id: "U015",
      username: "brandon_t",
      email: "brandon.t@example.com",
      password: "hashed_password_15",
      role: "User",
      status: "inactive",
    },
  ];

  const [filteredAccounts, setFilteredAccounts] = useState(dataSource);
  const [searchText, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  useEffect(() => {
    let filteredData = dataSource;

    if (searchText) {
      filteredData = filteredData.filter(
        (account) =>
          account.name?.toLowerCase().includes(searchText?.toLowerCase()) ||
          account.email?.toLowerCase().includes(searchText?.toLowerCase())
      );
    }

    if (selectedRole && selectedRole !== "All") {
      filteredData = filteredData.filter(
        (account) => account.role === selectedRole
      );
    }

    setFilteredAccounts(filteredData);
  }, [searchText, selectedRole]);

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
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search by name or email"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-1/3"
        />

        <Select
          placeholder="Filter by role"
          value={selectedRole}
          onChange={(value) => setSelectedRole(value)}
          allowClear
          className="w-1/4"
        >
          <Option value="All">Select All</Option>
          <Option value="User">User</Option>
          <Option value="Doctor">Doctor</Option>
        </Select>
      </div>

      <Table
        dataSource={filteredAccounts}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default AccountManagement;

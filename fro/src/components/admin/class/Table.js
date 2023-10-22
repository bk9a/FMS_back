import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { data } from "../Data";
import { Table, Modal, Input, Space, Button, Card } from "antd";
import { Form } from "react-router-dom";
import {
  loadUsers,
  setFormData,
  setClearFormData,
  setDialog,
} from "redux/reducers/users";
import UserForm from "./Form";
const Lesson = () => {
  const dispatch = useDispatch();
  const [Data, setData] = useState(data);
  const [edit, setEdit] = useState(null);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("Нэмэх");

  const { list: data1, count } = useSelector((state) => state.users.data);

  const loading1 = useSelector((state) => state.users.loading);
  const dialog = useSelector((state) => state.users.dialog);
  const formData = useSelector((state) => state.users.formData);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    GetData();
  }, [page, rowsPerPage]);

  const GetData = () => {
    // dispatch(loadDataSourceRole());
    dispatch(loadUsers({ page, rowsPerPage, searchValue: "" }));
  };
  const columns = [
    {
      key: "firstname",
      title: "Нэр",
      dataIndex: "firstname",
    },
    {
      key: "lastname",
      title: "Майл ",
      dataIndex: "lastname",
    },

    {
      key: "phone",
      title: "Утас",
      dataIndex: "phone",
    },
    {
      key: "email",
      title: "Цахим шуудан",
      dataIndex: "email",
    },

    {
      key: "sex",
      title: "Хүйс",
      dataIndex: "sex",
    },
    {
      key: "level",
      title: "Түвшин",
      dataIndex: "level",
    },

    {
      key: "action",
      title: "Үйлдэл",
      render: (record) => {
        return (
          <div className="flex gap-4">
            <EditOutlined
              style={{ color: "black" }}
              onClick={() => {
                // console.log({ record });
                Edit(record);
              }}
            />
            <DeleteOutlined
              style={{ color: "red" }}
              onClick={() => Delete(record)}
            />
          </div>
        );
      },
    },
  ];

  const ResetEditing = () => {
    setEdit(null);
    setVisible(false);
  };
  const Add = () => {
    // console.log(record);
    setTitle("Нэмэх");
    // dispatch(setFormData({}));
    dispatch(setDialog(true));

    // setEdit(null);
    // setVisible(true);
  };
  // const Edit = (record) => {
  //   // console.log(record);
  //   setTitle("Засварлах");
  //   setEdit(record);
  //   setVisible(true);
  // };
  const Edit = (row) => {
    // dispatch(setAlert({ message: "hidddddd", success: false }));
    setTitle("Засварлах");
    if (row) dispatch(setFormData(row));
    dispatch(setDialog(true));
  };

  const Delete = (record) => {
    Modal.confirm({
      title: "Та устгахдаа итгэлтэй байна уу?",
      okText: "Устгах",
      cancelText: "Буцах",
      okButtonProps: { style: { backgroundColor: "#01796f" } },
      onOk: () => {
        setData((pre) => {
          return pre.filter((person) => person.id != record.id);
        });
      },
    });
  };
  return (
    <Card title="Хичээл">
      <div className="App w-full">
        <div className="table w-full">
          <Modal
            title={title}
            visible={dialog}
            okButtonProps={{ style: { backgroundColor: "#01796f" } }}
            okText="Хадгалах"
            cancelText="Буцах"
            onCancel={() => /*setVisible(false)*/ dispatch(setClearFormData())}
            onOk={() => /*setVisible(false)*/ {
              setData((pre) => {
                return pre.map((student) => {
                  if (student.id === edit.id) {
                    return edit;
                  } else {
                    return student;
                  }
                });
              });
              ResetEditing();
            }}
          >
            <Card>
              <Space direction="vertical" size="large" className=" w-full">
                <UserForm />
              </Space>
            </Card>
          </Modal>
          <Space
            style={{
              marginBottom: 16,
            }}
          >
            <Button
              type="primary"
              // size={"large"}
              className="  bg-bodyhack   "
              onClick={Add}
            >
              Нэмэх
            </Button>
          </Space>
          <Table
            className="w-full "
            dataSource={data1}
            columns={columns}
            pagination={true}
          />
        </div>
      </div>
    </Card>
  );
};
export default Lesson;

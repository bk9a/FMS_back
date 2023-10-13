import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { data } from "../Data";
import { Table, Modal, Input, Space, Button, Card } from "antd";
const Lesson = () => {
  const [Data, setData] = useState(data);
  const [edit, setEdit] = useState(null);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("Нэмэх");
  const columns = [
    {
      key: "name",
      title: "Нэр",
      dataIndex: "name",
    },
    {
      key: "email",
      title: "Майл ",
      dataIndex: "email",
    },
    {
      key: "address",
      title: "Хаяг",
      dataIndex: "address",
    },
    {
      key: "phone",
      title: "Утас",
      dataIndex: "phone",
    },
    {
      key: "website",
      title: "Вэбсайт",
      dataIndex: "website",
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

    setEdit(null);
    setVisible(true);
  };
  const Edit = (record) => {
    // console.log(record);
    setTitle("Засварлах");
    setEdit(record);
    setVisible(true);
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
            visible={visible}
            okButtonProps={{ style: { backgroundColor: "#01796f" } }}
            okText="Хадгалах"
            cancelText="Буцах"
            onCancel={() => /*setVisible(false)*/ ResetEditing()}
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
            <Card className="flex flex-row ">
              <Input
                value={edit?.name}
                onChange={(e) => {
                  setEdit((pre) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
              />
              <Input
                value={edit?.email}
                onChange={(e) => {
                  setEdit((pre) => {
                    return { ...pre, email: e.target.value };
                  });
                }}
              />
              <Input
                value={edit?.address}
                onChange={(e) => {
                  setEdit((pre) => {
                    return { ...pre, address: e.target.value };
                  });
                }}
              />
              <Input
                value={edit?.phone}
                onChange={(e) => {
                  setEdit((pre) => {
                    return { ...pre, phone: e.target.value };
                  });
                }}
              />
              <Input
                value={edit?.website}
                onChange={(e) => {
                  setEdit((pre) => {
                    return { ...pre, website: e.target.value };
                  });
                }}
              />
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
            dataSource={Data}
            columns={columns}
            pagination={true}
          />
        </div>
      </div>
    </Card>
  );
};
export default Lesson;

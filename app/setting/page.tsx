"use client";
import { List, Button, Empty } from "antd";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
export default function SettingPage() {
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  const [tipe, setTipe] = useState<any>(1);
  useEffect(() => {
    let data = localStorage.getItem("data");
    setData(JSON.parse(data || "[]"));
  }, [data?.length === 0]);

  useEffect(() => {
    let tipe = localStorage.getItem("tipe");
    setTipe(JSON.parse(tipe || "1"));
  }, []);
  const handleRemove = (option: string) => {
    let data = localStorage.getItem("data");
    let json: any = JSON.parse(data || "[]");
    json = json?.filter((item: any) => item?.option !== option);
    localStorage.setItem("data", JSON.stringify(json));
    setData(json);
  };
  const handleSwitch = (tipe: number) => {
    setTipe(tipe);
    localStorage.setItem("tipe", JSON.stringify(tipe));
  };
  return (
    <div className="flex justify-center items-center h-screen  bg-cover bg-[url('/image/bg.jpeg')] bg-no-repeat bg-center bg-fixed bg-scroll relative">
      <Button
        type="primary"
        danger
        className="absolute top-[1vh] right-[5vw] w-[20vw] text-[5vw] h-[5vh] rounded-3xl"
        onClick={() => router.push("/create")}
      >
        Create
      </Button>
      <Button
        danger
        className="absolute top-[1vh] left-[5vw] w-[20vw] text-[5vw] h-[5vh] rounded-3xl"
        onClick={() => (window.location.href = "/")}
      >
        Wheel
      </Button>
      <Button
        type={tipe === 1 ? "primary" : "default"}
        // danger
        className="absolute bottom-[1vh] left-[25vw] w-[20vw] text-[5vw] h-[5vh] rounded-3xl"
        onClick={() => handleSwitch(1)}
      >
        Tipe 1
      </Button>
      <Button
        type={tipe === 2 ? "primary" : "default"}
        // danger
        className="absolute bottom-[1vh] left-[45vw] w-[20vw] text-[5vw] h-[5vh] rounded-3xl"
        onClick={() => handleSwitch(2)}
      >
        Tipe 2
      </Button>

      <div className="absolute bg-white p-10 rounded-3xl shadow-2xl top-[15vh] w-[70vw]  overflow-auto h-[70vh]">
        <List
          itemLayout="horizontal"
          dataSource={data}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                className="text-[5vw]"
              />
            ),
          }}
          renderItem={(item: any, index: number) => (
            <List.Item
              key={item?.option}
              actions={[
                <Button
                  type="primary"
                  key={1}
                  danger
                  onClick={() => handleRemove(item?.option)}
                  className="bg-red-500 text-white w-[10vw] h-[5vh] rounded-3xl text-[5vw]"
                >
                  <DeleteOutlined />
                </Button>,
                // <Button
                //   type="primary"
                //   key={2}
                //   onClick={() => handleToEdit(index)}
                //   className="bg-blue-500 text-white w-[10vw] h-[5vh] rounded-3xl text-[5vw]"
                // >
                //   <EditOutlined />
                // </Button>,
              ]}
            >
              <List.Item.Meta
                title={<a href="https://ant.design">{item?.option}</a>}
                description={`stock:${item?.stock} weight:${item?.weight}`}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

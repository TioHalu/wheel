"use client";
import { List, Button } from "antd";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
export default function SettingPage() {
    const router = useRouter()
    const [data, setData] = useState<any>([]);
    useEffect(() => {
        let data = localStorage.getItem("data")
        setData(JSON.parse(data || "[]"))
    },[data?.length===0])

    const handleRemove = (option:string) => {
        let data = localStorage.getItem("data")
        let json:any = JSON.parse(data || "[]")
        json = json?.filter((item:any) => item?.option !== option)
        localStorage.setItem("data", JSON.stringify(json))
        setData(json)
    }
    const handleToEdit = (option:string) => {
        router.push(`/edit/${option}`)
    }
  return (
    <div className="flex justify-center items-center h-screen  bg-cover bg-[url('/image/bg.jpeg')] bg-no-repeat bg-center bg-fixed bg-scroll relative">
      <div className="absolute bg-white p-10 rounded-3xl shadow-2xl top-[15vh] w-[70vw]  overflow-auto h-[70vh]">

        <List
          itemLayout="horizontal"
          dataSource={data}
          
          renderItem={(item:any) => (
            <List.Item key={item?.option} actions={[
                <Button type="primary" key={1} danger onClick={()=>handleRemove(item?.option)}
                className="bg-red-500 text-white w-[10vw] h-[5vh] rounded-3xl text-[5vw]"
                ><DeleteOutlined/></Button>,
                <Button type="primary" key={2} onClick={()=>handleToEdit(item?.option)}
                className="bg-blue-500 text-white w-[10vw] h-[5vh] rounded-3xl text-[5vw]"
                ><EditOutlined/></Button>
            ]}>
              <List.Item.Meta
                title={<a href="https://ant.design">{item?.option}</a>}
                description={`bg:${item?.style?.backgroundColor} font: ${item?.style?.textColor}`}
              />
            </List.Item>

          )}
        />
      </div>
    </div>
  );
}

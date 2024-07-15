"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Col,
  Row,
  Typography,
  
} from "antd";
import { useRouter } from "next/navigation";

const SettingPage = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false)
  const router = useRouter()


  const handleFinish = (v:any)=> {
    let data = localStorage.getItem("data")
    let json:any = JSON.parse(data || "[]")
    let value = {
      ...v
    } 
    json?.push(value)
    localStorage.setItem("data", JSON.stringify(json))
    setLoading(true)
    setTimeout(() => {
      router.push("/setting")
    }, 2000);
  }
  return (
    <div className="flex justify-center items-center h-screen  bg-cover bg-[url('/image/bg.png')] bg-no-repeat bg-center bg-fixed bg-scroll relative">
      <Button type="primary" danger className="absolute top-[1vh] left-[2vw] w-[20vw] text-[5vw] h-[5vh] rounded-3xl" onClick={() => router.push("/setting")}>
        Kembali
      </Button>
      <Form
        name="basic"
        style={{ width: "70vw" }}
        autoComplete="off"
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        className="absolute bg-white p-10 rounded-3xl shadow-2xl top-[15vh] w-[70vw]  overflow-auto"
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label={
                <Typography.Text className="text-[5vw]">Option</Typography.Text>
              }
              name="option"
              rules={[{ required: true, message: "Please input your option!" }]}
            >
              <Input className="h-[10vw]  rounded-3xl" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={
                <Typography.Text className="text-[5vw]">
                  Weight
                </Typography.Text>
              }
              name="weight"
              rules={[{ required: true, message: "Please input your weight!" }]}
            >
              <Input type="number" className="h-[10vw]  rounded-3xl" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={
                <Typography.Text className="text-[5vw]">
                  Stock
                </Typography.Text>
              }
              name="stock"
              rules={[{ required: true, message: "Please input your stock!" }]}
            >
              <Input type="number" className="h-[10vw]  rounded-3xl" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
              loading={loading}
                type="primary"
                htmlType="submit"
                className="bg-[#1677ff] w-[100%] h-[10vw] text-[5vw] rounded-3xl"
              >
                Apply
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SettingPage;

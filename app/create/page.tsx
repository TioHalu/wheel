"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Col,
  Row,
  Typography,
  ColorPicker,
  InputNumber,
} from "antd";
import "react-color-palette/css";
import { useRouter } from "next/navigation";

const SettingPage = () => {
  const [form] = Form.useForm();
  const [style, setStyle] = useState({
    backgroundColor: "#1677ff",
    textColor: "#000000",
  })
  const { backgroundColor, textColor } = style;
  const router = useRouter()
  const handleChangeBgColor = (color: any, hex:string) => {
    setStyle({
      ...style,
      backgroundColor: hex
    })
    form.setFieldsValue({ backgroundColor: hex });
  };
  const handleChangeFontColor = (color: any, hex:string) => {
    setStyle({
      ...style,
      textColor: hex
    })
    form.setFieldsValue({ textColor: hex });
  };
  const handleFinish = (v:any)=> {
    let data = localStorage.getItem("data")
    let json:any = JSON.parse(data || "[]")
    let value = {
      option: v.option,
      style :{
        backgroundColor: v.backgroundColor,
        textColor: v.textColor
      },
      stock: v.stock
    } 
    json?.push(value)
    localStorage.setItem("data", JSON.stringify(json))
    setTimeout(() => {
      router.push("/setting")
    }, 2000);
  }
  return (
    <div className="flex justify-center items-center h-screen  bg-cover bg-[url('/image/bg.jpeg')] bg-no-repeat bg-center bg-fixed bg-scroll relative">
      <Form
        name="basic"
        style={{ width: "70vw" }}
        autoComplete="off"
        layout="vertical"
        form={form}
        initialValues={{
          backgroundColor,
          textColor
        }}
        onFinish={handleFinish}
        className="absolute bg-white p-10 rounded-3xl shadow-2xl top-[15vh] w-[70vw]  overflow-auto"
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label={
                <Typography.Text className="text-[5vw]">Name</Typography.Text>
              }
              name="option"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input className="h-[10vw]  rounded-3xl" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={
                <Typography.Text className="text-[5vw]">
                  Background Color
                </Typography.Text>
              }
              name="backgroundColor"
              rules={[{ required: true, message: "Please input your color!" }]}
            >
              <ColorPicker
                allowClear
                defaultValue="#1677ff"
                showText
                className="h-[10vw] text-[5vw] rounded-3xl"
                onChange={handleChangeBgColor}
                value={backgroundColor}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={
                <Typography.Text className="text-[5vw]">
                  Color Text
                </Typography.Text>
              }
              name="textColor"
              rules={[{ required: true, message: "Please input your color!" }]}
            >
              <ColorPicker
                defaultValue="#1677ff"
                showText
                className="h-[10vw] text-[5vw] rounded-3xl"
                onChange={handleChangeFontColor}
                value={textColor}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={
                <Typography.Text className="text-[5vw]">Stock</Typography.Text>
              }
              name="stock"
              rules={[{ required: true, message: "Please input your number!" }]}
            >
              <InputNumber
                min={1}
                max={10}
                className="h-[10vw] text-[5vw] rounded-3xl w-[100%]"
                controls={true}
                type="number"
                name="stock"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-[#1677ff] w-[100%] h-[10vw] text-[5vw] rounded-3xl"
              >
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SettingPage;

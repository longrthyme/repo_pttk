import AdminLayout from "@/layouts/AdminLayout";
import React, {useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, Col, Input, InputNumber, Row, Spin, Switch } from "antd";
import Image from "next/image";
import { UserOutlined } from "@ant-design/icons";
import icon_upload from "../../../public/images/logo_upload.png";
import { useSession } from "next-auth/react";


export default function AddEmployee() {

    const router = useRouter();

    const addEmployee = () => {


    }


    
  const { data: session } = useSession();
  const token = session?.accessToken;


  useEffect(() => {

    if(session?.role == "CUSTOMER") {
      router.push("/unauthorized")
    }
  } , [session]);




    const [data, setData] = useState({
        image: null,
        fullname: "",
        username:"",
        password:"",
        email:"",
        phoneNumber:""
      });

    const [imagePrev, setImagePrev] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="p-10 border-2 border-solid">
        {isLoading ? (
          <Spin />
        ) : (
          <>
            <Row className="">
              <Col flex="400px" className="pl-4">
                <div className="info-1">
                  <h2 className="font-medium  text-base">About</h2>
                  <p className="text-gray-700">Basic product information</p>
                </div>
              </Col>
              <Col flex="1">
                <div className="flex flex-col">
                  <label className="font-semibold text-base">
                    Họ và tên:
                  </label>
                  <Input placeholder="Your full name" size="large"  
                    onChange={(e) =>
                      setData({ ...data, fullname: e.target.value })
                    }  prefix={<UserOutlined />} required={true} />
    <br />
                </div>
  

                <div className="flex items-center mt-8">
                  <Image
                    src={icon_upload}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <label className="border px-4 text-white py-2 bg-primary-500 font-semibold ml-12 rounded-md hover:bg-primary-600">
                    Upload primary image
                    <Input
                      hidden
                      className="w-1/3 ml-8"
                      tabIndex={"-1"}
                      type="file"
                      accept="image/png,image/jpg,image/jpeg"
                      multiple
                      encType="multipart/form-data"
                      autoComplete="off"
                      required={true}
                    //   onChange={(e) => setPrimaryImage(e)}
                    />
                  </label>
                </div>
              </Col>
            </Row>
  
            {imagePrev && (
              <Row className="mt-4">
                <div className="">
                  <Card style={{ width: 300, height: 300 }}>
                    <img src={imagePrev} />
                  </Card>
                </div>
              </Row>
            )}
  
            <hr className="border-1 border-gray-200 mt-20" />
    
  
            <div className="flex justify-center">
              <button
                className="bg-black text-white hover:bg-primary-700 font-semibold rounded-md px-4 py-2 mt-6 border border-1 border-solid rounded-md self-center mr-10"
                onClick={() => router.back()}
              >
                Cancel
              </button>
              <button
                className="bg-black text-white hover:bg-red-400 font-semibold rounded-md px-4 py-2 mt-6 border border-1 border-solid rounded-md self-center ml-10"
                onClick={() => addEmployee()}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    )
}

AddEmployee.getLayout = (page) => <AdminLayout children={page} />
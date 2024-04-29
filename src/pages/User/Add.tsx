import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { movieService } from '../../core/apis/movie.service';
import { Button, DatePicker, Form, Input, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../core/apis/user.service';

interface IBody {
  username: string;
  email: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  address: string;
  password: string;
}

const AddUser = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const addAUser = async () => {
    const res = await userService.register(form.getFieldsValue());
    if (res !== 0) {
      message.success('Thêm mới thành công');
      navigate('/movie/list');
    } else {
      message.error('Có lỗi xảy ra');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Thêm mới user" />
      <div className="flex gap-6 w-full">
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ minWidth: 800 }}
        >
          <Form.Item label="Username" name="username">
            <Input placeholder="Nhập username" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item label="Họ và tên" name="fullName">
            <Input placeholder="Họ và tên" />
          </Form.Item>
          <Form.Item label="Ngày sinh" name="dateOfBirth">
            <DatePicker className="!w-full" placeholder="Ngày sinh" />
          </Form.Item>
          <Form.Item label="Giới tính" name="gender">
            <Input placeholder="Giới tính" />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phoneNumber">
            <Input placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input placeholder="Địa chỉ" />
          </Form.Item>
          <Form.Item label="Mật khẩu" name="password">
            <Input type="password" placeholder="Mật khẩu" />
          </Form.Item>
          <div className="flex gap-2 float-right mr-[200px]">
            <Button onClick={() => navigate('/user/list')}>Hủy</Button>
            <Form.Item>
              <Button
                onClick={addAUser}
                className="!bg-blue-600"
                type="primary"
                htmlType="submit"
              >
                Lưu
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </DefaultLayout>
  );
};

export default AddUser;

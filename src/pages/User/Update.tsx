import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { userService } from '../../core/apis/user.service';

const UpdateUser = () => {
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserById();
  }, [searchParams.get('id')]);

  const getUserById = async () => {
    const id = searchParams.get('id');
    if (id) {
      const res = await userService.getUserInfo(id);
      form.setFieldsValue(res);
    }
  };

  const updateUser = async () => {
    const id = searchParams.get('id');
    if (id) {
      const res = await userService.updateUserInfo(id, form.getFieldsValue());
      if (res !== 0) {
        message.success('Cập nhật thành công');
        navigate('/user/list');
      } else {
        message.error('Có lỗi xảy ra');
      }
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chỉnh sửa user" />
      <div className="flex gap-6 w-full">
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ minWidth: 800 }}
        >
          <Form.Item label="Username" name="username">
            <Input disabled placeholder="Nhập username" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input disabled placeholder="Nhập email" />
          </Form.Item>
          <Form.Item label="Họ và tên" name="fullName">
            <Input placeholder="Họ và tên" />
          </Form.Item>
          <Form.Item label="Ngày sinh" name="dateOfBirth">
            <Input disabled placeholder="Ngày sinh" />
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
          <div className="flex gap-2 float-right mr-[200px]">
            <Button onClick={() => navigate('/user/list')}>Hủy</Button>
            <Form.Item>
              <Button
                onClick={updateUser}
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

export default UpdateUser;

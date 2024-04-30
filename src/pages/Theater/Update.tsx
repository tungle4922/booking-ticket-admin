import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { theaterService } from '../../core/apis/theater.service';

const UpdateTheater = () => {
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTheaterByName();
  }, [searchParams.get('name')]);

  const getTheaterByName = async () => {
    const name = searchParams.get('name');
    if (name) {
      const res = await theaterService.getTheaterByName(name);
      form.setFieldsValue(res);
    }
  };

  const updateTheater = async () => {
    // const id = searchParams.get('id');
    // if (id) {
    //   const res = await theaterService.updateUserInfo(
    //     id,
    //     form.getFieldsValue(),
    //   );
    //   if (res !== 0) {
    //     message.success('Cập nhật thành công');
    //     navigate('/user/list');
    //   } else {
    //     message.error('Có lỗi xảy ra');
    //   }
    // }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chỉnh sửa rạp" />
      <div className="flex gap-6 w-full">
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ minWidth: 800 }}
        >
          <Form.Item label="Tên" name="name">
            <Input disabled placeholder="Nhập tên" />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="location">
            <Input placeholder="Địa chỉ" />
          </Form.Item>
          <div className="flex gap-2 float-right mr-[200px]">
            <Button onClick={() => navigate('/theater/list')}>Hủy</Button>
            <Form.Item>
              <Button
                onClick={updateTheater}
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

export default UpdateTheater;

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { movieService } from '../../core/apis/movie.service';
import { Button, DatePicker, Form, Input, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../core/apis/user.service';
import {theaterService} from '../../core/apis/theater.service'

interface IBody {
  name: string;
  location: string;
}

const AddTheater = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const addATheater = async () => {
    const body: IBody = form.getFieldsValue();
    const res = await theaterService.addATheater(body);
    if (res !== 0) {
      message.success('Thêm mới thành công');
      navigate('/theater/list');
    } else {
      message.error('Có lỗi xảy ra');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Thêm mới theater" />
      <div className="flex gap-6 w-full">
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ minWidth: 800 }}
        >
          <Form.Item label="name" name="name">
            <Input placeholder="Nhập tên" />
          </Form.Item>
          <Form.Item label="location" name="location">
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
          <div className="flex gap-2 float-right mr-[200px]">
            <Button onClick={() => navigate('/theater/list')}>Hủy</Button>
            <Form.Item>
              <Button
                onClick={addATheater}
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

export default AddTheater;

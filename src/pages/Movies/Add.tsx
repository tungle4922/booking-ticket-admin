import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { movieService } from '../../core/apis/movie.service';
import { Button, DatePicker, Form, Input, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router-dom';

interface IBody {
  title: string;
  director: string;
  genre: string[];
  releaseDate: string;
  duration: number;
  ratings: any;
  cast: string[];
  reviews: any;
  plot: string;
  ticketPrice: 12;
  theaters: string[];
  image: string;
}

const AddMovie = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const addAMovie = async () => {
    const body: IBody = form.getFieldsValue();
    body.genre = form.getFieldValue('genre')?.split(', ');
    body.cast = form.getFieldValue('cast')?.split(', ');
    body.theaters = form.getFieldValue('theaters')?.split(', ');
    const res = await movieService.addAMovie(body);
    if (res !== 0) {
      message.success('Thêm mới thành công');
      navigate('/movie/list');
    } else {
      message.error('Có lỗi xảy ra');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Thêm mới phim" />
      <div className="flex gap-6 w-full">
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ minWidth: 800 }}
        >
          <Form.Item label="Tên phim" name="title">
            <Input placeholder="Tên phim" />
          </Form.Item>
          <Form.Item label="Tên đạo diễn" name="director">
            <Input placeholder="Tên đạo diễn" />
          </Form.Item>
          <Form.Item label="Thể loại" name="genre">
            <Input placeholder="Thể loại" />
          </Form.Item>
          <Form.Item label="Ngày phát hành" name="releaseDate">
            <DatePicker className="!w-full" placeholder="Ngày phát hành" />
          </Form.Item>
          <Form.Item label="Thời lượng (phút)" name="duration">
            <Input type="number" placeholder="Thời lượng (phút)" />
          </Form.Item>
          <Form.Item label="Rating" name="ratings">
            <Input disabled placeholder="Rating" />
          </Form.Item>
          <Form.Item label="Diễn viên" name="cast">
            <Input placeholder="Diễn viên" />
          </Form.Item>
          <Form.Item label="Reviews" name="reviews">
            <Input disabled placeholder="Reviews" />
          </Form.Item>
          <Form.Item label="Nội dung" name="plot">
            <TextArea rows={4} placeholder="Nội dung" />
          </Form.Item>
          <Form.Item label="Giá vé (VND)" name="ticketPrice">
            <Input type="number" placeholder="Giá vé (VND)" />
          </Form.Item>
          <Form.Item label="Rạp" name="theaters">
            <Input placeholder="Rạp" />
          </Form.Item>
          <Form.Item label="Link ảnh" name="image">
            <Input placeholder="Link ảnh" />
          </Form.Item>
          <div className="flex gap-2 float-right mr-[200px]">
            <Button onClick={() => navigate('/movie/list')}>Hủy</Button>
            <Form.Item>
              <Button
                onClick={addAMovie}
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

export default AddMovie;

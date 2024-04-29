import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { movieService } from '../../core/apis/movie.service';
import { Button, Form, Input } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';

const UpdateMovie = () => {
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const [imgUrl, setImgUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getMovieById();
  }, [searchParams.get('id')]);

  const getMovieById = async () => {
    const id = searchParams.get('id');
    if (id) {
      const res = await movieService.getMovieById(id);
      setImgUrl(res.image);
      form.setFieldsValue(res);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chỉnh sửa phim" />
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
            <Input disabled placeholder="Ngày phát hành" />
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
              <Button className="!bg-blue-600" type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </div>
        </Form>
        <img src={imgUrl} alt="" className="h-fit w-[300px]" />
      </div>
    </DefaultLayout>
  );
};

export default UpdateMovie;

import { Button, Space, Table, TableProps } from 'antd';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { movieService } from '../../core/apis/movie.service';
import { Link } from 'react-router-dom';

interface DataType {
  key: number;
  title: string;
  director: string;
  duration: number;
  ticketPrice: number;
  releaseDate: string;
  action: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Tên',
    dataIndex: 'title',
    key: 'title',
    render: (text: any) => <a>{text}</a>,
  },
  {
    title: 'Đạo diễn',
    dataIndex: 'director',
    key: 'director',
  },
  {
    title: 'Thời lượng (phút)',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'Giá vé (VND)',
    key: 'ticketPrice',
    dataIndex: 'ticketPrice',
  },
  {
    title: 'Ngày phát hành',
    key: 'releaseDate',
    dataIndex: 'releaseDate',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: any, record: any) => (
      <Space size="middle">
        <Link to={`/movie/update/?id=${record._id}`}>Chỉnh sửa</Link>
        <a>Xóa</a>
      </Space>
    ),
  },
];

const MovieList = () => {
  const [listMovie, setListMovie] = useState<DataType[]>([]);

  useEffect(() => {
    getAllMovie();
  }, []);

  const getAllMovie = async () => {
    const res: DataType[] = await movieService.getAllMovies();
    res.forEach((item, index) => {
      item.key = index;
    });
    setListMovie(res);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Danh sách phim" />
      <div>
        <Button type="primary" className="!bg-blue-500 float-right my-6">
          <Link to={'/movie/add'}>Thêm mới</Link>
        </Button>
        <Table className="!w-full" columns={columns} dataSource={listMovie} />
      </div>
    </DefaultLayout>
  );
};

export default MovieList;

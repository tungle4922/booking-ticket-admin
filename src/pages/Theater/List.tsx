import { Button, Input, Space, Table, TableProps } from 'antd';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { theaterService } from '../../core/apis/theater.service';

interface DataType {
  key: number;
  name: string;
  location: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Tên rạp',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Địa chỉ rạp',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: any, record: any) => (
      <Space size="middle">
        <Link to={`/theater/update?name=${record.name}`}>Chỉnh sửa</Link>
        <a>Xóa</a>
      </Space>
    ),
  },
];

const TheaterList = () => {
  const [listTheater, setListTheater] = useState<DataType[]>([]);

  useEffect(() => {
    getAllTheater();
  }, []);

  const getAllTheater = async () => {
    const res: DataType[] = await theaterService.getAll();
    res.forEach((item, index) => {
      item.key = index;
    });
    setListTheater(res);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Danh sách rạp" />
      <div>
        <div className="flex gap-6 !h-10">
          <Input placeholder="Nhập thông tin tìm kiếm..." />
          <Button type="primary" className="!bg-blue-500 !h-full">
            Tìm kiếm
          </Button>
        </div>
        <Button type="primary" className="!bg-blue-500 float-right my-6">
          <Link to={'/theater/add'}>Thêm mới</Link>
        </Button>
        <Table className="!w-full" columns={columns} dataSource={listTheater} />
      </div>
    </DefaultLayout>
  );
};

export default TheaterList;

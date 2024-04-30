import { Button, Input, Space, Table, TableProps } from 'antd';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../core/apis/user.service';

interface DataType {
  key: number;
  _id: string;
  username: string;
  email: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  address: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Id',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Tên',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Ngày sinh',
    key: 'dateOfBirth',
    dataIndex: 'dateOfBirth',
  },
  {
    title: 'Giới tính',
    key: 'gender',
    dataIndex: 'gender',
  },
  {
    title: 'Số điện thoại',
    key: 'phoneNumber',
    dataIndex: 'phoneNumber',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: any, record: any) => (
      <Space size="middle">
        <Link to={`/user/update?id=${record._id}`}>Chỉnh sửa</Link>
        <a>Xóa</a>
      </Space>
    ),
  },
];

const UserList = () => {
  const [listUser, setListUser] = useState<DataType[]>([]);

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    const res: DataType[] = await userService.getAllUser();
    res.forEach((item, index) => {
      item.key = index;
    });
    setListUser(res);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Danh sách user" />
      <div>
        <div className='flex gap-6 !h-10'>
          <Input placeholder="Nhập thông tin tìm kiếm..." />
          <Button type="primary" className="!bg-blue-500 !h-full">
            Tìm kiếm
          </Button>
        </div>
        <Button type="primary" className="!bg-blue-500 float-right my-6">
          <Link to={'/user/add'}>Thêm mới</Link>
        </Button>
        <Table className="!w-full" columns={columns} dataSource={listUser} />
      </div>
    </DefaultLayout>
  );
};

export default UserList;

import { Button, Input, Table, TableProps } from 'antd';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { voucherService } from '../../core/apis/voucher.service';

interface DataType {
  key: number;
  _id: string;
  genre: string[];
  discountPercentage: number;
  isUsed: boolean;
  expirationDate: string;
  termsAndConditions: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Mã voucher',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'Thể loại',
    dataIndex: 'genre',
    key: 'genre',
  },
  {
    title: 'Giảm giá',
    dataIndex: 'discountPercentage',
    key: 'discountPercentage',
    render: (discountPercentage: string) => discountPercentage+'%',
  },
  {
    title: 'Trạng thái',
    key: 'isUsed',
    dataIndex: 'isUsed',
    render: (isUsed: boolean) => (isUsed ? 'Đã dùng' : 'Chưa dùng'),
  },
  {
    title: 'Ngày hết hạn',
    key: 'expirationDate',
    dataIndex: 'expirationDate',
  },
  {
    title: 'Điều khoản',
    key: 'termsAndConditions',
    dataIndex: 'termsAndConditions',
  },
];

const ListVoucher = () => {
  const [listVoucher, setListVoucher] = useState<DataType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const email = searchParams.get('email');

  useEffect(() => {
    getListVoucher();
  }, [searchParams.get('email')]);

  const getListVoucher = async () => {
      
    if (email) {
        const res: DataType[] = await voucherService.getVoucherByEmail(email);
      res.forEach((item, index) => {
        item.key = index;
      });
      setListVoucher(res);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Danh sách voucher của ${email}`} />
      <div>
        <div className="flex gap-6 !h-10">
          <Input placeholder="Nhập thông tin tìm kiếm..." />
          <Button type="primary" className="!bg-blue-500 !h-full">
            Tìm kiếm
          </Button>
        </div>
        <Button type="primary" className="!bg-blue-500 float-left my-6">
          <Link to={`/voucher/list`}>Back</Link>
        </Button>
        <Button type="primary" className="!bg-blue-500 float-right my-6">
          <Link to={`/voucher/add?email=${email}`}>Thêm mới</Link>
        </Button>
        <Table className="!w-full" columns={columns} dataSource={listVoucher} />
      </div>
    </DefaultLayout>
  );
};

export default ListVoucher;

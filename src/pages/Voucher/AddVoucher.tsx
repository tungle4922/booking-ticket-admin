import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { Button, Form, Input, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { voucherService } from '../../core/apis/voucher.service';

interface IBody {
  email: string;
  genre: string[];
  discountPercentage: number;
  expirationDate: string;
  termsAndConditions: string;
}

const AddVoucher = () => {
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get('email');

  const addVoucher = async () => {
    const res = await voucherService.addVoucher(form.getFieldsValue());
    if (res !== 0) {
      
      message.success('Thêm mới thành công');
      navigate(`/voucher/listvoucher?email=${email}`);
      
      
    } else {
      message.error('Có lỗi xảy ra');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Thêm mới voucher" />
      <div className="flex gap-6 w-full">
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ minWidth: 800 }}
          initialValues={{ email: email }}
        >
          <Form.Item label="Email nguời dùng" name="email">
            <Input placeholder="Nhập Email" disabled />
          </Form.Item>
          <Form.Item label="Thể loại áp dụng" name="genre">
            <Input placeholder="Nhập thể loại" />
          </Form.Item>
          <Form.Item label="% Giảm giá" name="discountPercentage">
            <Input placeholder="% Giảm giá" />
          </Form.Item>
          <Form.Item label="Ngày hết hạn" name="expirationDate">
            <Input placeholder="Ngày hết hạn" />
          </Form.Item>
          <Form.Item label="Điều khoản" name="termsAndConditions">
            <Input placeholder="Điều khoản" />
          </Form.Item>
          <div className="flex gap-2 float-right mr-[200px]">
            <Button
              onClick={() => navigate(`/voucher/listvoucher?email=${email}`)}
            >
              Hủy
            </Button>
            <Form.Item>
              <Button
                onClick={addVoucher}
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

export default AddVoucher;

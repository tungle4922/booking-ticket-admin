import  { AxiosResponse } from 'axios';
import { axiosInstance } from '../shared/axios';

const baseUrl = '/voucher';

class VoucherService {
  async getVoucherByEmail(email: string) {
    try {
      const res: AxiosResponse = await axiosInstance.get(
        baseUrl+ '/getVoucherByEmail?email=' + email,
      );
      return res.data?.vouchers;
    } catch (err) {
      return err;
    }
  }

  async addVoucher(body: any) {
    try {
      const res: AxiosResponse = await axiosInstance.post(
        baseUrl + '/addVoucher',
        body,
      );
      return res.data;
    } catch (err) {
      return 0;
    }
  }
}

export const voucherService = new VoucherService();

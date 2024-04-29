import { AxiosResponse } from 'axios';
import { axiosInstance } from '../shared/axios';

const baseUrl = '/user';

class UserService {
  async login(body: any) {
    try {
      const res: AxiosResponse = await axiosInstance.post('/admin/login', body);
      return res.data;
    } catch (err) {
      return err;
    }
  }

  async register(body: any) {
    try {
      const res: AxiosResponse = await axiosInstance.post(
        baseUrl + '/signup',
        body,
      );
      return res.data;
    } catch (err) {
      return 0;
    }
  }

  async getUserInfo(id: string) {
    try {
      const res: AxiosResponse = await axiosInstance.get(baseUrl + '/' + id);
      return res.data?.user;
    } catch (err) {
      return err;
    }
  }

  async getAllUser() {
    try {
      const res: AxiosResponse = await axiosInstance.get(baseUrl);
      return res.data?.users;
    } catch (err) {
      return err;
    }
  }

  async updateUserInfo(id: string, body: any) {
    try {
      const res: AxiosResponse = await axiosInstance.put(
        baseUrl + '/' + id,
        body,
      );
      return res.data?.user;
    } catch (err) {
      return 0;
    }
  }
}

export const userService = new UserService();

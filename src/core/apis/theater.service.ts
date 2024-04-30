import { AxiosResponse } from 'axios';
import { axiosInstance } from '../shared/axios';

const baseUrl = '/theater';

class TheaterService {
  async getAll() {
    const res: AxiosResponse = await axiosInstance.get(
      baseUrl + '/getAllTheater',
    );
    return res.data.theaters;
  }

  async getTheaterByName(name: string) {
    const res: AxiosResponse = await axiosInstance.get(baseUrl + '/findTheaterByName?name=' + name);
    return res.data;
  }

//   async addAMovie(body: any) {
//     try {
//       const res: AxiosResponse = await axiosInstance.post(baseUrl, body);
//       return res;
//     } catch (err) {
//       return 0;
//     }
//   }
}

export const theaterService = new TheaterService();

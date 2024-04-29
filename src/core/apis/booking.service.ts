import { AxiosResponse } from "axios";
import { axiosInstance } from "../shared/axios";

class BookingService {
  async getSeatSold(movieId: string, showTime: string, theaterId: string) {
    const res: AxiosResponse = await axiosInstance.get(
      "/bookedSeats/getBookedSeatsByParams",
      {
        params: {
          movieId: movieId,
          showTime: showTime,
          theaterId: theaterId,
        },
      }
    );
    return res?.data?.bookedSeats[0]?.bookedSeats;
  }

  async getTheaterIdByName(name: string) {
    const res: AxiosResponse = await axiosInstance.get(
      "/theater/findTheaterByName",
      {
        params: {
          name: name,
        },
      }
    );
    return res?.data?._id;
  }

  async bookingTicket(body: any) {
    try {
      const res: AxiosResponse = await axiosInstance.post("/booking/", body);
      return res.data;
    } catch (err) {
      return 0;
    }
  }

  async updateBookedSeat(body: any) {
    try {
      const res: AxiosResponse = await axiosInstance.put(
        "/bookedSeats/updateBookedSeats",
        body
      );
      return res.data;
    } catch (err) {
      return 0;
    }
  }
}

export const bookingService = new BookingService();

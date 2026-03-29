import axiosInstance from "@/app/utils/axiosInstance";

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
  college: string;
  yearOfStudy: number;
};

export const loginUser = async (data: LoginData) => {

  const response = await axiosInstance.post("/auth/login", data);

  return response.data;

};

export const registerUser = async (data: RegisterData) => {

  const response = await axiosInstance.post("/auth/register", data);

  return response.data;

};
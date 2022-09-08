import { api } from "../api";
import { GET_ALL_PEOPLES, GET_PEOPLE } from "./peopleRoutes";

interface IGetPatient {
  id: string;
}

export const getPeople = async ({ id }: IGetPatient) => {
  try {
    const response = await api.get(GET_PEOPLE(id));
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllPeoples = async () => {
  try {
    const response = await api.get(GET_ALL_PEOPLES);
    return response.data;
  } catch (error) {
    return error;
  }
};
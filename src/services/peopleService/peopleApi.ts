import { IPhone } from "../../pages/edit/[id]";
import { api } from "../api";
import { CREATE_PEOPLE, DELETE_PEOPLE, GET_ALL_PEOPLES, GET_PEOPLE, UPDATE_PEOPLE } from "./peopleRoutes";

interface ICreatePeople {
  name: string;
  birthDate: string | Date | null;
  phone: string[];
}

export const createPeople = async (data: ICreatePeople) => {
  try {
    const response = await api.post(CREATE_PEOPLE, data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

interface IDeletePeople {
  id: string;
}

export const deletePeople = async ({ id }: IDeletePeople) => {
  try {
    const response = await api.delete(DELETE_PEOPLE(id));
    return response.data;
  } catch (err) {
    throw err;
  }
};

interface IGetPatient {
  id: string;
}

export const getPeople = async ({ id }: IGetPatient) => {
  try {
    const response = await api.get(GET_PEOPLE(id));
    return response.data;
  } catch (err) {}
};

export const getAllPeoples = async () => {
  try {
    const response = await api.get(GET_ALL_PEOPLES);
    return response.data;
  } catch (err) {
    throw err;
  }
};

interface IUpdatePeople {
  id: string;
  name: string;
  birthDate: any;
  phones: IPhone[];
}

export const updatePeople = async ({ id, name, birthDate, phones }: IUpdatePeople) => {
  try {
    const response = await api.put(UPDATE_PEOPLE(id), {name, birthDate, phones});
    return response.data;
  } catch (err) {
    throw err;
  }
};
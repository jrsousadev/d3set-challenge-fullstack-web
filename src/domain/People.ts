import moment from 'moment';
import { formatPhoneNumber } from '../utils/formatPhoneNumber';

interface IPhone {
  id: string;
  peopleId: string;
  phone: string;
}

export interface IPeople {
  id: string;
  name: string;
  birthDate: string;
  birthDateISO: Date | string;
  peoplePhone: IPhone[]
}

export const mapPeople = (people: IPeople) => ({
  ...people,
  phones: mapGroupPhones(people.peoplePhone),
  birthDateISO: people.birthDate,
  birthDate: moment(people.birthDate).format('DD/MM/YYYY'),
});

export const mapArrayPeople = (listPeoples: IPeople[]) => {
  const listPeoplesFormated = listPeoples.map((people) => mapPeople(people));

  return listPeoplesFormated;
};

export const mapGroupPhones = (peoplePhones: IPhone[]) => {
  const listPhones = peoplePhones.map((value) => formatPhoneNumber(value.phone))

  return listPhones ?? [];
}
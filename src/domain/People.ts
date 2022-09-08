import moment from 'moment';

interface IPhone {
  id: string;
  phone: string;
}

export interface IPeople {
  id: string;
  name: string;
  birthDate: string;
  peoplePhone: IPhone[]
}

export const mapPeople = (people: IPeople) => ({
  ...people,
  birthDate: moment(people.birthDate).format('DD/MM/YYYY'),
});

export const mapArrayPeople = (listPeoples: IPeople[]) => {
  const listPeoplesFormated = listPeoples.map((people) => mapPeople(people));

  return listPeoplesFormated;
};
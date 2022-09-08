import { GridColDef } from '@mui/x-data-grid';

export type TableRowPeople = {
  name: string;
  birthDate: string;
  phone: string[];
}

export const TableFieldPeopleName: GridColDef = {
  field: 'name',
  headerName: 'Nome',
  width: 300,
}

export const TableFieldPeopleBirthDate: GridColDef = {
  field: 'birthDate',
  headerName: 'Data de Nascimento',
  width: 300,
}

export const TableFieldPeoplePhone: GridColDef = {
  field: 'phone',
  headerName: 'Telefone',
  width: 300,
}
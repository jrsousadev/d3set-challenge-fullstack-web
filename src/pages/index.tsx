import Head from "next/head";
import TableDataGrid from "../components/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import { Tooltip, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import {
  TableFieldPeopleBirthDate,
  TableFieldPeopleName,
  TableFieldPeoplePhone,
} from "../constants/ConfigTableDataGrid/TablePeople";
import { getAllPeoples } from "../services/peopleService/peopleApi";
import { mapArrayPeople } from "../domain/People";
import { ButtonTableActions } from "../../styles/pages";

interface IHomeProps {
  peoples: [];
}

export default function Home({ peoples }: IHomeProps) {
  return (
    <>
      <Head>
        <title>D3set - Pessoas</title>
      </Head>

      <Typography
        variant="h3"
        textAlign={"center"}
        paddingBottom="2rem"
        fontWeight="500"
      >
        Lista de Pessoas
      </Typography>

      <TableDataGrid
        columns={[
          TableFieldPeopleName,
          TableFieldPeopleBirthDate,
          TableFieldPeoplePhone,
          {
            field: "actions",
            headerName: "Ações",
            sortable: false,
            width: 150,
            renderCell: (params) => (
              <div>
                <Tooltip title="Editar">
                  <ButtonTableActions onClick={() => {}}>
                    <BorderColorIcon className="icon" />
                  </ButtonTableActions>
                </Tooltip>

                <Tooltip title="Excluir">
                  <ButtonTableActions onClick={() => {}}>
                    <DeleteIcon className="icon" />
                  </ButtonTableActions>
                </Tooltip>
              </div>
            ),
          },
        ]}
        rows={peoples}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const peoplesData = await getAllPeoples();
  const peoples = mapArrayPeople(peoplesData);

  return {
    props: {
      peoples,
    },
  };
};

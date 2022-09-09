import Head from "next/head";
import TableDataGrid from "../components/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";
import {
  TableFieldPeopleBirthDate,
  TableFieldPeopleName,
  TableFieldPeoplePhone,
} from "../constants/ConfigTableDataGrid/TablePeople";
import {
  deletePeople,
  getAllPeoples,
} from "../services/peopleService/peopleApi";
import { IPeople, mapArrayPeople } from "../domain/People";
import { ButtonTableActions } from "../../styles/pages/people";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IHomeProps {
  peoples: IPeople[];
}

export default function Home({ peoples: data }: IHomeProps) {
  const [filtered, setFiltered] = useState(false);
  const [peoples, setPeoples] = useState<IPeople[]>(data);

  useEffect(() => {
    if (filtered) {
      const peoplesFiltered: IPeople[] = peoples.filter(
        (people: IPeople) => people.peoplePhone.length >= 2
      );
      setPeoples(peoplesFiltered);
    } else {
      setPeoples(data);
    }
  }, [filtered]);

  const handleDeletePeople = async (id: string) => {
    try {
      await deletePeople({ id });

      const peoplesData = await getAllPeoples();
      const peoples = mapArrayPeople(peoplesData);
      setPeoples(peoples);

      toast.success("Pessoa deletada com sucesso");
    } catch (err) {
      toast.error("Erro interno, por favor contate a nossa equipe");
    }
  };

  return (
    <>
      <Head>
        <title>D3Set | Pessoas</title>
      </Head>

      <Typography
        variant="h3"
        textAlign={"center"}
        paddingBottom="2rem"
        fontWeight="500"
      >
        Lista de Pessoas
      </Typography>

      <FormControlLabel
        style={{
          display: "flex",
          maxWidth: "350px",
          width: "100%",
          alignItems: "center",
          margin: "auto",
        }}
        control={
          <Checkbox
            checked={filtered}
            onChange={() => setFiltered(!filtered)}
          />
        }
        label="Filtrar pessoas com mais de um número"
      />

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
                  <ButtonTableActions
                    onClick={() => handleDeletePeople(String(params.id))}
                  >
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

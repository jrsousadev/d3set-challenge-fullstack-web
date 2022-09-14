import { Button, TextField, Typography } from "@mui/material";
import Head from "next/head";
import {
  BoxWrapper,
  ContainerBoxWrapper,
  ContainerRangeBoxInfo,
  FormControlWrapper,
  RangeBox,
} from "../../../styles/pages/people/create";
import { FiUserPlus } from "react-icons/fi";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { useEffect, useState } from "react";
import { InputComponent } from "../../components/InputComponent";
import { BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import {
  getPeople,
  updatePeople,
} from "../../services/peopleService/peopleApi";
import { IPeople, mapPeople } from "../../domain/People";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import moment from "moment";
import { removeCharSpecial } from "../../utils/removeCharSpecial";

export interface IPhone {
  id: string;
  phone: string;
}

interface IEditProps {
  people: IPeople;
}

export default function Edit({ people }: IEditProps) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const [name, setName] = useState(people.name);
  const [birthDate, setBirthDate] = useState<Date | null | string>(
    people.birthDateISO
  );
  const [phone, setPhone] = useState(people.peoplePhone[0].phone);
  const [phoneTwo, setPhoneTwo] = useState(people.peoplePhone[1]?.phone);

  useEffect(() => {
    setStep(people.peoplePhone.length);
  }, []);

  const handleNextStep = () => {
    if (step !== 2) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    if (step === 1) {
      if (phoneTwo !== "") setPhoneTwo("");
    }
  }, [step]);

  const handleCreatePeople = async () => {
    setLoading(true);
    try {
      if (name === "" || phone === "") {
        throw Error("Preencha todos os campos obrigatórios");
      }

      const phones: IPhone[] = [
        { id: people.peoplePhone[0].id, phone: removeCharSpecial(phone) },
        { id: people.peoplePhone[1]?.id, phone: removeCharSpecial(phoneTwo) },
      ];

      await updatePeople({
        birthDate: String(moment(birthDate).format("YYYY-MM-DD")) + 'T03:00:00.000' ,
        name,
        phones,
        id: people.id,
      });

      toast.success("Pessoa cadastrada com sucesso!");
    } catch (err) {
      console.log(err);
      if (String(err) !== "Error: Preencha todos os campos obrigatórios")
        toast.error("Um dos números já cadastrado!");
      else toast.error(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>D3Set | {people.name}</title>
      </Head>

      <Typography
        variant="h3"
        textAlign={"center"}
        paddingBottom="2rem"
        fontWeight="500"
      >
        {people.name}
      </Typography>

      <BoxWrapper>
        <RangeBox>
          <ContainerRangeBoxInfo>
            <FiUserPlus size={22} />
            <Typography variant="button">Cadastro</Typography>
          </ContainerRangeBoxInfo>
        </RangeBox>
        <ContainerBoxWrapper>
          <FormControlWrapper columns="0.4fr 0.4fr">
            <InputComponent
              label="Nome"
              value={name}
              handleChange={(e) => setName(e.target.value)}
              required={true}
            />
            <DesktopDatePicker
              label="Data de nascimento"
              inputFormat="DD/MM/YYYY"
              value={birthDate}
              onChange={(newDate) => setBirthDate(newDate)}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FormControlWrapper>

          <FormControlWrapper columns="0.4fr" style={{ paddingBottom: "2rem" }}>
            <InputComponent
              label="Telefone"
              value={phone}
              handleChange={(e) => setPhone(e.target.value)}
              mask="PHONE"
              required={true}
            />
            {step >= 2 && (
              <div
                style={{
                  display: "grid",
                  gridGap: "5px",
                  gridTemplateColumns: "1fr 0.1fr",
                }}
              >
                <InputComponent
                  label="Telefone 2"
                  value={phoneTwo}
                  handleChange={(e) => setPhoneTwo(e.target.value)}
                  mask="PHONE"
                  required={false}
                />
                <Button variant="contained" onClick={handlePreviousStep}>
                  <BiTrash size={18} />
                </Button>
              </div>
            )}
            <Button disabled={step >= 2} onClick={handleNextStep}>
              Adicionar mais um telefone
            </Button>
          </FormControlWrapper>

          <FormControlWrapper columns="0.2fr 0.2fr">
            <ButtonPrimary
              variant="contained"
              style={{ height: "40px" }}
              loading={loading}
              onHandleClick={handleCreatePeople}
            >
              Atualizar
            </ButtonPrimary>
            <ButtonPrimary
              variant="outlined"
              style={{ height: "40px" }}
              href="/"
            >
              Voltar
            </ButtonPrimary>
          </FormControlWrapper>
        </ContainerBoxWrapper>
      </BoxWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { id } = ctx.query;

  const peopleData = await getPeople({ id: String(id) });

  if (!peopleData) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const people = mapPeople(peopleData);

  return {
    props: {
      people,
    },
  };
};

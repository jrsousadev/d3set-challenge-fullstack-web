import { Button, TextField, Typography } from "@mui/material";
import Head from "next/head";
import {
  BoxWrapper,
  ContainerBoxWrapper,
  ContainerRangeBoxInfo,
  FormControlWrapper,
  RangeBox,
} from "../../styles/pages/people/create";
import { FiUserPlus } from "react-icons/fi";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { ButtonPrimary } from "../components/ButtonPrimary";
import { useEffect, useState } from "react";
import { InputComponent } from "../components/InputComponent";
import { BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import { createPeople } from "../services/peopleService/peopleApi";

export default function Create() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null | string>(new Date());
  const [phone, setPhone] = useState("");
  const [phoneTwo, setPhoneTwo] = useState("");
  const [phoneThree, setPhoneThree] = useState("");

  const handleNextStep = () => {
    if (step !== 3) {
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

    if (step === 2) {
      if (phoneThree !== "") setPhoneThree("");
    }
  }, [step]);

  const handleCreatePeople = async () => {
    setLoading(true);
    try {
      if (name === "" || phone === "") {
        throw Error("Preencha todos os campos obrigatórios");
      }

      const phones: string[] = [phone, phoneTwo, phoneThree];

      await createPeople({
        birthDate,
        name,
        phone: phones,
      });

      toast.success("Pessoa cadastrada com sucesso!");
    } catch (err) {
      if (String(err) !== "Error: Preencha todos os campos obrigatórios")
        toast.error("Um dos números já cadastrado!");
      else toast.error(String(err));
    } finally {
      setLoading(false);
      setName("");
      setPhone("");
      setBirthDate(new Date());
      setPhoneTwo("");
      setPhoneThree("");
    }
  };

  return (
    <>
      <Head>
        <title>D3Set | Cadastrar</title>
      </Head>

      <Typography
        variant="h3"
        textAlign={"center"}
        paddingBottom="2rem"
        fontWeight="500"
      >
        Cadastrar Pessoa
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
            {step === 3 && (
              <div
                style={{
                  display: "grid",
                  gridGap: "5px",
                  gridTemplateColumns: "1fr 0.1fr",
                }}
              >
                <InputComponent
                  label="Telefone 3"
                  value={phoneThree}
                  handleChange={(e) => setPhoneThree(e.target.value)}
                  mask="PHONE"
                  required={false}
                />
                <Button variant="contained" onClick={handlePreviousStep}>
                  <BiTrash size={18} />
                </Button>
              </div>
            )}
            <Button disabled={step >= 3} onClick={handleNextStep}>
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
              Cadastrar
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

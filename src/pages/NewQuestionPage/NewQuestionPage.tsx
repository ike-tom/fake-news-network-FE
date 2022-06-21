import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/Forms/Input/Input";
import Textarea from "../../components/Forms/Textarea/Textarea";
import Select from "../../components/Forms/Select/Select";
import styles from "./NewQuestionPage.module.scss";
import { CATEGORIES } from "../../constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import NewQuestionValidation from "../../validation/NewQuestionValidation";
import SubmitButton from "../../components/Forms/SubmitButton/SubmitButton";
import { useApiSend } from "../../hooks/useApi";
import { CREATE_QUESTION_ENDPOINT } from "../../urls/api";
import { Navbar } from "../../components/Navbar/Navbar";
import Label from "../../components/Forms/Label/Label";
import { Card } from "../../components/Card/Card";

interface NewQuestionData {
  content: string;
  answers: boolean;
  explanation: string;
  category: typeof CATEGORIES;
  link: string;
}

export const NewQuestionPage = () => {
  const methods = useForm<NewQuestionData>({
    resolver: yupResolver(NewQuestionValidation),
    mode: "onTouched",
  });
  const { handleSubmit, reset } = methods;

  const { mutate: apiSend } = useApiSend();

  function onSubmit(data: NewQuestionData) {
    const { answers: dataAnswer } = data;
    const answers = [
      {
        content: "True",
        correct: dataAnswer,
      },
    ];
    const payload = { ...data, answers };

    apiSend({ path: CREATE_QUESTION_ENDPOINT, data: payload });
    reset();
  }

  const data = (
    <FormProvider {...methods}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <Textarea id="content" label="Pytanie" />
        </div>
        <div>
          <Label htmlFor="answers">Odpowiedź</Label>
          <div className={styles.answersContainer}>
            <Label>Prawda</Label>
            <Input id="answers" type="radio" value="true" checked />
            <Label>Fałsz</Label>
            <Input id="answers" type="radio" value="false" />
          </div>
        </div>
        <div>
          <Textarea id="explanation" label="Wyjaśnienie" />
        </div>
        <div>
          <Select id="category" label="Kategoria" />
        </div>
        <div>
          <Input id="link" label="Źródło" />
        </div>
        <SubmitButton />
      </form>
    </FormProvider>
  );

  return (
    <>
      <Navbar />
      <div className={styles.formContainer}>
        <Card data={data} />
      </div>
    </>
  );
};

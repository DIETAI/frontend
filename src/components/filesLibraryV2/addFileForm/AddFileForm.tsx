import React, { useState, useEffect, useRef } from "react";
import axiosDietAI from "utils/api";
import axios from "axios";

import { useForm, FormProvider, FieldValues } from "react-hook-form";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//schema
import { addFileSchema } from "./AddFileForm.schema";
import { yupResolver } from "@hookform/resolvers/yup";

//interfaces
import { IAddFileSchema } from "./AddFileForm.schema";

//styles
import * as Styled from "./AddFileForm.styles";

//components
import Input from "components/form/input/Input";
import Button from "components/form/button/Button";
import ReactLoading from "react-loading";
import ImageSelect from "components/form/images/imageSelect/ImageSelect";

//firebase
import { storage } from "utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

//icons
import { FaFileAlt } from "icons/icons";
import { mutate } from "swr";

const BUCKET_URL = "https://diet-ai.s3.eu-central-1.amazonaws.com";

const defaultValues = addFileSchema.cast({});

interface IAddFileFormProps {
  closeForm: () => void;
}

const AddFileForm = ({ closeForm }: IAddFileFormProps) => {
  const { handleAlert } = useAlert();
  const [imageUpload, setImageUpload] = useState<string>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const methods = useForm({
    resolver: yupResolver(addFileSchema),
    shouldUnregister: false,
    defaultValues,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid, isSubmitSuccessful },
    trigger,
    reset,
    setFocus,
    getValues,
    setValue,
    watch,
  } = methods;

  const imageTitle = getValues("title");

  const onSubmit = async (data: IAddFileSchema) => {
    console.log({ data });
    console.log("wysyłanie zdjęcia");

    try {
      const newAsset = await axiosDietAI.post("/api/v1/assets", data, {
        withCredentials: true,
      });
      console.log({ newAsset });
      handleAlert("success", "Dodano nowe zdjęcie");
      await mutate(`/api/v1/assets`);
      closeForm();
    } catch (e) {
      console.log(e);
      handleAlert("error", "Dodawanie zdjęcia nie powiodło się");
    }
  };

  const uploadImage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    fileInputRef.current?.click();
  };

  const onChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;
    console.log({ uploadFile: file });

    const data = {
      name: file.name,
      type: file.type,
    };

    try {
      const awsS3Url = await axiosDietAI.post("/api/v1/assets/upload", data, {
        withCredentials: true,
      });

      console.log({ awsS3Url: awsS3Url.data });

      const uploadedImage = await axios.put(awsS3Url.data, file, {
        headers: {
          "Content-type": file.type,
        },
      });

      console.log({ imageURL: awsS3Url.data.split("?")[0] });

      console.log({ uploadedImage });

      setImageUpload(`${BUCKET_URL}/${file.name}`);
    } catch (e) {
      console.log(e);
      handleAlert("error", "Dodawanie pliku nie powiodło się");
    }

    // if (file && file?.type?.substring(0, 5) === "image") {
    //   const imageRef = ref(storage, `images/${file.name + uuidv4()}`);
    //   console.log({ imageRef });
    //   uploadBytes(imageRef, file).then((data) => {
    //     // alert("image uploaded");
    //     console.log("imageUpload");
    //     console.log({ image: data });
    //     getDownloadURL(data.ref).then((url) => {
    //       console.log({ imageURL: url });
    //       //save image to database

    //       setImageUpload(url);
    //       setValue("imageURL", url);
    //       if (!imageTitle) {
    //         setValue("title", file.name);
    //       }
    //       onSubmit(getValues());
    //     });
    //   });
    // }
  };

  return (
    <Styled.AddFileFormContainer>
      <FormProvider {...methods}>
        <Styled.AddFileFormWrapper
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <Input name="title" label="nazwa" type="text" fullWidth />
          <Input
            name="description"
            label="opis"
            type="text"
            textarea
            fullWidth
          />

          {imageUpload && <img src={imageUpload} />}

          <>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={onChangeImage}
            />
            <ImageSelect
              icon={<FaFileAlt />}
              text="wstaw plik"
              fullWidth
              onClick={uploadImage as () => void}
            />
          </>

          <Button fullWidth>zapisz</Button>
        </Styled.AddFileFormWrapper>
      </FormProvider>
    </Styled.AddFileFormContainer>
  );
};

export default AddFileForm;

import React, { useState, useEffect, useRef } from "react";
import axiosDietAI from "utils/api";
import axios from "axios";

import { useForm, FormProvider, FieldValues } from "react-hook-form";

//context
import { useAlert } from "layout/dashboard/context/alert.context";

//schema
import { editFileSchema } from "./EditFileForm.schema";
import { yupResolver } from "@hookform/resolvers/yup";

//interfaces
import { IEditFileSchema } from "./EditFileForm.schema";

//styles
import * as Styled from "./EditFileForm.styles";

//components
import Input from "components/form/input/Input";
import Button from "components/form/button/Button";
import ReactLoading from "react-loading";
import ImageSelect from "components/form/images/imageSelect/ImageSelect";
import Heading from "components/heading/Heading";
import IconButton from "components/iconButton/IconButton";

//icons
import { FaFileAlt, FaTimes, FaEdit } from "icons/icons";
import { mutate } from "swr";

//assets
import { IAssetData } from "interfaces/asset.interfaces";
import { sumImagesSize, maxImagesSize } from "../FilesLibrary";
import LogoBackground from "assets/logo-icon.svg";

interface IEditFileFormProps {
  closeForm: () => void;
  assets: IAssetData[];
  editAsset: IAssetData;
}

interface IAwsURLResponse {
  url: string;
  key: string;
}

const schemaValues = editFileSchema.cast({});

const EditFileForm = ({ closeForm, assets, editAsset }: IEditFileFormProps) => {
  const { handleAlert } = useAlert();
  const [imageUpload, setImageUpload] = useState<string>(editAsset.imageURL);
  const [imageSizeError, setImageSizeError] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultValues = {
    ...schemaValues,
    title: editAsset.title,
    description: editAsset.description,
    // file: getFileBlob(fetch)
  };

  useEffect(() => {
    const fileURL = editAsset.imageURL;
    // Use the fetch function to retrieve the file contents from the URL
    fetch(fileURL)
      .then((response) => response.blob())
      .then((blob) => {
        // Use the Blob object as needed
        console.log(blob);
      });
  }, []);

  const methods = useForm({
    resolver: yupResolver(editFileSchema),
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
    setError,
    watch,
  } = methods;

  const imageTitle = getValues("title");

  const onSubmit = async (data: IEditFileSchema) => {
    console.log({ data });
    console.log("wysyłanie zdjęcia");

    const fileData = {
      name: data.file.name,
      type: data.file.type,
      size: data.file.size,
    };

    try {
      const awsS3Url = await axiosDietAI.post<IAwsURLResponse>(
        "/api/v1/assets/upload",
        fileData,
        {
          withCredentials: true,
        }
      );

      console.log({ awsS3Url: awsS3Url.data.url });

      const uploadedImage = await axios.put(awsS3Url.data.url, data.file, {
        headers: {
          // "Content-Type": "multipart/form-data",
          "Content-Type": data.file.type,
        },
      });

      const imageURL = awsS3Url.data.url.split("?")[0];

      console.log({ imageURL, uploadedImage });

      // setImageUpload(`${BUCKET_URL}/${file.name}`);

      const newAssetData = {
        title: data.title,
        description: data.description,
        imageURL,
        size: data.file.size,
        key: awsS3Url.data.key,
      };

      //add new asset
      const newAsset = await axiosDietAI.post("/api/v1/assets", newAssetData, {
        withCredentials: true,
      });
      console.log({ newAsset });
      handleAlert("success", "Dodano nowe zdjęcie");
      await mutate(`/api/v1/assets`);
      closeForm();
    } catch (e) {
      console.log(e);
      handleAlert("error", "Dodawanie pliku nie powiodło się");
    }

    // try {
    //   const newAsset = await axiosDietAI.post("/api/v1/assets", data, {
    //     withCredentials: true,
    //   });
    //   console.log({ newAsset });
    //   handleAlert("success", "Dodano nowe zdjęcie");
    //   await mutate(`/api/v1/assets`);
    //   closeForm();
    // } catch (e) {
    //   console.log(e);
    //   handleAlert("error", "Dodawanie zdjęcia nie powiodło się");
    // }
  };

  const uploadImage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    fileInputRef.current?.click();
  };

  const onChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;
    console.log({ uploadFile: file });

    const imagesSize = sumImagesSize(assets) + file.size;

    console.log({ imagesSize });

    if (imagesSize > maxImagesSize) {
      console.log("Przekroczono dozwolony limit rozmiaru plików");
      return setImageSizeError(true);
    }

    setImageSizeError(false);

    const reader = new FileReader();

    reader.onerror = () => {
      console.log("reader error");
    };

    reader.onloadend = () => {
      setImageUpload(reader.result as string);
    };

    reader.readAsDataURL(file);
    console.log({ reader });

    setValue("file", file);
    setValue("title", file.name);
    trigger();
  };

  const deleteImage = () => {
    setValue("file", undefined);
    setImageUpload("");
    trigger();
  };

  return (
    <Styled.AddFileFormContainer>
      <FormProvider {...methods}>
        <Styled.AddFileFormWrapper
          onSubmit={handleSubmit(onSubmit as any)}
          autoComplete="off"
        >
          <Styled.AssetHeadingWrapper>
            <Heading icon={<FaEdit />} title={"Edytuj plik"} />
            <IconButton icon={<FaTimes />} onClick={closeForm} />
          </Styled.AssetHeadingWrapper>

          <Input name="title" label="nazwa" type="text" fullWidth />
          <Input
            name="description"
            label="opis"
            type="text"
            textarea
            fullWidth
          />

          {imageUpload ? (
            <Styled.ImageWrapper
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <img className="backgroundImg" src={LogoBackground} />
              <img className="itemImg" src={imageUpload} />
              <Styled.DeleteFileOptionWrapper>
                <IconButton
                  variant="delete"
                  icon={<FaTimes />}
                  onClick={deleteImage}
                />
              </Styled.DeleteFileOptionWrapper>
            </Styled.ImageWrapper>
          ) : (
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
          )}

          {imageSizeError && (
            <Styled.ImagesSizeErrorWrapper>
              <p>Przekroczono dozwolony limit rozmiaru plików</p>
            </Styled.ImagesSizeErrorWrapper>
          )}

          <Button
            type="submit"
            variant={isSubmitting || !isValid ? "disabled" : "primary"}
            fullWidth
          >
            zapisz
          </Button>
        </Styled.AddFileFormWrapper>
      </FormProvider>
    </Styled.AddFileFormContainer>
  );
};

export default EditFileForm;

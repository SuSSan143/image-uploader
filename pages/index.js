import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import axios from "axios";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

import styles from "../styles/Home.module.css";

const Heading = styled.h1`
  text-align: center;
  text-transform: uppercase;
  @media screen and (max-width: 401px) {
    font-size: 1.3rem;
  }
`;

const Text = styled.p`
  text-align: center;
`;

const Button = styled.button`
  cursor: pointer;
  color: white;
  border-radius: 10px;
  padding: 10px 20px;
  margin-top: 10px;
  font-size: 16px;
  border: 0;
  background: transparent;
  background-color: blue;
`;

const UploadBox = styled.div`
  @media screen and (max-width: 401px) {
    width: 95%;
  }
  @media screen and (min-width: 401px) and (max-width: 600px) {
    width: 80%;
  }
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #eee;
  box-shadow: 0 8px 8px -4px lightblue;
  border-radius: 20px;
  background-image: repeating-linear-gradient(
      165deg,
      #4ebbe9,
      #4ebbe9 18px,
      transparent 18px,
      transparent 43px,
      #4ebbe9 43px
    ),
    repeating-linear-gradient(
      255deg,
      #4ebbe9,
      #4ebbe9 18px,
      transparent 18px,
      transparent 43px,
      #4ebbe9 43px
    ),
    repeating-linear-gradient(
      -15deg,
      #4ebbe9,
      #4ebbe9 18px,
      transparent 18px,
      transparent 43px,
      #4ebbe9 43px
    ),
    repeating-linear-gradient(
      75deg,
      #4ebbe9,
      #4ebbe9 18px,
      transparent 18px,
      transparent 43px,
      #4ebbe9 43px
    );
  background-size: 3px calc(100% + 44.52px), calc(100% + 44.52px) 3px,
    3px calc(100% + 44.52px), calc(100% + 44.52px) 3px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
  animation: borderAnimation 0.5s infinite linear;
  @keyframes borderAnimation {
    from {
      background-position: 0 0, -44.52px 0, 100% -44.52px, 0 100%;
    }
    to {
      background-position: 0 -44.52px, 0 0, 100% 0, -44.52px 100%;
    }
  }
`;

const Modal = styled.dialog`
  position: relative;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  border-radius: 2px;
  border-width: 0;
  padding: 0;
  max-height: 80%;
  max-width: 80%;

  &::backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(51, 51, 51, 0.3);
    backdrop-filter: blur(1px);
    animation: none;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Progress = styled.progress`
  margin: 30px;
`;

const InnerUploadBox = styled.div`
  position: relative;
  padding: 25px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function Home() {
  const [uploadedImage, setuploadedImage] = useState({});
  const [imageWidth, setImageWidth] = useState("small");
  const [progress, setProgress] = useState({
    loaded: 0,
    total: 0,
  });
  const router = useRouter();
  const loadingModalRef = useRef(null);

  useEffect(() => {
    setImageWidth(
      window.screen.width <= 500
        ? "small"
        : 501 <= window.screen.width && window.screen.width <= 800
        ? "medium"
        : "large"
    );
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    uploadToServer(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    noClick: true,
  });

  const uploadToServer = async (image) => {
    // @ts-ignore
    loadingModalRef.current.showModal();
    const body = new FormData();
    body.append("files", image);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}api/upload`,
      body,
      {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          setProgress({
            loaded: loaded,
            total: total,
          });
        },
      }
    );
    const { data } = await response;
    await setuploadedImage(data[0].formats);
    router.push({
      pathname: "/show-image",
      query: {
        uri: data[0].formats[imageWidth].url,
        height: data[0].formats[imageWidth].height,
        width: data[0].formats[imageWidth].width,
      },
    });
  };


  return (
    <div className={styles.container}>
      <Head>
        <title>Image Uploader</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <UploadBox {...getRootProps()}>
          <InnerUploadBox>
            <Heading>Upload your images here</Heading>
            <Image
              src="/undraw_upload_re_pasx.svg"
              alt="upload bg pic"
              width={180}
              height={180}
            />
            <div>
              <input id="imageUploader" {...getInputProps()} />
              {isDragActive ? (
                <Text>Drop now ...</Text>
              ) : (
                <Text>Drag & drop your images here</Text>
              )}
            </div>
            <span>OR</span>
            <Button onClick={open}>Choose file</Button>
          </InnerUploadBox>
        </UploadBox>
      </main>
      <Modal ref={loadingModalRef}>
        <Progress max={progress.total} value={progress.loaded} />
      </Modal>
    </div>
  );
}

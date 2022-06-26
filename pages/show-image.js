import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const ImageContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LinkContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  border: 1px solid black;
  border-radius: 4px;
  margin: 10px 0;
  padding: 0 10px;

  * {
    margin: 3px 0;
  }
`;

const LinkText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 320px;
  @media screen and (max-width: 320px) {
    width: 200px;
  }
  @media screen and (min-width: 500px) {
    font-size: 1rem;
  }
`;

const HomeLink = styled.a`
  cursor: pointer;
  color: white;
  padding: 10px 15px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  background-color: blue;
  @media screen and (min-width: 500px) {
    font-size: 1rem;
  }
`;

const CopyButton = styled.button`
  cursor: pointer;
  color: white;
  padding: 8px 5px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  background-color: blue;
  @media screen and (min-width: 500px) {
    font-size: 1rem;
  }
`;

const StyledImage = styled(Image)`
  border-radius: 10px;
`;

const ShowImage = ({ uri, height, width }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`${uri}`)
      .then(() => {
        alert(
          `Coppied ${uri} to clipboard`
        );
      });
  };

  return (
    <>
      <Head>
        <title>My Image</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href={`${uri}`}
        />
      </Head>

      <ImageContainer>
        <StyledImage
          src={`${uri}`}
          height={parseInt(height)}
          width={parseInt(width)}
          alt="uploadedImage"
        />
        <LinkContainer>
          <LinkText>
            {`${uri}`}
          </LinkText>
          <CopyButton onClick={copyToClipboard}>Copy</CopyButton>
        </LinkContainer>
        <Link href="/">
          <HomeLink>Go to Home</HomeLink>
        </Link>
      </ImageContainer>
    </>
  );
};

export default ShowImage;

export async function getServerSideProps(context) {
  const { uri, height, width } = context.query;
  return {
    props: { uri, height, width },
  };
}
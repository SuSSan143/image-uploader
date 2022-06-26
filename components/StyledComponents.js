import Image from "next/image";
import styled from "styled-components";

export const Heading = styled.h1`
  text-align: center;
  text-transform: uppercase;
  @media screen and (max-width: 401px) {
    font-size: 1.3rem;
  }
`;

export const Text = styled.p`
  text-align: center;
`;

export const Button = styled.button`
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

export const HomeButton = styled.button`
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

export const UploadBox = styled.div`
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

export const ImageContainer = styled.div`
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

export const LinkContainer = styled.div`
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

export const LinkText = styled.span`
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

export const CopyButton = styled.button`
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

export const StyledImage = styled(Image)`
  border-radius: 10px;
`;

export const Modal = styled.dialog`
  position: relative;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  border-radius: 10px;
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

export const Progress = styled.progress`
  margin: 30px;
`;

export const InnerUploadBox = styled.div`
  position: relative;
  padding: 25px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

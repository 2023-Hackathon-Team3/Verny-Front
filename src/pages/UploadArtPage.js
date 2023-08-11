import React, { useRef, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";

import TopBar from "../components/TopBar";
import MenuBar from "../components/MenuBar";
import plus from "../assets/icons/plus.svg";

const UploadArtPage = () => {
  const textareaRef = useRef(null);
  const inputRef = useRef(null);
  const [uploadImg, setUploadImg] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newPainter, setNewPainter] = useState("");
  const [newTechnique, setNewTechnique] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newType, setNewType] = useState("");

  const BASE_URL = "https://yewon1209.pythonanywhere.com";

  //textarea 길이 자동 조절
  const handleTextareaInput = () => {
    if (textareaRef.current) {
      const element = textareaRef.current;
      element.style.height = "auto";
      element.style.height = element.scrollHeight + "px";
    }
  };

  //이미지 업로드
  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadImg(e.target.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  //게시글 POST
  const uploadArt = async (e) => {
    e.preventDefault();
    await axios
      .post(`${BASE_URL}/main/postsadd/`, {
        image: uploadImg,
        title: newTitle,
        painter: newPainter,
        drawing_technique: newTechnique,
        content: newContent,
        work_year: newYear,
        type: newType,
      })
      .then((response) => {})
      .catch((error) => console.log(error));
  };

  return (
    <Wrapper>
      <TopBar />
      <UploadBtn>업로드</UploadBtn>
      <ScrollArea>
        <Container>
          <ImgContainer>
            <UploadImg>
              <img
                id="uploadImgBtn"
                src={plus}
                alt="Add Art"
                onClick={() => inputRef.current.click()}
              />
              <input
                type="file"
                ref={inputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageUpload}
              />
              {uploadImg && (
                <img id="uploadedImg" src={uploadImg} alt="Uploaded Art" />
              )}
            </UploadImg>
          </ImgContainer>
          <InfoInput>
            <AltInput>
              <span>대체텍스트</span>
              <input
                id="altText"
                placeholder="작품 이미지 관련 대체텍스트를 입력해주세요!"
              />
            </AltInput>
            <CategoryInput>
              <span>분류</span>
              <label>
                <input type="radio" name="category" value="고전미술" /> 고전미술
              </label>
              <label>
                <input type="radio" name="category" value="현대미술" /> 현대미술
              </label>
            </CategoryInput>
          </InfoInput>
          <ContentInput>
            <Content>
              <span>작품명</span>
              <input id="title" placeholder="작품명을 입력해주세요!" />
            </Content>
            <Content>
              <span>작가명</span>
              <input id="artist" placeholder="작가명을 입력해주세요!" />
            </Content>
            <Content>
              <span>기법</span>
              <input
                id="method"
                placeholder="작품에 쓰인 기법을 입력해주세요!"
              />
            </Content>
            <Content>
              <span>연도</span>
              <input
                id="year"
                placeholder="작품을 제작한 연도를 입력해주세요!"
              />
            </Content>
          </ContentInput>
          <DescriptionInput>
            <span>설명</span>
            <textarea
              ref={textareaRef}
              placeholder="작품 관련 기술, 해석을 문단별로 적어주세요!"
              onInput={handleTextareaInput}
            ></textarea>
          </DescriptionInput>
        </Container>
      </ScrollArea>
      <MenuBar />
    </Wrapper>
  );
};

export default UploadArtPage;

const Wrapper = styled.div`
  position: relative;
  margin: auto;
  width: 360px;
  height: 800px;
  background: var(--n-neutral-100, #fff);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadBtn = styled.button`
  position: absolute;
  top: 32px;
  right: 16px;
  border: none;
  border-radius: 12px;
  background: var(--p-primary-40, #00639c);
  display: inline-flex;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: var(--p-primary-100, #fff);
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const ScrollArea = styled.div`
  height: 650px;
  margin-bottom: 100px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  width: 328px;
  padding: 0px 16px 40px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`;

const ImgContainer = styled.div`
  margin-top: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const UploadImg = styled.div`
  display: flex;
  width: 328px;
  height: 264px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.5);
  #uploadedImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
  #uploadImgBtn {
    position: absolute;
    z-index: 10;
    width: 24px;
    height: 24px;
  }
`;

const InfoInput = styled.div`
  display: flex;
  padding: 0px 8px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const AltInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  span {
    color: var(--n-neutral-10, #1a1c1e);
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
  }
  input {
    display: flex;
    padding: 16px 4px;
    gap: 8px;
    align-self: stretch;
    border: none;
    outline: none;
    border-bottom: 1.5px solid var(--s-secondary-50, #6a7889);
    color: var(--s-secondary-10, #0e1d2a);
    opacity: 0.6000000238418579;
    font-family: Pretendard;
    font-size: 0.88rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;

const CategoryInput = styled.div`
  display: flex;
  height: 52px;
  min-height: 52px;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  span {
    color: var(--n-neutral-10, #1a1c1e);
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
  }
  label {
    display: flex;
    gap: 5px;
    color: var(--n-neutral-10, #1a1c1e);
    font-family: Pretendard;
    font-size: 0.88rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;

    input[type="radio"] {
      border: max(2px, 0.1rem) solid gray;
      border-radius: 50%;
      width: 0.88rem;
      height: 0.88rem;
      background-color: gray;
      transition: border-color 0.3s ease;
    }
    input[type="radio"]:checked {
      background-color: gray;
    }
  }
`;

const ContentInput = styled.div`
  display: flex;
  padding: 0px 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  span {
    width: 49px;
    color: var(--n-neutral-10, #1a1c1e);
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
  }
  input {
    width: 247px;
    display: flex;
    padding: 14px 4px;
    align-self: stretch;
    border: none;
    outline: none;
    border-bottom: 1.5px solid var(--s-secondary-50, #6a7889);
    color: var(--s-secondary-10, #0e1d2a);
    opacity: 0.6000000238418579;
    font-family: Pretendard;
    font-size: 0.88rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;

const DescriptionInput = styled.div`
  display: flex;
  padding: 0px 8px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  span {
    width: 49px;
    color: var(--n-neutral-10, #1a1c1e);
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
  }
  textarea {
    resize: none;
    overflow-y: hidden;
    outline: none;
    width: 280px;
    display: flex;
    padding: 16px;
    justify-content: center;
    border-radius: 12px;
    border: 1.5px solid var(--s-secondary-50, #6a7889);
    background: var(--n-neutral-99, #fcfcff);
    color: var(--s-secondary-10, #0e1d2a);
    font-family: Pretendard;
    font-size: 0.88rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;

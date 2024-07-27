import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  HeaderBox,
  HeaderTop,
  StyledButton,
  Logo,
  ImageContainer,
  Image,
} from "@src/styles/HeaderStyles";


import logo from "../../assets/sw_logo.png";
import image1 from "../../assets/1.jpeg";
import image2 from "../../assets/2.jpeg";
import image3 from "../../assets/3.jpg";
import image4 from "../../assets/4.jpeg";
import image5 from "../../assets/5.jpeg";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const images = [image1, image2, image3, image4, image5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <HeaderBox>
      <HeaderTop>
        <StyledButton variant="outlined" onClick={handleHomeClick}>
          STAR WARS HOME
        </StyledButton>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "var(--font-secondary)",
            fontSize: "var(--font-size-large)",
          }}
        >
          <Logo src={logo} alt="Star Wars Logo" />
        </Typography>
      </HeaderTop>
      <ImageContainer>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            style={{
              opacity: index === currentImageIndex ? 0.5 : 0,
              zIndex: index === currentImageIndex ? 0 : -1,
            }}
          />
        ))}
      </ImageContainer>
    </HeaderBox>
  );
};

export default Header;

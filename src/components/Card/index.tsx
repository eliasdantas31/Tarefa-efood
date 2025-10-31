// src/components/Card/index.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardContainer, CardImage, CardInfo, Button, Categoria, Star, Destaque } from './styles';

interface CardProps {
  image: string;
  title: string;
  rating: number;
  destaque?: string;
  category: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ image, title, rating, destaque, category, description }) => {
  const navigate = useNavigate();

  function handleSaibaMais() {
    // Mantém o comportamento original de navegação por state
    navigate('/perfil', {
      state: { image, title, rating, destaque, category, description }
    });
  }

  return (
    <CardContainer>
      {destaque ? <Destaque>{destaque}</Destaque> : null}
      <Categoria>{category}</Categoria>
      <CardImage src={image} alt={title} />
      <CardInfo>
        <div className="header">
          <h3>{title}</h3>
          <span>{rating.toFixed(1)}<Star /></span>
        </div>
        <p>{description}</p>
        <Button onClick={handleSaibaMais} aria-label={`Saiba mais sobre ${title}`}>
          Saiba mais
        </Button>
      </CardInfo>
    </CardContainer>
  );
};

export default Card;
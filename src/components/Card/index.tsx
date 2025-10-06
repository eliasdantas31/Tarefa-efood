// src/components/Card/index.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardContainer, CardImage, CardInfo, Button, Categoria } from './styles';

interface CardProps {
    image: string;
    title: string;
    rating: number;
    category: string;
    description: string;
}

const Card: React.FC<CardProps> = ({ image, title, rating, category, description }) => {
    const navigate = useNavigate();

    function handleSaibaMais() {
        navigate('/perfil', {
            state: {
                image,
                title,
                rating,
                category,
                description
            }
        });
    }

    return (
        <CardContainer>
            <Categoria>{category}</Categoria>
            <CardImage src={image} alt={title} />
            <CardInfo>
                <div className="header">
                    <span>{rating} ⭐</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>

                {/* usa o Button styled do seu styles.ts */}
                <Button type="button" onClick={handleSaibaMais} aria-label={`Saiba mais sobre ${title}`}>
                    Saiba mais
                </Button>
            </CardInfo>
        </CardContainer>
    );
};

export default Card;
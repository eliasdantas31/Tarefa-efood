import Header from '../../components/Header'
import Card from '../../components/Card'
import Footer from '../../components/Footer'
import { Container, CardsContainer } from './styles'

import Macarrao from '../../assets/Macarrao.png'
import Pizza from '../../assets/Pizza.png'
import Sushi from '../../assets/Sushi.png'

const Home = () => {
    const restaurants = [
        {
            image: Macarrao,
            title: 'La Dolce Vita Trattoria',
            rating: 4.6,
            category: 'Italiana',
            description:
                'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar.'
        },
        {
            image: Pizza,
            title: 'Pizzaria Napoli',
            rating: 4.7,
            category: 'Italiana',
            description:
                'Saboreie as melhores pizzas artesanais de São Paulo. Ingredientes frescos e entregas rápidas.'
        },
        {
            image: Sushi,
            title: 'Hioki Sushi',
            rating: 4.9,
            category: 'Japonesa',
            description:
                'Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida e qualidade garantida.'
        },
        {
            image: Macarrao,
            title: 'Trattoria Bella Pasta',
            rating: 4.5,
            category: 'Italiana',
            description:
                'Massas artesanais preparadas diariamente. O verdadeiro sabor da Itália na sua mesa.'
        },
        {
            image: Pizza,
            title: 'Forno Romano',
            rating: 4.8,
            category: 'Italiana',
            description:
                'Pizzas napolitanas assadas no forno à lenha, feitas com ingredientes selecionados.'
        },
        {
            image: Sushi,
            title: 'Tokyo Lounge',
            rating: 4.9,
            category: 'Japonesa',
            description:
                'Experimente o melhor da gastronomia oriental moderna com pratos criativos e saborosos.'
        }
    ]

    return (
        <Container>
            <Header />
            <CardsContainer>
                {restaurants.map((item) => (
                    <Card
                        key={item.title}
                        image={item.image}
                        title={item.title}
                        rating={item.rating}
                        category={item.category}
                        description={item.description}
                    />
                ))}
            </CardsContainer>
            <Footer />
        </Container>
    )
}

export default Home
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
            image: Sushi,
            title: 'Hioki Sushi',
            rating: 4.9,
            destaque: 'Destaque da semana',
            category: 'Japonesa',
            description:
                'Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida.Experimente o Japão sem sair do lar com nosso delivery!'
        },
        {
            image: Macarrao,
            title: 'La Dolce Vita Trattoria',
            rating: 4.6,
            category: 'Italiana',
            description:
                'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!'
        },
        {
            image: Macarrao,
            title: 'La Dolce Vita Trattoria',
            rating: 4.6,
            category: 'Italiana',
            description:
                'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!'
        },
        {
            image: Macarrao,
            title: 'La Dolce Vita Trattoria',
            rating: 4.6,
            category: 'Italiana',
            description:
                'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!'
        },
        {
            image: Macarrao,
            title: 'La Dolce Vita Trattoria',
            rating: 4.6,
            category: 'Italiana',
            description:
                'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!'
        },
        {
            image: Pizza,
            title: 'Pizzaria Napoli',
            rating: 4.7,
            category: 'Italiana',
            description:
                'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!'
        },
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
                        destaque={item.destaque}
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
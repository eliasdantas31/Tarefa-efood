import { Container, Background, Content } from './styles'
import logo from '../../assets/logo.png'
import fundo from '../../assets/fundo.png'

const Header = () => {
    return (
        <Container>
            <Background src={fundo} />
            <Content>
                <img src={logo} alt="efood" />
                <h1>Viva experiências gastronômicas no conforto da sua casa</h1>
            </Content>
        </Container>
    )
}

export default Header

import { Container } from './styles'
import logo from '../../assets/logo.png'

const Footer = () => {
    return (
        <Container>
            <img src={logo} alt="efood logo" />
            <div className="social">
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-twitter"></i>
            </div>
            <p>
                A efood é uma plataforma para divulgação de estabelecimentos, a
                responsabilidade pela entrega e qualidade dos produtos é toda do
                estabelecimento contratado.
            </p>
        </Container>
    )
}

export default Footer

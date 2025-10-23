import { Container } from './styles'
import logo from '../../assets/logo.png'

const Footer = () => {
    return (
        <Container>
            <img src={logo} alt="efood logo" />
            <div className="social">
                <div className='social-item'>
                    <i className="fa-brands fa-instagram"></i>
                </div>
                <div className='social-item'>
                    <i className="fa-brands fa-facebook"></i>
                </div>
                <div className='social-item'>
                    <i className="fa-brands fa-twitter"></i>
                </div>
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

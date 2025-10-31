// src/pages/Home/index.tsx
import Header from '../../components/Header'
import Card from '../../components/Card'
import Footer from '../../components/Footer'
import { Container, CardsContainer } from './styles'
import { useEffect, useState } from 'react'

type ApiRestaurant = {
  id: number
  titulo: string
  tipo: string
  avaliacao: number
  destacado: boolean
  descricao: string
  capa: string
}

function normalizeImgUrl(url?: string): string {
  const trimmed = (url || '').trim()
  if (!trimmed) return ''
  if (typeof window !== 'undefined' && window.location.protocol === 'https:' && trimmed.startsWith('http://')) {
    return trimmed.replace('http://', 'https://')
  }
  return trimmed
}

const Home = () => {
  const [restaurants, setRestaurants] = useState<ApiRestaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true)
        const res = await fetch('https://api-ebac.vercel.app/api/efood/restaurantes', { cache: 'no-store' } as RequestInit)
        if (!res.ok) throw new Error('Falha ao carregar restaurantes')
        const data: ApiRestaurant[] = await res.json()
        setRestaurants(data)
        setError(null)
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Erro inesperado'
        setError(msg)
      } finally {
        setLoading(false)
      }
    }
    fetchRestaurants()
  }, [])

  return (
    <Container>
      <Header />
      <CardsContainer>
        {loading && <p>Carregando...</p>}
        {!loading && error && <p>{error}</p>}

        {!loading && !error && restaurants.map((r) => (
          <Card
            key={r.id}
            image={normalizeImgUrl(r.capa)}
            title={r.titulo}
            rating={r.avaliacao}
            destaque={r.destacado ? 'Destaque da semana' : undefined}
            category={r.tipo}
            description={r.descricao}
          />
        ))}
      </CardsContainer>
      <Footer />
    </Container>
  )
}

export default Home
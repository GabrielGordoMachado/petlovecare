import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'
import logo from '../assets/Logo3.svg'

export default function Splash() {
  const navigate = useNavigate()
  const { admin, carregando } = useAuth()
  const [tempoOk, setTempoOk] = useState(false)

  // Marca de abertura por ~2,2s.
  useEffect(() => {
    const t = setTimeout(() => setTempoOk(true), 2200)
    return () => clearTimeout(t)
  }, [])

  // Navega quando o tempo passou e a sessao ja foi carregada do disco.
  useEffect(() => {
    if (tempoOk && !carregando) {
      navigate(admin ? '/app' : '/login', { replace: true })
    }
  }, [tempoOk, carregando, admin, navigate])

  return (
    <div className="splash">
      <img className="splash-logo" src={logo} alt="PetLove Care" />
      <div className="splash-loader" aria-hidden />
    </div>
  )
}

interface movimento {
  tipo: string
  duracao: number
  velocidade: number
  angulo: number
  movimentos: movimento[]
  vezes: number
}

interface Comandos {
  movimentos: movimento[]
}

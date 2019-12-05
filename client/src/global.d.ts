interface movimento {
  tipo: string
  duracao: number
  velocidade: number
  degrees: number
}

interface ciclo {
  movimentos: movimento[]
  vezes: number
}

interface Comandos {
  ciclos: ciclo[]
}

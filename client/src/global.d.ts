interface movimento {
  tipo: string
  duracao: number
  velocidade: number
  angulo: number
  movimentos: movimento[]
  vezes: number
  condicao: Condicao
}

interface Condicao {
  variavel: string
  valor: string
  operador: string
}

interface Comandos {
  movimentos: movimento[]
  cor_selecionada: string
}

interface movimento {
    tipo: string
    duracao: number
}

interface ciclo {
    movimentos: movimento[]
    vezes: number
}

interface Comandos {
    ciclos: ciclo[]
    velocidade: number
}
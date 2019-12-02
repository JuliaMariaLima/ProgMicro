import * as Blockly from 'blockly/core'
import 'blockly/javascript'

export function translateCode(workspace) {
  const blocks = workspace.getAllBlocks()

  const cliclo = {
    movimentos: [],
    vezes: 1,
  }

  blocks.forEach(block => {
    // TODO: condicional para while e for e if else
    const movimento = Blockly.JavaScript[block.type](block)
    cliclo.movimentos.push(movimento)
  })

  return [cliclo]
}

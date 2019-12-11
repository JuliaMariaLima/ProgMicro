import * as Blockly from 'blockly/core'
import 'blockly/javascript'

export function translateCode(blocks) {
  const movimentos = []

  blocks.forEach(block => {
    // TODO: condicional para while e for e if else
    const movimento = JSON.parse(Blockly.JavaScript[block.type](block))
    movimentos.push(movimento)
  })

  // console.log(movimentos)
  return JSON.stringify(movimentos)
}

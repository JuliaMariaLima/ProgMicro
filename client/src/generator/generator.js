import * as Blockly from 'blockly/core'
import 'blockly/javascript'

import { blockToCode } from '../utils/codeUtils'

Blockly.JavaScript['print'] = function(block) {
  var text_print = block.getFieldValue('print')
  var value_name = Blockly.JavaScript.valueToCode(
    block,
    'NAME',
    Blockly.JavaScript.ORDER_ATOMIC
  )
  // TODO: Assemble JavaScript into code variable.
  var code = `// console.log(${text_print});\n`
  return code
}

Blockly.JavaScript['girar'] = function(block) {
  var angle_angulo = block.getFieldValue('NAME')
  var dropdown_direcao = block.getFieldValue('direcao')

  // TODO: Assemble JavaScript into code variable.
  var code = { tipo: dropdown_direcao, angulo: angle_angulo }
  return code
}

Blockly.JavaScript['mover'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction')
  var dropdown_speed = block.getFieldValue('speed')
  var number_duracao = block.getFieldValue('duracao')
  var code = {
    tipo: dropdown_direction,
    velocidade: Number(dropdown_speed),
    duracao: number_duracao,
  }
  return code
}

Blockly.JavaScript['loop'] = function(block) {
  var text_vezes = block.getFieldValue('vezes')
  var childs = [...block.childBlocks_]
  var statements_movimentos = blockToCode(childs[0])

  var code = {
    vezes: text_vezes,
    movimentos: statements_movimentos,
  }
  return code
}

Blockly.JavaScript['se'] = function(block) {
  var value_condicao = Blockly.JavaScript.valueToCode(
    block,
    'condicao',
    Blockly.JavaScript.ORDER_ATOMIC
  )
  var statements_entao = blockToCode(block.childBlocks_[1])
  var statements_senao = blockToCode(block.childBlocks_[2])

  var code = {
    tipo: 'se',
    condicao: value_condicao,
    entao: statements_entao,
    senao: statements_senao,
  }
  return code
}

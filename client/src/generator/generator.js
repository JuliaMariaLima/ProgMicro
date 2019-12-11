import * as Blockly from 'blockly/core'
import 'blockly/javascript'

import { translateCode } from '../utils/codeUtils'

Blockly.JavaScript['print'] = function(block) {
  var text_print = block.getFieldValue('print')
  var value_name = Blockly.JavaScript.valueToCode(
    block,
    'NAME',
    Blockly.JavaScript.ORDER_ATOMIC
  )
  // TODO: Assemble JavaScript into code variable.
  var code = `// console.log(${text_print});\n`
  // console.log(text_print)
  return code
}

Blockly.JavaScript['girar'] = function(block) {
  var angle_angulo = block.getFieldValue('NAME')
  var dropdown_direcao = block.getFieldValue('direcao')
  // console.log(dropdown_direction)
  // console.log(number_duracao)
  // TODO: Assemble JavaScript into code variable.
  var code = { tipo: dropdown_direcao, angulo: angle_angulo }
  return JSON.stringify(code)
}

Blockly.JavaScript['mover'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction')
  var dropdown_speed = block.getFieldValue('speed')
  var number_duracao = block.getFieldValue('duracao')
  // console.log(dropdown_direction)
  // console.log(dropdown_speed)
  // console.log(number_duracao)
  // TODO: Assemble JavaScript into code variable.
  var code = {
    tipo: dropdown_direction,
    velocidade: Number(dropdown_speed),
    duracao: number_duracao,
  }
  return JSON.stringify(code)
}

Blockly.JavaScript['loop'] = function(block) {
  var text_vezes = block.getFieldValue('vezes')
  var statements_movimentos = translateCode(block.childBlocks_)
  console.log(block)
  // console.log(dropdown_direction)
  // console.log(dropdown_speed)
  // console.log(number_duracao)
  // TODO: Assemble JavaScript into code variable.
  console.log(statements_movimentos)
  var code = {
    vezes: text_vezes,
    movimentos: JSON.parse(statements_movimentos),
  }
  return JSON.stringify(code)
}

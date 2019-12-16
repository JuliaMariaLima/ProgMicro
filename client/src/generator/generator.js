import * as Blockly from 'blockly/core'
import 'blockly/javascript'

import { blockToCode, translateCode } from '../utils/codeUtils'

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
  var value_condicao = blockToCode(block.childBlocks_[0])
  var statements_satisfeita = blockToCode(block.childBlocks_[1])
  var statements_insatisfeita = blockToCode(block.childBlocks_[2])
  if (value_condicao.length) value_condicao = value_condicao.filter(Boolean)
  console.log(value_condicao)
  var code = {
    tipo: 'se',
    condicao: value_condicao,
    satisfeita: block.childBlocks_.length > 1 ? statements_satisfeita : [],
    insatisfeita: block.childBlocks_.length > 2 ? statements_insatisfeita : [],
  }
  return code
}

Blockly.JavaScript['distancia'] = function(block) {
  var dropdown_operador = block.getFieldValue('operador')
  var text_valor = block.getFieldValue('valor')

  var code = {
    variavel: 'distanca',
    operador: dropdown_operador,
    valor: text_valor,
  }

  return code
}
Blockly.JavaScript['distancia_percorrida'] = function(block) {
  var dropdown_operador = block.getFieldValue('operador')
  var text_valor = block.getFieldValue('valor')

  var code = {
    variavel: 'distancia_percorrida',
    operador: dropdown_operador,
    valor: text_valor,
  }

  return code
}
Blockly.JavaScript['posicao_cor'] = function(block) {
  var text_valor = block.getFieldValue('valor')

  var code = {
    variavel: 'posicao_cor',
    operador: 'igual',
    valor: text_valor,
  }

  return code
}
Blockly.JavaScript['and'] = function(block) {
  console.log(block)
  var code = blockToCode(block.childBlocks_[0])

  return code
}
Blockly.JavaScript['programa'] = function(block) {
  var movimentos = []
  var checkbox_cor_selecionada =
    block.getFieldValue('cor_selecionada') == 'TRUE'
  var dropdown_cor = block.getFieldValue('cor')

  block.childBlocks_.forEach(child => {
    var mov = blockToCode(child)
    movimentos.push(...mov)
  })

  var code = {
    movimentos,
    cor: checkbox_cor_selecionada ? dropdown_cor : undefined,
  }
  return code
}
Blockly.JavaScript['parar'] = function(block) {
  return {
    tipo: 'parar',
  }
}

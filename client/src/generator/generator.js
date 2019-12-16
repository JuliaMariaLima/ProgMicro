import * as Blockly from 'blockly/core'
import 'blockly/javascript'

import { blockToCode } from '../utils/codeUtils'

Blockly.JavaScript['print'] = function(block) {
  var text_print = block.getFieldValue('print')
  console.log(text_print)
  // TODO: Assemble JavaScript into code variable.
  return 'imprimir'
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
  var number_distancia = block.getFieldValue('distancia')
  var code = {
    tipo: dropdown_direction,
    velocidade: Number(dropdown_speed),
    distancia: number_distancia,
  }
  return code
}

Blockly.JavaScript['loop'] = function(block) {
  var text_vezes = block.getFieldValue('vezes')
  var movimentos = block.getInputTargetBlock('movimentos')
  var statements_movimentos = blockToCode(movimentos)

  var code = {
    tipo: 'por',
    vezes: Number(text_vezes),
    comandos: statements_movimentos,
  }
  return code
}

Blockly.JavaScript['se'] = function(block) {
  var condicao = block.getInputTargetBlock('condicao')
  var satisfeita = block.getInputTargetBlock('satisfeita')
  var insatisfeita = block.getInputTargetBlock('insatisfeita')

  var value_condicao = condicao ? blockToCode(condicao) : []
  var statements_satisfeita = satisfeita ? blockToCode(satisfeita) : []
  var statements_insatisfeita = insatisfeita ? blockToCode(insatisfeita) : []

  var code = {
    tipo: 'se',
    condicao: value_condicao,
    satisfeita: statements_satisfeita,
    insatisfeita: statements_insatisfeita,
  }
  return code
}

Blockly.JavaScript['enquanto'] = function(block) {
  var condicao = block.getInputTargetBlock('condicao')
  var comandos = block.getInputTargetBlock('comandos')

  var value_condicao = condicao ? blockToCode(condicao) : []
  var statements_comandos = comandos ? blockToCode(comandos) : []

  var code = {
    tipo: 'enquanto',
    condicao: value_condicao,
    comandos: statements_comandos,
  }
  return code
}

Blockly.JavaScript['distancia'] = function(block) {
  var dropdown_operador = block.getFieldValue('operador')
  var text_valor = block.getFieldValue('valor')

  var code = {
    variavel: 'distancia',
    operador: dropdown_operador,
    valor: Number(text_valor),
  }

  return code
}
Blockly.JavaScript['distancia_percorrida'] = function(block) {
  var dropdown_operador = block.getFieldValue('operador')
  var text_valor = block.getFieldValue('valor')

  var code = {
    variavel: 'distancia_percorrida',
    operador: dropdown_operador,
    valor: Number(text_valor),
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
  var one = block.getInputTargetBlock('one')
  var two = block.getInputTargetBlock('two')

  var code_one = blockToCode(one)
  var code_two = blockToCode(two)

  return [...code_one, ...code_two]
}
Blockly.JavaScript['programa'] = function(block) {
  var movimentos = []
  var checkbox_cor_selecionada =
    block.getFieldValue('cor_selecionada') === 'TRUE'
  var dropdown_cor = block.getFieldValue('cor')

  block.childBlocks_.forEach(child => {
    var mov = blockToCode(child)
    movimentos.push(...mov)
  })

  var code = {
    comandos: movimentos,
    cor: checkbox_cor_selecionada ? dropdown_cor : undefined,
  }
  return code
}
Blockly.JavaScript['parar'] = function(block) {
  return {
    tipo: 'parar',
  }
}

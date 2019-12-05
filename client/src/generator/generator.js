/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Define generation methods for custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// More on generating code:
// https://developers.google.com/blockly/guides/create-custom-blocks/generating-code

import * as Blockly from 'blockly/core'
import 'blockly/javascript'

Blockly.JavaScript['print'] = function(block) {
  var text_print = block.getFieldValue('print')
  var value_name = Blockly.JavaScript.valueToCode(
    block,
    'NAME',
    Blockly.JavaScript.ORDER_ATOMIC
  )
  // TODO: Assemble JavaScript into code variable.
  var code = `console.log(${text_print});\n`
  console.log(text_print)
  return code
}

Blockly.JavaScript['girar'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction')
  var number_duracao = block.getFieldValue('duracao')
  console.log(dropdown_direction)
  console.log(number_duracao)
  // TODO: Assemble JavaScript into code variable.
  var code = { tipo: dropdown_direction, duracao: number_duracao }
  return code
}

Blockly.JavaScript['mover'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction')
  var dropdown_speed = block.getFieldValue('speed')
  var number_duracao = block.getFieldValue('duracao')
  console.log(dropdown_direction)
  console.log(dropdown_speed)
  console.log(number_duracao)
  // TODO: Assemble JavaScript into code variable.
  var code = {
    tipo: dropdown_direction,
    velocidade: Number(dropdown_speed),
    duracao: number_duracao,
  }
  return code
}

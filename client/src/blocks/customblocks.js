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
 * @fileoverview Define custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// More on defining blocks:
// https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks

import * as Blockly from 'blockly/core'

// Since we're using json to initialize the field, we'll need to import it.
import '../fields/BlocklyReactField'

var testReactField = {
  type: 'print',
  message0: 'Print %1 %2',
  args0: [
    {
      type: 'field_input',
      name: 'print',
      text: 'fill this space',
    },
    {
      type: 'input_value',
      name: 'NAME',
      check: 'String',
    },
  ],
  previousStatement: null,
  colour: 345,
  tooltip: '',
  helpUrl: '',
}

Blockly.Blocks['print'] = {
  init: function() {
    this.jsonInit(testReactField)
  },
}

var girar = {
  type: 'turn',
  message0: 'Girar %1 %2 para a %3',
  args0: [
    {
      type: 'field_angle',
      name: 'NAME',
      angle: 90,
    },
    {
      type: 'input_dummy',
    },
    {
      type: 'field_dropdown',
      name: 'direcao',
      options: [
        ['direita', 'direita'],
        ['esquerda', 'esquerda'],
      ],
    },
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: 345,
  tooltip: '',
  helpUrl: '',
}

Blockly.Blocks['girar'] = {
  init: function() {
    this.jsonInit(girar)
  },
}

var mover = {
  type: 'mover',
  message0: 'Ir para %1 %2 %3 %4 por %5 s',
  args0: [
    {
      type: 'field_dropdown',
      name: 'direction',
      options: [
        ['frente', 'frente'],
        ['trás', 'tras'],
      ],
    },
    {
      type: 'input_dummy',
    },
    {
      type: 'field_dropdown',
      name: 'speed',
      options: [
        ['andando', '0.5'],
        ['correndo', '1'],
      ],
    },
    {
      type: 'input_dummy',
    },
    {
      type: 'field_number',
      name: 'duracao',
      value: 1,
      min: 1,
      max: 10,
      precision: 1,
    },
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: 345,
  tooltip: '',
  helpUrl: '',
}

Blockly.Blocks['mover'] = {
  init: function() {
    this.jsonInit(mover)
  },
}

var loop = {
  type: 'turn',
  message0: 'Repetir %1 vez (es) %2 %3',
  args0: [
    {
      type: 'field_input',
      name: 'vezes',
      text: '1',
    },
    {
      type: 'input_dummy',
    },
    {
      type: 'input_statement',
      name: 'movimentos',
    },
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: 345,
  tooltip: '',
  helpUrl: '',
}

Blockly.Blocks['loop'] = {
  init: function() {
    this.jsonInit(loop)
    //this.setStyle('loop_blocks')
  },
}

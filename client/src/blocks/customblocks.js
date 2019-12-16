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

var print = {
  type: 'print',
  message0: 'Imprima no console: %1',
  args0: [
    {
      type: 'field_input',
      name: 'print',
      text: 'esta mensagem',
    },
  ],
  colour: 195,
  previousStatement: null,
  nextStatement: null,
  tooltip: '',
  helpUrl: '',
}

Blockly.Blocks['print'] = {
  init: function() {
    this.jsonInit(print)
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
  colour: 195,
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
  message0: 'Ir para %1 %2 %3 %4 por %5 m',
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
      name: 'distancia',
      value: 1,
      min: 0,
      max: 10,
      precision: 0.1,
    },
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: 195,
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
  colour: 230,
  tooltip: '',
  helpUrl: '',
}

Blockly.Blocks['loop'] = {
  init: function() {
    this.jsonInit(loop)
    //this.setStyle('loop_blocks')
  },
}
var se = {
  type: 'se',
  message0: 'Se %1 Então %2 Senão %3',
  args0: [
    {
      type: 'input_value',
      name: 'condicao',
    },
    {
      type: 'input_statement',
      name: 'satisfeita',
    },
    {
      type: 'input_statement',
      name: 'insatisfeita',
    },
  ],
  colour: 230,
  previousStatement: null,
  nextStatement: null,
  tooltip: '',
  helpUrl: '',
}

Blockly.Blocks['se'] = {
  init: function() {
    this.jsonInit(se)
  },
}

var distancia = {
  type: 'distancia',
  message0: 'Distância %1 %2 %3 m',
  args0: [
    {
      type: 'field_dropdown',
      name: 'operador',
      options: [
        ['=', 'igual'],
        ['>', 'maior que'],
        ['<', 'menor que'],
        ['≠\t', 'diferente'],
      ],
    },
    {
      type: 'input_dummy',
    },
    {
      type: 'field_input',
      name: 'valor',
      text: '1',
    },
  ],
  inputsInline: true,
  output: null,
  colour: 330,
  tooltip: '',
  helpUrl: '',
}

Blockly.Blocks['distancia'] = {
  init: function() {
    this.jsonInit(distancia)
  },
}
var distancia_percorrida = {
  type: 'distancia_percorrida',
  message0: 'Distância Percorrida %1 %2 %3 m',
  args0: [
    {
      type: 'field_dropdown',
      name: 'operador',
      options: [
        ['=', 'igual'],
        ['>', 'maior que'],
        ['<', 'menor que'],
        ['≠\t', 'diferente'],
      ],
    },
    {
      type: 'input_dummy',
    },
    {
      type: 'field_input',
      name: 'valor',
      text: '1',
    },
  ],
  inputsInline: true,
  output: null,
  colour: 330,
  tooltip: '',
  helpUrl: '',
}

Blockly.Blocks['distancia_percorrida'] = {
  init: function() {
    this.jsonInit(distancia_percorrida)
  },
}
var posicao_cor = {
  type: 'posicao_cor',
  message0: 'Posição da cor for: %1',
  args0: [
    {
      type: 'field_dropdown',
      name: 'valor',
      options: [
        ['esquerda', 'esquerda'],
        ['direita', 'direita'],
      ],
    },
  ],
  inputsInline: true,
  output: null,
  colour: 330,
  tooltip: '',
  helpUrl: '',
}

Blockly.Blocks['posicao_cor'] = {
  init: function() {
    this.jsonInit(posicao_cor)
  },
}
var and = {
  type: 'and',
  message0: '%1 e %2',
  args0: [
    {
      type: 'input_value',
      name: 'one',
    },
    {
      type: 'input_value',
      name: 'two',
    },
  ],
  inputsInline: true,
  output: null,
  colour: 120,
  tooltip: '',
  helpUrl: '',
}

Blockly.Blocks['and'] = {
  init: function() {
    this.jsonInit(and)
  },
}

var or = {
  type: 'or',
  message0: '%1 ou %2',
  args0: [
    {
      type: 'input_value',
      name: 'one',
    },
    {
      type: 'input_value',
      name: 'two',
    },
  ],
  inputsInline: true,
  output: null,
  colour: 120,
  tooltip: '',
  helpUrl: '',
}

Blockly.Blocks['or'] = {
  init: function() {
    this.jsonInit(or)
  },
}
var programa = {
  type: 'programa',
  message0: 'Programa %1 %2 %3 Selecionar cor: %4 %5',
  args0: [
    {
      type: 'field_image',
      src:
        'https://cdn2.iconfinder.com/data/icons/flags-40/50/1F3F3-white-flag-512.png',
      width: 40,
      height: 25,
      alt: '*',
      flipRtl: false,
    },
    {
      type: 'input_dummy',
      align: 'CENTRE',
    },
    {
      type: 'input_statement',
      name: 'movs',
    },
    {
      type: 'field_checkbox',
      name: 'cor_selecionada',
      checked: false,
    },
    {
      type: 'field_dropdown',
      name: 'cor',
      options: [
        ['Vermelho', 'vermelho'],
        ['Laranja', 'laranja'],
        ['Amarelo', 'amarelo'],
        ['Verde', 'verde'],
        ['Azul', 'azul'],
      ],
    },
  ],
  colour: 135,
  tooltip: '',
  helpUrl: '',
}
Blockly.Blocks['programa'] = {
  init: function() {
    this.jsonInit(programa)
  },
}
var parar = {
  type: 'parar',
  lastDummyAlign0: 'CENTRE',
  message0: 'Parar %1',
  args0: [
    {
      type: 'field_image',
      src: 'http://pngimg.com/uploads/sign_stop/sign_stop_PNG25622.png',
      width: 25,
      height: 25,
      alt: '*',
      flipRtl: false,
    },
  ],
  previousStatement: null,
  colour: 0,
  tooltip: '',
  helpUrl: '',
}

Blockly.Blocks['parar'] = {
  init: function() {
    this.jsonInit(parar)
  },
}

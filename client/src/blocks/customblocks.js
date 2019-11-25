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


import * as Blockly from 'blockly/core';

// Since we're using json to initialize the field, we'll need to import it.
import '../fields/BlocklyReactField';

var testReactField = {
  "type": "print",
  "message0": "Print %1 %2",
  "args0": [
    {
      "type": "field_input",
      "name": "print",
      "text": "fill this space"
    },
    {
      "type": "input_value",
      "name": "NAME",
      "check": "String"
    }
  ],
  "previousStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
};

Blockly.Blocks['print'] = {
  init: function() {
    this.jsonInit(testReactField);
    this.setStyle('loop_blocks');
  }
};

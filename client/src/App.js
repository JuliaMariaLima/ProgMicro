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
 * @fileoverview Main React component that includes the Blockly component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React from 'react'
import './App.css'

import logo from './logo.svg'

import BlocklyComponent, { Block, Value, Field, Shadow } from './Blockly'

import BlocklyJS from 'blockly/javascript'
import { translateCode } from './utils/codeUtils'

import './blocks/customblocks'
import './generator/generator'

const URL = 'http://f6896f7a.ngrok.io'

class App extends React.Component {
  generateCode = () => {
    console.log(this.simpleWorkspace.workspace.getAllBlocks())
    var ciclos = translateCode(this.simpleWorkspace.workspace)
    console.log(ciclos)
    return fetch('/sendCode/', {
      method: 'POST',
      body: JSON.stringify({ ciclos }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={this.generateCode}>Convert</button>
          <BlocklyComponent
            ref={e => (this.simpleWorkspace = e)}
            readOnly={false}
            move={{
              scrollbars: true,
              drag: true,
              wheel: true,
            }}
            initialXml={`
<xml xmlns="http://www.w3.org/1999/xhtml">

</xml>
      `}>
            <Block type="print" />
            <Block type="girar" />
            <Block type="mover" />
            <Block type="controls_ifelse" />
            <Block type="logic_compare" />
            <Block type="logic_operation" />
            <Block type="controls_repeat_ext">
              <Value name="TIMES">
                <Shadow type="math_number">
                  <Field name="NUM">10</Field>
                </Shadow>
              </Value>
            </Block>
            <Block type="logic_operation" />
            <Block type="logic_negate" />
            <Block type="logic_boolean" />
            <Block type="logic_null" disabled="true" />
            <Block type="logic_ternary" />
            <Block type="text_charAt">
              <Value name="VALUE">
                <Block type="variables_get">
                  <Field name="VAR">text</Field>
                </Block>
              </Value>
            </Block>
          </BlocklyComponent>
        </header>
      </div>
    )
  }
}

export default App

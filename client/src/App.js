import React from 'react'
import './App.css'

import logo from './logo.svg'

import BlocklyComponent, { Block, Value, Field, Shadow } from './Blockly'

import BlocklyJS from 'blockly/javascript'
import { translateCode } from './utils/codeUtils'
import { Button } from 'react-bootstrap'
import Path from './components/Path'

import './blocks/customblocks'
import './generator/generator'

const URL = 'http://f6896f7a.ngrok.io'
const options = {
  collapse: false,
  comments: false,
  disable: false,
  maxBlocks: Infinity,
  trashcan: true,
  horizontalLayout: false,
  toolboxPosition: 'start',
  css: true,
  media: 'https://blockly-demo.appspot.com/static/media/',
  rtl: false,
  scrollbars: false,
  sounds: true,
  oneBasedIndex: false,
  grid: {
    spacing: 20,
    length: 1,
    colour: '#888',
    snap: true,
  },
}

class App extends React.Component {
  ciclos = []
  componentDidMount() {
    this.simpleWorkspace.workspace.addChangeListener(this.change)
  }

  generateCode = () =>
    fetch('/sendCode/', {
      method: 'POST',
      body: JSON.stringify({ ciclos: this.ciclos }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

  change = event => {
    if (event.type === 'move') {
      this.ciclos = translateCode(this.simpleWorkspace.workspace)
      console.log(this.ciclos)
    }
  }

  render() {
    const props = {
      className: 'workspace',
      ref: e => (this.simpleWorkspace = e),
      readOnly: false,
      move: {
        scrollbars: false,
        drag: true,
        wheel: true,
      },
      initialXml: `
<xml xmlns="http://www.w3.org/1999/xhtml">

</xml>
`,
      ...options,
    }

    console.log('APP.JS rerender')
    return (
      <div className="module-border-wrap ">
        <div className="module flex-row">
          <BlocklyComponent {...props}>
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

          <div className="flex flex-column items-center justify-content-around w-40">
            <Path ciclos={this.ciclos} />
            <Button size="lg" variation="primary" onClick={this.generateCode}>
              SEND
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default App

import React from 'react'
import './App.css'

import BlocklyComponent, { Block } from './Blockly'

import { workspaceToCode } from './utils/codeUtils'
import { Button } from 'react-bootstrap'

import './blocks/customblocks'
import './generator/generator'

import socketIOClient from "socket.io-client";

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
  scrollbars: true,
  sounds: true,
  oneBasedIndex: false,
  grid: {
    spacing: 20,
    length: 1,
    colour: '#888',
    snap: true,
  },
  zoom: {
    startScale: 0.85,
  },
}

class App extends React.Component {
  state = {
    ciclos: [],
  }

  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:9000"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => {
      this.setState({ response: data })
      socket.emit('my_message', 'Hello world!');
    });
  }

  generateCode = () => {
    const movimentos = workspaceToCode(this.simpleWorkspace.workspace)

    console.log(movimentos)

    //console.log(movimentos)
    return fetch('/sendCode/', {
      method: 'POST',
      body: JSON.stringify(movimentos),
      headers: {
        'Content-Type': 'application/json',
      },
    })
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
<block type="programa" x="100" y="100">
</block>
</xml>
`,
      ...options,
    }
    const { response } = this.state;
    return (
      <div className="module-border-wrap MovingGradient">
        <div className="module flex-row">
          <BlocklyComponent {...props}>
            <Block type="print" />
            <Block type="girar" />
            <Block type="mover" />
            <Block type="loop" />
            <Block type="enquanto" />
            <Block type="se" />
            <Block type="and" />
            {/* <Block type="or" /> */}
            <Block type="distancia" />
            <Block type="distancia_percorrida" />
            <Block type="posicao_cor" />

            {/* <Block type="controls_ifelse" />
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
            </Block> */}
          </BlocklyComponent>

          <div className="flex flex-column items-center justify-content-around w-40">

            <div style={{ textAlign: "center" }}>
              {response
                ? <img src={response} alt="Webcam" />
                : <p>Loading...</p>}
            </div>

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

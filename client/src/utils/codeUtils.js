import * as Blockly from 'blockly/core'
import 'blockly/javascript'

export function translateCode(blocks) {
  const movimentos = []

  blocks.forEach(block => {
    // TODO: condicional para while e for e if else
    const movimento = Blockly.JavaScript[block.type](block)
    movimentos.push(movimento)
  })

  return JSON.stringify(movimentos)
}

export const workspaceToCode = workspace => {
  var blocks = workspace.getTopBlocks(true)

  if (blocks[0].type === 'programa') {
    var code = Blockly.JavaScript[blocks[0].type](blocks[0])
  }
  // var code = []
  // for (var i = 0, block; (block = blocks[i]); i++) {
  //   var line = blockToCode(block)
  //   code.push(...line)
  // }
  // code = code.join('\n') // Blank line between each section.
  // code = this.finish(code)
  // // Final scrubbing of whitespace.
  // code = code.replace(/^\s+\n/, '')
  // code = code.replace(/\n\s+$/, '\n')
  // code = code.replace(/[ \t]+\n/g, '\n')
  return code
}

export const blockToCode = (block, opt_thisOnly) => {
  let movimentos = []
  if (!block) {
    return ''
  }
  if (!block.isEnabled()) {
    // Skip past this block if it is disabled.
    return opt_thisOnly ? '' : blockToCode(block.getNextBlock())
  }

  var func = Blockly.JavaScript[block.type]
  if (typeof func != 'function') {
    throw Error(
      'Language "' +
        this.name_ +
        '" does not know how to generate ' +
        ' code for block type "' +
        block.type +
        '".'
    )
  }
  // First argument to func.call is the value of 'this' in the generator.
  // Prior to 24 September 2013 'this' was the only way to access the block.
  // The current preferred method of accessing the block is through the second
  // argument to func.call, which becomes the first parameter to the generator.
  var code = func.call(block, block)

  if (Array.isArray(code)) {
    // Value blocks return tuples of code and operator order.
    if (!block.outputConnection) {
      throw TypeError('Expecting string from statement block: ' + block.type)
    }
    movimentos.push(...code)
  } else movimentos.push(code)
  const childs = [...block.childBlocks_]

  if (
    (block.type === 'se' && childs.length > 3) ||
    (block.type !== 'se' && childs.length)
  ) {
    movimentos = [...movimentos, ...blockToCode(childs.pop())]
  }
  return movimentos
}

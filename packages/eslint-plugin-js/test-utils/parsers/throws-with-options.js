'use strict'

import espree from 'espree'

exports.parse = (sourceText, options) => {
  if (options.ecmaVersion)
    throw new Error('Expected no parserOptions.ecmaVersion to be used')

  return espree.parse(sourceText, options)
}

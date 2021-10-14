import { expect } from 'chai'

import { as } from '../../../src/tools/cast'
import { CastError } from '../../../src/tools/cast/CastError'

describe('as.exactly', () => {
  it('returns the value passed', () => {
    const result = as.exactly(42)(42)
    expect(result).to.equal(42)
  })

  it('throws for values other than expected', () => {
    expect(() => as.exactly(42)(43)).to.throw(CastError)
  })
})
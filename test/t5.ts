import debounce from 'debounce'

describe('t5', () => {
	describe('CommonJS Module in typescript using official typescript plugin', () => {
		it('Should be defined.', () => {
			expect(debounce).toBeDefined()
		})
	})
})

import debounce from 'debounce'

describe('t3', () => {
	describe('CommonJS Module', () => {
		it('Should be defined.', () => {
			expect(debounce).toBeDefined()
		})
	})
})

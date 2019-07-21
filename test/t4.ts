import debounce from 'debounce'

describe('t4', () => {
	describe('CommonJS Module in typescript', () => {
		it('Should be defined.', () => {
			expect(debounce).toBeDefined()
		})
	})
})

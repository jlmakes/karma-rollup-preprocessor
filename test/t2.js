import three from './fixtures/3'
import four from './fixtures/4'

describe('t2', () => {
	describe('Fixture 3', () => {
		it('Should be defined.', () => {
			expect(three).toBeDefined()
		})
		it('should return dependency signature', () => {
			expect(three()).toBe('3b')
		})
	})

	describe('Fixture 4', () => {
		it('Should be defined.', () => {
			expect(four).toBeDefined()
		})
		it('should return dependency signature', () => {
			expect(four()).toBe('4')
		})
	})
})

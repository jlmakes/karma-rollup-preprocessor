import one from './fixtures/1'
import two from './fixtures/2'

describe('t1', () => {
	describe('Fixture 1', () => {
		it('should be defined', () => {
			expect(one).toBeDefined()
		})
		it('should return dependency signature', () => {
			expect(one()).toBe('1ab')
		})
	})

	describe('Fixture 2', () => {
		it('should be defined', () => {
			expect(two).toBeDefined()
		})
		it('should return dependency signature', () => {
			expect(two()).toBe('2')
		})
	})
})

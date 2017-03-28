import _ from 'lodash';
import helper from './helper';

describe('Custom Config', () => {
    describe('_', () => {
        it('should be defined', () => {
            expect(_).toBeDefined();
        });
    });

    describe('Helper', () => {
        it('should be defined', () => {
            expect(helper).toBeDefined();
        });
    });
});

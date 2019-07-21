import a from './modules/a'
import b from './modules/b'

export default function one() {
	return '1' + a() + b()
}

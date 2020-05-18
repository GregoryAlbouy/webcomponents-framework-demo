import './index.scss'
import AppRoot from './components/app-root/app-root'
import ElementBuilderTest from './tests/ElementBuilder.test.js'

document.body.append(new AppRoot())

ElementBuilderTest()
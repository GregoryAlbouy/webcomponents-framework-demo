import HTML_STR from './app-root.c.html'
import CSS_STR from './app-root.c.scss'
import { Component, BaseComponent, TechList } from '../components'

@Component({
    tagname: 'app-root',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class AppRoot extends BaseComponent
{
    props = {
        stack: [
            'Webpack',
            'Webcomponents',
            'TypeScript',
            'Sass',
        ]
    }

    connectedCallback()
    {
        this.root.append(new TechList(this.props.stack))
    }
}
import HTML_STR from './app-title.c.html'
import CSS_STR from './app-title.c.scss'
import { Component, BaseComponent } from '../components'

@Component({
    tagname: 'app-title',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class AppTitle extends BaseComponent
{
    props: {
        content?: string
    } = {}

    constructor(content: string)
    {
        super()
        if (content) this.props.content = content
    }

    connectedCallback()
    {
        if (this.props.content) this.select('h1')!.innerHTML = this.props.content
    }
}
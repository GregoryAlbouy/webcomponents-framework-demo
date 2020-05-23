import HTML_STR from './tech-list.c.html'
import CSS_STR from './tech-list.c.scss'
import { Component, BaseComponent, TechItem } from '../components'
import EBuilder from 'ebuilder-js'

@Component({
    tagname: 'tech-list',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class TechList extends BaseComponent
{
    props = {
        stack: <string[]>[]
    }

    constructor(stack: string[])
    {
        super()
        if (stack) {
            this.setProp('stack', stack)
        }
    }

    connectedCallback()
    {
        const swapIt = (e: MouseEvent) => {
            EBuilder(e.currentTarget).swap(this.select('tech-item'), true)
        }

        this.select('ul')!.append(...this.props.stack.map((name) => {
            return EBuilder('li').set({
                children: [
                    EBuilder(new TechItem(name)).set({
                        listeners: ['click', swapIt]
                    })
                ],
            }).element
        }))

        EBuilder(this.select('ul')).setChildren(() => {
            return this.props.stack.map((name) => {
                return EBuilder('li').setChildren(
                    EBuilder(new TechItem(name)).setListeners(['click', swapIt])
                )
            })
        })
    }
}
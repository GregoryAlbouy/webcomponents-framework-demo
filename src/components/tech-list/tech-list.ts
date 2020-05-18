import HTML_STR from './tech-list.c.html'
import CSS_STR from './tech-list.c.scss'
import { Component, BaseComponent, TechItem } from '../components'
import ElementBuilder from '../../shared/ElementBuilder'

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
        const addListener = (elt: Element) => {
            elt.addEventListener('click', (event) => ElementBuilder(event.currentTarget).swap(this.select('tech-item'), { ms: 400 }) )
        }

        const addSwap = (e: MouseEvent) => {
            ElementBuilder(e.currentTarget).swap(this.select('tech-item'), true)
        }

        // this.select('ul')!.append(...this.props.stack.map((name) => {
        //     return ElementBuilder('li').set({
        //         children: [ new TechItem(name) ],
        //     }).element
        // }))

        this.select('ul')!.append(...this.props.stack.map((name) => {
            return ElementBuilder('li').set({
                children: [
                    ElementBuilder(new TechItem(name)).set({
                        listeners: [
                            ['click', addSwap]
                        ]
                    })
                ],
            }).element
        }))



        // this.selectAll('tech-item').forEach((techItem) => techItem.addEventListener('click', (event) => ElementBuilder(event.currentTarget).swap(this.select('tech-item'))))
        // this.selectAll('tech-item').forEach(addListener)

        // const item1 = this.selectAll('tech-item')[1]
        // const item3 = this.selectAll('tech-item')[3]

        // setTimeout(() => ElementBuilder(item1).swap(item3, true), 1000)
       
        // ElementBuilder(item1).swap(item3, true)
    }
}
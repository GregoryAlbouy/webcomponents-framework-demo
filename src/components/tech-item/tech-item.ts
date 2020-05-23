import HTML_STR from './tech-item.c.html'
import CSS_STR from './tech-item.c.scss'
import { Component, BaseComponent } from '../components'
import EBuilder from 'ebuilder-js'

@Component({
    tagname: 'tech-item',
    template: { html: HTML_STR, css: CSS_STR },
    listeners: [
        ['click', function() { this.edit() }]
    ]
})
export default class TechItem extends BaseComponent
{
    props: {
        name?: string
    } = {}

    constructor(name?: string) {
        super()
        if (name) this.setName(name)
    }

    static get observedAttributes() {
        return ['name']
    }

    attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
        if (newValue === oldValue) return
        if (attr !== 'name') return
        this.setName(newValue)
    }

    edit() {
        const thisElt = this
        const label = this.select('p')

        const endEdit = ()  => {
            thisElt.removeAttribute('edit')
            input.replaceWith(label)
            window.removeEventListener('click', endEdit)
        }

        const applyChanges = (value: string) => {
            input.replaceWith(label)
            this.removeAttribute('edit')
            this.setName(value)
        }

        const validate = (event: any) => {
            if (event.key === 'Enter') applyChanges(event.currentTarget!.value)
        }

        this.setAttribute('edit', '')
        const input = EBuilder('input').set({
            attributes: { type: 'text', value: this.props.name },
            listeners: [ ['keydown', validate] ],
            replace: label
        }).element

        setTimeout(() => window.addEventListener('click', endEdit))
    }

    setName(value: string) {
        this.setProp('name', value)
        if (this.getAttribute('name') !== value) this.setAttribute('name', value)
        this.renderIcon(value)
    }

    renderIcon(name: string) {
        const imageModule = require.context('../../assets/images/icons', false, /\.svg/i)
        const imgElt = this.select('img')! as HTMLImageElement
        const pElt = this.select('p')!
        let imgSrc

        const getImageSource = (name: string) => imageModule(`./${name}.svg`).default

        try {
            imgSrc = getImageSource(name.toLowerCase())
        } catch {
            imgSrc = getImageSource('unknown')
        }

        EBuilder(imgElt).setAttributes({
            alt: name,
            src: imgSrc
        })
        pElt.textContent = name
    }
}
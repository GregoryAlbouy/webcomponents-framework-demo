/**
 * Import & export all components here for convenient reusing.
 * This file also contains @Component() decorator that initialize each component
 */

import BaseComponent from './base-component'
import AppRoot from './app-root/app-root'
import AppTitle from './app-title/app-title'
import TechList from './tech-list/tech-list'
import TechItem from './tech-item/tech-item'

export {
    BaseComponent,
    AppRoot,
    AppTitle,
    TechList,
    TechItem
}

interface ComponentOptions {
    tagname: string,
    template: TemplateObject,
    attributes?: StringObject,
    listeners?: EventTuple[]
}

/**
 * Component class decorator: automatically generates the full html string template
 * (including stylesheet) from the separate files, add the optionals attributes and
 * listeners then define the component.
 */
export function Component(options: ComponentOptions) {
    return (target: Function) => {
        const connectedCallbackOrigin = target.prototype.connectedCallback
        const { tagname, template, attributes, listeners } = options
        const templateStr = `<style>${template.css}</style>${template.html}`

        Object.defineProperty(target, 'TEMPLATE_STR', { value: templateStr })

        target.prototype.connectedCallback = function() {
            if (attributes) Object.keys(attributes).forEach((name) => this.setAttribute(name, attributes[name]))
            if (listeners) listeners.forEach(([event, handler, options]) => this.addEventListener(event, handler, options))

            if (connectedCallbackOrigin) connectedCallbackOrigin.apply(this)
        }

        customElements.define(tagname, target as CustomElementConstructor)
    }
}
/**
 * Import & export all components here for convenient reusing.
 * This file also contains @Component() decorator that initialize each component
 */

import BaseComponentTest from './base-component.test'
import TestComponent from './test-component/test-component'

export {
    BaseComponentTest as BaseComponent,
    TestComponent
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
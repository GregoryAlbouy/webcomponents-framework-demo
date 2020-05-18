/**
 * Helper function that allows to fully create and set an element
 * (attributes, class, listeners...) and append it anywhere with a single
 * declaration, thanks to its chaining ability.
 * 
 * More on github : https://github.com/gregoryalbouy/element-builder
 */

class ElementBuilderError extends Error
{
    constructor(message, suspect) {
        super(message)
        this.name = this.constructor.name
        this.suspect = suspect
    }
}

const ElementBuilderAnimation = (ms) => {
    return {
        swap: (a, b) => new Promise((resolve) => {
            const offset = (a, b) => {
                return {
                    h: b.getBoundingClientRect().left - a.getBoundingClientRect().left,
                    v: b.getBoundingClientRect().top - a.getBoundingClientRect().top
                }
            }
    
            // using css styles
            [a, b].forEach((elt) => elt.style.transition = `transform ${ms}ms`)
    
            a.style.transform = `translate(${offset(a, b).h}px, ${offset(a, b).v}px)`
            b.style.transform = `translate(${offset(b, a).h}px, ${offset(b, a).v}px)`
    
            setTimeout(() => {
                [a, b].forEach((elt) => {
                    elt.style.transform = null
                    elt.style.transition = null
                })
                resolve()
            }, ms)
        }),

        swap2: (a, b) => new Promise((resolve) => {


            const offset = (a, b) => {
                return {
                    h: b.getBoundingClientRect().left - a.getBoundingClientRect().left,
                    v: b.getBoundingClientRect().top - a.getBoundingClientRect().top
                }
            }

            const dist = {
                x: b.getBoundingClientRect().left - a.getBoundingClientRect().left,
                y: b.getBoundingClientRect().top - a.getBoundingClientRect().top
            }

            const end = () => {
                [a, b].forEach((elt) => elt.style.transform = null)
                resolve()
            }

            const diff = () => {
                let d = 0
                const startTime = performance.now()
                const halfway = () => performance.now() - startTime >= ms / 2

                const getD = () => {
                    return halfway ? d++ : d--
                }

                return getD()
            }

            [a, b].forEach((elt) => elt.style.transition = 'none')

            const maxOffset = a.getBoundingClientRect().height / 2

            let start = performance.now()
            const step = (timestamp) => {
                let progress = (timestamp - start) / ms
                if (progress > 1) progress = 1 
                let dy = progress <= .5 ? maxOffset * progress * 2 : maxOffset * (1 - progress) * 2

                a.style.transform = `translate(${dist.x * progress}px, ${dist.y * progress + dy}px)`
                b.style.transform = `translate(${-dist.x * progress}px, ${-dist.y * progress - dy}px)`
                
                if (progress < 1) requestAnimationFrame(step)
                else end()
            }
            requestAnimationFrame(step)

            setTimeout(() => {
                [a, b].forEach((elt) => {
                    elt.style.transform = null
                    elt.style.transition = null
                })
                resolve()
            }, ms)
        })

    }
}

const ElementBuilder = function(source) {
    const element = typeof source === 'string' ? document.createElement(source) : source

    const typeOf = (s) => `${Object.prototype.toString.call(s)}`.replace(/^\[object ([a-z]+)\]$/i, '$1').toLowerCase()

    const logError = (error) => console.warn(`${error.name}: ${error.message}:\n`, error.suspect, error.stack)

    const swapAnimation = (a, b, ms) => new Promise((resolve) => {

        const offset = (a, b) => {
            return {
                h: b.getBoundingClientRect().left - a.getBoundingClientRect().left,
                v: b.getBoundingClientRect().top - a.getBoundingClientRect().top
            }
        }

        // using css styles
        [a, b].forEach((elt) => elt.style.transition = `transform ${ms}ms`)

        a.style.transform = `translate(${offset(a, b).h}px, ${offset(a, b).v}px)`
        b.style.transform = `translate(${offset(b, a).h}px, ${offset(b, a).v}px)`

        setTimeout(() => {
            [a, b].forEach((elt) => {
                elt.style.transform = null
                elt.style.transition = null
            })
            resolve()
        }, ms)

        // using requestAnimationFrame
        const swap = () => {

            if (true) {}
            else cancelAnimationFrame(swap)
        }
    })
    
    return {
        element: element,

        isElementBuilder: true,

        into: (node, n) => {
            if (!n) {
                node.appendChild(element)
                return ElementBuilder(element)
            }
            
            const clone = () => element.cloneNode(true)
            if (typeOf(n) === 'number') {
                [...Array(n)].map(() => node.appendChild(clone()))
            }
            if (typeOf(n) === 'array') {

            }
        },

        replace: (node) => {
            node.ParentNode.replaceChild(element, node)
            return ElementBuilder(element)
        },

        set: (options) => {
            try {
                const { attributes, listeners, children, properties } = options

                const addAttribute = (name) => element.setAttribute(name, attributes[name])

                const addListener = ([event, handler, options]) => {
                    element.addEventListener(event, handler, options)
                } 

                const addChild = (child) => {
                    // try {
                        if (child instanceof HTMLElement) element.appendChild(child)
                        else if (typeOf(child) === 'string') {
                            // const temp = document.createDocumentFragment()
                            element.innerHTML += child
                        } 
                        else if (child.isElementBuilder) element.appendChild(child.element)
                        else throw new ElementBuilderError(`Invalid input in children array`, child)
                    // } catch(error) {
                    //     logError(error)
                    // }
                }
            
                if (attributes) Object.keys(attributes).forEach(addAttribute)
                if (listeners) {
                    if (typeOf(listeners) !== 'array') {
                        throw new ElementBuilderError('Invalid input for listeners input (array expected)', listeners)
                    } 
                    else if (typeOf(listeners[0] === 'string') && typeOf(listeners[1] === 'function')) {
                        addListener([listeners[0], listeners[1], listeners[2]])
                    } else {
                        listeners.forEach(addListener)
                    }
                } 
                if (children) {
                    // try {
                        if (typeOf(children) === 'array') children.forEach(addChild)
                        else if (typeOf(children) === 'string') element.innerHTML += children
                        else throw new ElementBuilderError(`Invalid input for children value`, children)
                    // } catch(error) {
                    //     logError(error)
                    // }
                }

                if (properties) Object.assign(element, properties)

            } catch(error) {
                logError(error)
            }

            return ElementBuilder(element)
        },

        setAttributes: (attr) => {
            Object.keys(attr).forEach((name) => {
                element.setAttribute(name, attr[name])
            })
            
            return ElementBuilder(element)
        },

        copy: function() {
            const clone = this.cloneNode(true) // Object.create(null) ?
            Object.assign(clone, this)
            clone.style.background = "green"
            return clone
        },

        /**
         * Clones and append n times
         */
        replicate: function(n) {

        },

        each: function(array) {

        },

        // 'switch'?
        // add 'animated' param for optional animation
        swap: async function(swappedNode, animate) {
            if (element === swappedNode) return
            if (animate) await ElementBuilderAnimation(animate.ms || 200).swap2(element, swappedNode)
            const dummy = document.createElement('div')
            element.parentNode.replaceChild(dummy, element)
            swappedNode.parentNode.replaceChild(element, swappedNode)
            dummy.parentNode.replaceChild(swappedNode, dummy)
            return ElementBuilder(element)
        },

        addClass: function() {

        },
        addClasses: function() {

        },
        addStyles: function() {

        },
        // if (options), reset + set(options)
        reset: function() {

        },

        for: function(n) {
            return {
                into: function() {},
                set: function() {}
            }
        }
    }
}

export default ElementBuilder
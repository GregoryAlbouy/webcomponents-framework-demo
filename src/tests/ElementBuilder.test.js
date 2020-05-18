import ElementBuilder from '../shared/ElementBuilder'
import Icon from '../assets/images/icons/webpack.svg'

export default function() {
    const clickHandler = function() {
        return alert('clicked')
    }

    const list = ElementBuilder('ul').into(document.body).element

    ElementBuilder('li')
        .set({
            properties: { textContent: 'list-item %n' },
            attributes: { style: 'color: #CCC' }
        })
        .into(list, 3)


    ElementBuilder('article').set({
        attributes: {
            style: 'box-shadow: 0 0 5rem #000; color: #CCC;',
        },
        properties: { onclick: clickHandler },
        children: [
            ElementBuilder('h3').set({ children: [ 'Super titre' ] }),
            ElementBuilder('p').set({ children: 'Un article particulièrement intéressant' }),
            ElementBuilder('p').set({ children: { salut: 'ça va' }}) // Warning expected,
        ],
        listeners: [
            [ 'mouseover', function() { this.style.background = '#666' } ],
            [ 'mouseleave', function() { this.style.background = null } ]
        ]
    })
        .into(document.body)
        .setAttributes({ class: 'youpi' })
        .set({ children: `<div class="img-container"><img src="${Icon}"></div>` })
}
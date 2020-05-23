import EBuilder from 'ebuilder-js'

export default function() {
    EBuilder('div').set({
        style: {
            position: 'absolute',
            top: 'calc(50% - 5rem)',
            left: 'calc(50% - 5rem)',
            width: '10rem',
            height: '10rem',
            boxShadow: '0 0 2rem rgba(0,0,0,.4)',
            transition: 'background 2s linear',
            backgroundColor: `hsl(${360 * Math.random()},50%,50%)`,
            'background@interval: 2000': () => `hsl(${360 * Math.random()},50%,50%)`
        }
    }).into(document.body)
}
# Webcomponents framework demo

Short usage example from my [Webcomponents Framework](https://github.com/gregoryalbouy/webcomponents-framework)

Live demo: [here](https://gregoryalbouy.github.io/webcomponents-framework-demo/)

For this example I also use [EBuilder](https://github.com/gregoryalbouy/ebuilder), a custom library I recently started to develop in order to create, edit and manipulate elements the intuitive and pleasant way.

```javascript
// tech-list.ts

this.props.stack.forEach((name) => EBuilder(new TechItem(name))
    .setListeners(['click', swapIt])
    .into(EBuilder('li').into(this.select('ul')))
)
```

instead of:

```javascript
this.props.stack.forEach((name) => {
    const li = document.createElement('li')
    const techItem = new TechItem(name)

    techItem.addEventListener('click', swapIt)
    li.appendChild(techItem)
    this.select('ul').appendChild(li)
})
```


Build component-oriented webapps using Custom Elements, with separate HTML CSS and script files and no configuration.

## Base stack

* Webpack
* TypeScript
* Sass
* Babel
* PostCSS
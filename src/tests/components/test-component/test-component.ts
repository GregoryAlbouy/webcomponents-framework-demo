import HTML_STR from './test-component.c.html'
import CSS_STR from './test-component.c.scss'
import { Component, BaseComponent } from '../../../components/components'

@Component({
    tagname: 'test-component',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class TestComponent extends BaseComponent
{
    
}
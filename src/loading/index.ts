import createElement from '../utils/create-element/index';
import Component from '../component';
import * as css from './loading.scss';

export default class Loading extends Component {
    constructor() {
        super();
        this.element = createElement(`
            <span class="${css.container}">
                <span class="${css.circle}"></span>
                <span class="${css.circle}"></span>
                <span class="${css.circle}"></span>
                <span class="${css.circle}"></span>
                <span class="${css.circle}"></span>
                <span class="${css.circle}"></span>
                <span class="${css.circle}"></span>
                <span class="${css.circle}"></span>
            </span>
        `);
    }
}
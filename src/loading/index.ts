import createElement from '../utils/create-element/index';
import * as css from './loading.scss';

export default class Loading {
    private element: Element;

    constructor() {
        this.element = createElement(`
            <span class="${css.container}">
                <span class="${css.circle}"></span>
                <span class="${css.circle}"></span>
                <span class="${css.circle}"></span>
            </span>
        `);
    }

    getElement(): Element {
        return this.element;
    }
}

import createElement from '../utils/create-element/index';
import Component from '../component';
import * as css from './loading.scss';

interface Params {
    style?: Partial<CSSStyleDeclaration>;
}

export default class Loading extends Component {
    constructor(params: Params = {}) {
        super();
        params = { style: {}, ...params };
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
        `, { style: params.style });
    }
}
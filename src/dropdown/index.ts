import createElement from '../utils/create-element/index';
import Component from '../component';

export interface OnChange {
    (value: number): any;
}

interface Params {
    items: Array<string>;
    onChange?: OnChange;
}

export default class Dropdown extends Component {
    constructor({ items, onChange = () => {} }: Params) {
        super();
        this.element = createElement(`<select style="padding: 10px; background: #000; font-size: 1em; color: #fff; border: 0; outline: none;"></select>`);
        items.forEach((item, i) => this.element.appendChild(createElement(
            `<option value="${i}">${item}</option>`
        )));
        this.element.addEventListener('change', () => {
            onChange(+(<HTMLSelectElement>this.element).value);
        });
    }
}

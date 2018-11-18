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
    private options: HTMLElement[];

    constructor({ items, onChange = () => {} }: Params) {
        super();
        this.element = createElement(`<select style="padding: 10px; background: #000; font-size: 1em; color: #fff; border: 0; outline: none; vertical-align: middle;"></select>`);
        this.options = items.map((item, i) => {
            const htmlElement = createElement(
                `<option value="${i}">${item}</option>`
            );

            this.element.appendChild(htmlElement);

            return htmlElement;
        });

        this.element.addEventListener('change', () => {
            onChange(+(<HTMLSelectElement>this.element).value);
        });
    }

    setActive(index: number) {
        const option = this.options[index];

        if (option) {
            option.setAttribute('selected', 'true');
        }
    }
}

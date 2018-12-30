import createElement from '../utils/create-element/index';
import Component from '../component';

export interface OnChange {
    (value: number): any;
}

export interface Params {
    items: Array<string>;
    textColor: string;
    backgroundColor: string;
    onChange?: OnChange;
}

export default class Dropdown extends Component {
    private options: HTMLElement[];

    constructor({ items, backgroundColor, textColor, onChange = () => {} }: Params) {
        super();
        this.element = createElement(`<select class="j-gallery-drop-down" style="padding: 10px; background: ${backgroundColor}; font-size: 1em; color: ${textColor}; border: 0; outline: none; vertical-align: middle;"></select>`);
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

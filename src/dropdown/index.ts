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
    private list: HTMLElement;
    private activeItem: HTMLElement;
    private textColor: string;
    private backgroundColor: string;
    private opened: boolean;
    private value: HTMLElement;

    constructor({ items, backgroundColor, textColor, onChange = () => {} }: Params) {
        super();
        this.textColor = textColor;
        this.backgroundColor = backgroundColor;
        this.element = createElement(`<div class="j-gallery-drop-down" style="padding: 10px; background: ${backgroundColor}; font-size: 1em; color: ${textColor}; border: 0; outline: none; vertical-align: middle; cursor: pointer;"></div>`);
        this.value = createElement('<span></span>');
        this.element.appendChild(this.value);
        this.list = items.reduce((list, item, i) => {
            const htmlElement = createElement(
                `<div style="padding: .7em; margin: .3em; background-color: ${backgroundColor}; color: ${textColor}">${item}</div>`
            );

            htmlElement.addEventListener('click', () => {
                this.setActive(i);
                onChange(i);
            });

            list.appendChild(htmlElement);

            return list;
        }, createElement(`<div style="position: fixed; z-index: 1; top: 0; left: 0; bottom: 0; right: 0; display: none; background: ${backgroundColor}"></div>`));
        this.element.appendChild(this.list);
        this.element.addEventListener('click', () => {
            this.toggle();
        });
        this.element.appendChild(createElement('<span/>', {
            style: {
                width: '0',
                height: '0',
                border: `solid transparent`,
                borderTopColor: textColor,
                marginLeft: '.75em',
                borderWidth: '.25em .25em 0',
                display: 'inline-block',
                verticalAlign: 'middle'
            }
        }))
    }

    setActive(index: number) {
        const option = <HTMLElement>this.list.children[index];

        if (this.activeItem) {
            this.activeItem.style.backgroundColor = this.backgroundColor;
            this.activeItem.style.color = this.textColor;
        }

        if (option) {
            this.activeItem = option;
            this.value.innerHTML = option.innerHTML;
            option.style.backgroundColor = this.textColor;
            option.style.color = this.backgroundColor;
        }
    }

    private toggle() {
        this.opened = !this.opened;
        this.list.style.display = this.opened ? 'block' : 'none';
    }
}

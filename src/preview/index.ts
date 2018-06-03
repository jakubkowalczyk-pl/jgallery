import createElement from '../utils/create-element/index';
import load from '../utils/load/index';
import AlbumItem from '../album-item';
import Component from '../component';

export default class Preview extends Component {
    private item: AlbumItem;

    constructor() {
        super();
        this.element = createElement(`<div/>`, {
            style: {
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                display: 'flex',
            }
        });
    }

    setItem(item: AlbumItem): Promise<void> {
        const { element } = this;
        const content: HTMLElement = createElement(
            item.element ?
            item.element.outerHTML :
            `<div style="
                width: 100%;
                height: 100%;
                background: center center url(${item.url}) no-repeat;
                background-size: cover;
            "/>`
        );

        this.item = item;
        element.innerHTML = '';

        return load(content).then(() => {
            element.innerHTML = '';
            element.appendChild(content);
        });
    }
}
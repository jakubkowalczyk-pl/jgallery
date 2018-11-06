import createElement from '../utils/create-element/index'
import Component from '../component';
import Animation from '../animation';
import Album from '../album';
import AlbumItem from '../album-item';
import Thumbnail, {ThumbOnClick} from './thumbnail/index';

interface Params {
    thumbOnClick: ThumbOnClick
}

export default class Thumbnails extends Component {
    private album: Album;
    private items: Array<Thumbnail>;
    private item: Thumbnail;
    private thumbOnClick: ThumbOnClick;
    private content: HTMLElement;
    private scrollAnimation: Animation;

    constructor({ thumbOnClick = () => {} }: Params) {
        super();
        this.element = createElement('<div></div>', {
            style: {
                display: 'flex',
                overflow: 'auto',
            }
        });
        this.content = createElement('<div></div>', {
            style: {
                margin: '0 auto',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
            }
        });
        this.element.appendChild(this.content);
        this.thumbOnClick = thumbOnClick;
    }

    setAlbum(album: Album) {
        this.album = album;
        this.items = album.items.map((item: AlbumItem) => new Thumbnail({
            item,
            onClick: this.thumbOnClick
        }));
        this.content.innerHTML = '';
        this.items.forEach((item: Thumbnail) => {
            this.content.appendChild(item.getElement());
        });
    }

    setActive(index: number) {
        this.item && this.item.appendStyle({ border: 'none' });
        this.item = this.items[index];
        this.item.appendStyle({ border: '2px solid #fff' });
        this.scrollToActiveItem();
    }

    enableWrap() {
        this.content.style.flexWrap = 'wrap';
    }

    disableWrap() {
        this.content.style.flexWrap = 'initial';
    }

    private scrollToActiveItem() {
        const element = this.item.getElement();

        this.scrollAnimation && this.scrollAnimation.cancel();
        this.scrollAnimation = new Animation({
            initialValue: this.element.scrollLeft,
            finalValue: element.offsetLeft + element.clientWidth/2 - this.element.clientWidth/2,
            onChange: value => this.element.scrollLeft = value,
        });
        this.scrollAnimation.start();
    }
}
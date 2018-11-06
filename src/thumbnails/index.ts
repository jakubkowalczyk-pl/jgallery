import createElement from '../utils/create-element/index'
import Component from '../component';
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
    }

    enableWrap() {
        this.content.style.flexWrap = 'wrap';
    }

    disableWrap() {
        this.content.style.flexWrap = 'initial';
    }
}
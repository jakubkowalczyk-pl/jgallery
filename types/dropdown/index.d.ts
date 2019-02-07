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
    private list;
    private activeItem;
    private textColor;
    private backgroundColor;
    private opened;
    private value;
    constructor({ items, backgroundColor, textColor, onChange }: Params);
    setActive(index: number): void;
    private toggle;
}

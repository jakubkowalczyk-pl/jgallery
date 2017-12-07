import createElement from '../utils/create-element';
import View from '../view';

export default class Preview extends View {
    private content: HTMLElement;
    
    constructor() {
        super();
        this.element = createElement('<div/>');
        this.content = createElement('<div/>');
    }
    
    setContent(content: HTMLElement) {
        this.content = content;
    }
}
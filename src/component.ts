export default abstract class Component {
    protected element: HTMLElement;

    getElement(): HTMLElement {
        return this.element
    }

    appendStyle(style: Partial<CSSStyleDeclaration>) {
        for (let propName in style) {
            this.element.style[propName] = style[propName];
        }
    }
}
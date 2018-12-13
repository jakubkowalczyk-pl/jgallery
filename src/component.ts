export default abstract class Component {
    protected element: HTMLElement;

    getElement(): HTMLElement {
        return this.element
    }

    appendStyle(style: Partial<CSSStyleDeclaration>) {
        Object.assign(this.element.style, style);
    }
}
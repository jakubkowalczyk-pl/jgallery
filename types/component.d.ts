export default abstract class Component {
    protected element: HTMLElement;
    getElement(): HTMLElement;
    appendStyle(style: Partial<CSSStyleDeclaration>): void;
}

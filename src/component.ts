export default abstract class Component {
    protected element: HTMLElement;
    
    getElement(): HTMLElement {
        return this.element
    }
}
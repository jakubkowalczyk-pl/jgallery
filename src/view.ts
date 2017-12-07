export default abstract class View {
    protected element: HTMLElement;
    
    getElement(): HTMLElement {
        return this.element
    }
}
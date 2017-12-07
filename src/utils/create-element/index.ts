export default function (html: string): HTMLElement {
    const tempDiv: HTMLElement = document.createElement('div');

    tempDiv.innerHTML = html;

    return tempDiv.firstChild instanceof HTMLElement ? tempDiv.firstChild : document.createElement('div');
};
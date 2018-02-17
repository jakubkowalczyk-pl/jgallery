export default function (html: string): HTMLElement {
    return <HTMLElement>(new DOMParser().parseFromString(html, 'text/html').body.firstChild);
};
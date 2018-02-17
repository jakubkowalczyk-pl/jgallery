export default (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image;
        
        img.src = src;
        img.onload = () => resolve();
        img.onerror = reject;
    });
};
export const getCookie = (name: string): string | undefined => {
    const value: string = `; ${document.cookie}`;
    const parts: string[] = value.split(`; ${name}`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
}
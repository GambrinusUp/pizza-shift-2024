export function formatDateTime(input: string): string {
    const [datePart, timePart] = input.split('T');
    const time = timePart.split(':').slice(0, 2).join(':');

    return `${datePart} в ${time}`;
}
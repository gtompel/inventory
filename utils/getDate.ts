const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
];
export function getDate(date: Date) {
    const d = new Date(date);
    return `${d.getDate()} ${months[d.getMonth()]}`

}
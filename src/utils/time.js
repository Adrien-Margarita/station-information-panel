export const toMinutes = (hhmm) => {
    const [hours, minutes] = hhmm.split(":").map(Number);
    return hours * 60 + minutes;
};
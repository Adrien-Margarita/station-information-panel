export const toMinutes = (hhmm) => {
    // Convertit une chaîne "HH:MM" en nombre total de minutes
    const [hours, minutes] = hhmm.split(":").map(Number);
    return hours * 60 + minutes;
};
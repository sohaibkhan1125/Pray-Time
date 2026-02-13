export const convertTo12Hour = (time24) => {
    if (!time24 || typeof time24 !== 'string' || !time24.includes(':')) return time24;

    let [hours, minutes] = time24.split(':');
    hours = parseInt(hours, 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 and 12 appropriately

    return `${hours}:${minutes} ${ampm}`;
};

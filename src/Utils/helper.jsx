import dayjs from "dayjs";

export const closeDate = (date, days) => {
    const initialDate = new Date(date);
    const newDate = new Date(initialDate);
    newDate?.setDate(initialDate.getDate() + days);
    newDate?.setUTCHours(0, 0, 0, 0);
    const formattedDate = newDate?.toISOString();
    return dayjs(formattedDate).format("DD/MM/YYYY");
};
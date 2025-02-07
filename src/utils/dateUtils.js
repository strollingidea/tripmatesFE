import { format } from "date-fns";

export const formatDate = (date) => format(new Date(date), 'EEE, dd MMM yyyy');
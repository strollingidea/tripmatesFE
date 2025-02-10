import { format, differenceInDays} from "date-fns";

export const formatDate = (date) => format(new Date(date), 'EEE, dd MMM yyyy');

export const getDayCount = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    return differenceInDays(new Date(endDate), new Date(startDate));
  };
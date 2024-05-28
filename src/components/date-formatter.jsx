import { parseISO, format } from "date-fns";

const DateFormatter = ({ dateString }) => {
  if (!dateString) {
    return null;
  }
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>;
};

export default DateFormatter;

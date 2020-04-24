import { parseISO, format } from "date-fns";
/**
 *
 * @param {{ dateString: string }} param0
 */
export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}

import { format, formatDistanceToNow, getTime } from "date-fns";

export function fDate(date) {
  return format(new Date(date), "yyyy-MM-dd");
}

export function fDateCard(date) {
  return format(new Date(date), "yyyy-MMM-dd");
}

export function fDateTime(date) {
  return format(new Date(date), "dd MMM yyyy HH:mm");
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

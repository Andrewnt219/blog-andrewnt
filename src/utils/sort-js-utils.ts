export function sortByDate(a: Date, b: Date) {
  return a.getTime() - b.getTime();
}

export function sortByDateString(a: string, b: string) {
  return new Date(a).getTime() - new Date(b).getTime();
}

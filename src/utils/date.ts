import { WEEKDAY } from "../constants/ticket";

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };

  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options);
}


export const generateDate = ()=>{
  const date = new Date();
  let weekDays = [];
  for(let i=0;i<7;i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: WEEKDAY[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()]
    }
    weekDays.push(tempDate)
  }
  return weekDays 
}
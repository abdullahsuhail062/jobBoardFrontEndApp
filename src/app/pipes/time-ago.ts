import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true // 👈 makes it usable in standalone components
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date | number): string {
    if (!value) return '';

    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((+now - +date) / 1000);

    if (seconds < 29) return 'just now';

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };

    let counter;
    for (const i in intervals) {
      counter = Math.floor(seconds / intervals[i]);
      if (counter > 0) {
        return counter === 1
          ? `${counter} ${i} ago`
          : `${counter} ${i}s ago`;
      }
    }
    return date.toLocaleString();
  }
}

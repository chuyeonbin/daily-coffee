import { parseISO } from 'date-fns';
import { atom, selector } from 'recoil';

export interface LogType {
  id: number;
  date: string;
  cafe: string;
  coffee: string;
  price: number;
  create_at: string;
  updated_at: string;
}

export const logsState = atom<LogType[]>({
  key: 'logs',
  default: [],
});

export const groupedByDateLogsState = selector({
  key: 'groupedByDateLogs',
  get: ({ get }) => {
    const logs = get(logsState);

    const groupedByDateLogs: { [key: string]: LogType[] } = {};

    logs.forEach((log) => {
      const slicedDate = log.date.slice(0, 10);
      if (!groupedByDateLogs[slicedDate]) {
        groupedByDateLogs[slicedDate] = [];
      }
      groupedByDateLogs[slicedDate].push(log);
    });

    return groupedByDateLogs;
  },
});

export const sortedDatesState = selector({
  key: 'sortedDates',
  get: ({ get }) => {
    const logs = get(logsState);
    const dates = logs.map((log) => log.date.slice(0, 10));
    const filterDates = Array.from(new Set(dates));
    const sortedDates = filterDates.sort((dateA, dateB) =>
      parseISO(dateA) < parseISO(dateB) ? 1 : -1,
    );
    return sortedDates;
  },
});

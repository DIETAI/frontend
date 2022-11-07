export interface ICalendarNoteData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  title: string;
  description?: string;
  date: Date;
}

export interface ICalendarNoteProps {
  calendarNote: ICalendarNoteData;
}

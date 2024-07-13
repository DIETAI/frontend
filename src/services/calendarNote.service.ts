import useSWR from "swr";
import { ICalendarNoteData } from "interfaces/calendarNote";
import fetcher from "utils/fetcher";

const calendarNotesApiUrl = "/api/v1/calendarNotes";

export const useCalendarNotes = () => {
  const { data, isLoading, error } = useSWR<ICalendarNoteData[]>(
    `${calendarNotesApiUrl}`,
    fetcher
  );

  return {
    calendarNotes: data,
    calendarNotesLoading: isLoading,
    calendarNotesError: error,
  };
};

export const useCalendarNote = (id: string) => {
  const { data, isLoading, error } = useSWR<ICalendarNoteData>(
    `${calendarNotesApiUrl}/${id}`,
    fetcher
  );

  return {
    calendarNote: data,
    calendarNoteLoading: isLoading,
    calendarNoteError: error,
  };
};

import useSWR from "swr";
import axios from "utils/api";
import { IAssetData } from "interfaces/asset.interfaces";
import { ICalendarNoteData } from "interfaces/calendarNote";

const fetcher = (url: string, headers = {}) =>
  axios
    .get(url, {
      headers,
      withCredentials: true,
    })
    .then((res) => res.data);

export const getCalendarNotes = () => {
  const { data, error } = useSWR<ICalendarNoteData[] | null>(
    `/api/v1/calendarNotes`,
    fetcher
  );

  return {
    calendarNotes: data,
    calendarNotesLoading: !error && !data,
    calendarNotesError: error,
  };
};

export const getCalendarNote = (id: string) => {
  const { data, error } = useSWR<ICalendarNoteData | null>(
    `/api/v1/calendarNotes/${id}`,
    fetcher
  );

  return {
    calendarNote: data,
    calendarNoteLoading: !error && !data,
    calendarNoteError: error,
  };
};

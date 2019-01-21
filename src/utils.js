import { distanceInWordsToNow } from "date-fns";

export const getLastUpdated = updateTimes => {
  const timeInMSArray = updateTimes.map(time => {
    const d = new Date(time.lastUpdated);
    return distanceInWordsToNow(d);
  });
  return `${timeInMSArray[0].toUpperCase()} AGO`;
};

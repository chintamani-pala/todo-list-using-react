export const useGetLocalTime = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const localTime = new Date(now.getTime() - offset);
  const formattedDateTime = localTime.toISOString().slice(0, 16);
  return formattedDateTime;
};
export const getTodayEndTime = () => {
    const now = new Date();
    now.setHours(23, 59, 0, 0); // Set time to 11:59 PM
    const offset = now.getTimezoneOffset() * 60000;
    const localTime = new Date(now.getTime() - offset);
    return localTime.toISOString().slice(0, 16);
  };
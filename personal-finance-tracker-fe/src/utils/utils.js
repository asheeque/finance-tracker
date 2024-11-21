export const displayDate = (utcDateString) => {
    const utcDate = new Date(utcDateString);
    // utcDate.setMinutes(utcDate.getMinutes() ); // Adjust UTC to local time
    console.log(utcDateString)
    return utcDate.toISOString().split("T")[0]; // Return local date in YYYY-MM-DD
  };
  
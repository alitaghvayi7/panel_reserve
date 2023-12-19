export const secondsToHMS = (seconds: number) => {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;

  // Convert each value to string and pad with zeros if necessary
  let hoursString = Math.floor(hours);
  let minutesString = Math.floor(minutes);
  let secondsString = Math.floor(remainingSeconds);

  // Concatenate with colons
  let timeString = `${hoursString < 10 ? `0${hoursString}` : hoursString}:${
    minutesString < 10 ? `0${minutesString}` : minutesString
  }:${secondsString < 10 ? `0${secondsString}` : secondsString}`;

  return timeString;
};

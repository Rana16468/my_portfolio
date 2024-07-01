
  

  export function convertToDays(dateString) {
    const date = new Date(dateString);
  
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const dayName = daysOfWeek[date.getUTCDay()];
    const monthName = monthsOfYear[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
  
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  
    return `${dayName}, ${day} ${monthName} ${year}, ${hours}:${minutes}:${seconds} UTC`;
  }
  
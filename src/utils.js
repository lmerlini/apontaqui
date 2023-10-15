function addCurrentTimeToDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  date.setHours(now.getHours());
  date.setMinutes(now.getMinutes());
  date.setSeconds(now.getSeconds());

  return date.toISOString().slice(0, 19).replace('T', ' ');
}

function formatDateBR(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // os meses começam do 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}



export { addCurrentTimeToDate, formatDateBR }
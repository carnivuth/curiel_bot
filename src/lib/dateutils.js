const weekdays = new Map();

weekdays.set("lunedi", 1);
weekdays.set("martedi", 2);
weekdays.set("mercoledi", 3);
weekdays.set("giovedi", 4);
weekdays.set("venerdi", 5);
weekdays.set("lunedì", 1);
weekdays.set("martedì", 2);
weekdays.set("mercoledì", 3);
weekdays.set("giovedì", 4);
weekdays.set("venerdì", 5);
weekdays.set("sabato", 6);
weekdays.set("domenica", 0);

module.exports = {
  getdaynumber(day) {
    return weekdays.get(day);
  },
  getdatefromweekday(day) {
    date = new Date();
    while (day != date.getDay()) {
      date.setDate(date.getDate() + 1);
    }
    return date;
  },
};

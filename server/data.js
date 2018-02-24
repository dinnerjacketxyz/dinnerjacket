// declare variables to hold data
let dailynews_list
let diarycalendar_events
let timetable_dailytimetable
let timetable_timetable
let details_participation
let details_userinfo
let timetable_bells
let calendar_days
let calendar_terms

// URLs used for setting and getting data
const URLs = [
  'dailynews/list.json',
  'diarycalendar/events.json',
  'timetable/daytimetable.json',
  'timetable/timetable.json',
  'details/participation.json',
  'details/userinfo.json',
  'timetable/bells.json',
  'calendar/days.json',
  'calendar/terms.json'
]

// used to set data
// URL - the URL (see above) for which to set data
// data - the data to set
exports.importData = (URL, data) => {
  switch (URL) {
    case URLs[0]: dailynews_list = data; break;
    case URLs[1]: diarycalendar_events = data; break;
    case URLs[2]: timetable_dailytimetable = data; break;
    case URLs[3]: timetable_timetable = data; break;
    case URLs[4]: details_participation = data; break;
    case URLs[5]: details_userinfo = data; break;
    case URLs[6]: timetable_bells = data; break;
    case URLs[7]: calendar_days = data; break;
    case URLs[8]: calendar_terms = data; break;
   }
}

// used to get data
// URL - the URL (see above) for which to get data
exports.exportData = (URL) => {
  switch (URL) {
    case URLs[0]: return dailynews_list; break;
    case URLs[1]: return diarycalendar_events; break;
    case URLs[2]: return timetable_dailytimetable; break;
    case URLs[3]: return timetable_timetable; break;
    case URLs[4]: return details_participation; break;
    case URLs[5]: return details_userinfo; break;
    case URLs[6]: return timetable_bells; break;
    case URLs[7]: return calendar_days; break;
    case URLs[8]: return calendar_terms; break;
  }
}

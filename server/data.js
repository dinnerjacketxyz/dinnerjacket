// returns true if all data items are present
let dataReady = function() {
  return (dailynews_list != null &&
					diarycalendar_events != null &&
					timetable_dailytimetable != null &&
					timetable_timetable != null &&
					details_participation != null &&
					details_userinfo != null &&
					timetable_bells != null &&
					calendar_days != null &&
					calendar_terms != null)
}

// export function so it can be externally accessed
exports.dataReady = dataReady

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

// export variables so they can be externally accessed
exports.dailynews_list = dailynews_list
exports.diarycalendar_events = diarycalendar_events
exports.timetable_dailytimetable = timetable_dailytimetable
exports.timetable_timetable = timetable_timetable
exports.details_participation = details_participation
exports.details_userinfo = details_userinfo
exports.timetable_bells = timetable_bells
exports.calendar_days = calendar_days
exports.calendar_terms = calendar_terms


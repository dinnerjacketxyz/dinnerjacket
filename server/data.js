let self = this

// export function so it can be externally accessed
// exports.dataReady = dataReady()
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

exports.dailynews_list = dailynews_list
exports.diarycalendar_events = diarycalendar_events
exports.timetable_dailytimetable = timetable_dailytimetable
exports.timetable_timetable = timetable_timetable
exports.details_participation = details_participation
exports.details_userinfo = details_userinfo
exports.timetable_bells = timetable_bells
exports.calendar_days = calendar_days
exports.calendar_terms = calendar_terms

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

exports.importData = (URL, data) => {
	switch (URL) {
		case URLs[0]: dailynews_list = data;
			exports.dailynews_list = dailynews_list;
			break;
		case URLs[1]: diarycalendar_events = data;
			exports.diarycalendar_events = diarycalendar_events;
			break;
		case URLs[2]: timetable_dailytimetable = data;
			exports.timetable_dailytimetable = timetable_dailytimetable;
			break;
		case URLs[3]: timetable_timetable = data;
			exports.timetable_timetable = timetable_timetable;
			break;
		case URLs[4]: details_participation = data;
			exports.details_participation = details_participation;
			break;
		case URLs[5]: details_userinfo = data;
			exports.details_userinfo = details_userinfo;
			break;
		case URLs[6]: timetable_bells = data;
			exports.timetable_bells = timetable_bells;
			break;
		case URLs[7]: calendar_days = data;
			exports.calendar_days = calendar_days;
			break;
		case URLs[8]: calendar_terms = data;
			exports.calendar_terms = calendar_terms;
			break;
	  }
	}
exports.exportData = (URL) => {
	switch (URL) {
		case URLs[0]: return dailynews_list
			break;
		case URLs[1]: return diarycalendar_events
			break;
		case URLs[2]: return timetable_dailytimetable
			break;
		case URLs[3]: return timetable_timetable
			break;
		case URLs[4]: return details_participation
			break;
		case URLs[5]: return details_userinfo
			break;
		case URLs[6]: return timetable_bells
			break;
		case URLs[7]: return calendar_days
			break;
		case URLs[8]: return calendar_terms
			break;
	}
}

const allMeetByEmployeeQuery = require('./allMeetByEmployeeQuery');

const checkEmployeeDisponibility = async (employees, meetDate, meetStart, meetEnd) => {

    const employeesIds = employees.reduce((acc, value) => {
        return acc.concat(value.id);
    }, []);

    const allMeetsByEmployees = await allMeetByEmployeeQuery(employeesIds);

    for (const meetsEmployee of allMeetsByEmployees) {
        for (const meet of meetsEmployee.Meets) {
            if (employeeHasMeet(meet, meetDate, meetStart, meetEnd)) {
                console.log('no')
                return false;
            }
        }
    }
    console.log('si')
    return true;
}

const employeeHasMeet = (meet, meetDate, meetStart, meetEnd) => {
    const splitNewMeetStart = meetStart.split(':');
    const splitNewMeetEnd = meetEnd.split(':');

    const splitOldMeetStart = meet.meetStart.split(':');
    const splitOldMeetEnd = meet.meetEnd.split(':');

    const newMeetStartMilisecond = new Date(new Date(meetDate).setHours(splitNewMeetStart[0])).setMinutes(splitNewMeetStart[1]);
    const newMeetEndMilisecond = new Date(new Date(meetDate).setHours(splitNewMeetEnd[0])).setMinutes(splitNewMeetEnd[1]);

    const oldMeetStartMilisecond = new Date(new Date(meet.meetDate).setHours(splitOldMeetStart[0])).setMinutes(splitOldMeetStart[1]);
    const oldMeetEndMilisecond = new Date(new Date(meet.meetDate).setHours(splitOldMeetEnd[0])).setMinutes(splitOldMeetEnd[1]);

    console.log(meetDate);
    console.log(meet.meetDate);

    console.log(newMeetStartMilisecond);
    console.log(newMeetEndMilisecond);
    console.log(oldMeetStartMilisecond);
    console.log(oldMeetEndMilisecond);

    if ((oldMeetStartMilisecond >= newMeetStartMilisecond && newMeetStartMilisecond <= oldMeetEndMilisecond) || 
    (oldMeetStartMilisecond >= newMeetEndMilisecond && newMeetEndMilisecond <= oldMeetEndMilisecond)) {
        return true;
    }

    return false;
}

module.exports = checkEmployeeDisponibility;
const allMeetByEmployeeQuery = require('./allMeetByEmployeeQuery');
const m = require('moment');

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

    const newMeetStart = m(meetDate).hours(parseInt(splitNewMeetStart[0])).minutes(parseInt(splitNewMeetStart[1]));
    const newMeetEnd = m(meetDate).hours(parseInt(splitNewMeetEnd[0])).minutes(parseInt(splitNewMeetEnd[1]));

    const oldMeetStart = m(meet.meetDate).hours(parseInt(splitOldMeetStart[0])).minutes(parseInt(splitOldMeetStart[1]));;
    const oldMeetEnd = m(meet.meetDate).hours(parseInt(splitOldMeetEnd[0])).minutes(parseInt(splitOldMeetEnd[1]));;

    console.log(newMeetStart, newMeetEnd, oldMeetStart, oldMeetEnd, oldMeetStart.isBetween(newMeetStart, newMeetEnd), oldMeetEnd.isBetween(newMeetStart, newMeetEnd), newMeetStart.isBetween(oldMeetStart, oldMeetEnd));

    if (oldMeetStart.isBetween(newMeetStart, newMeetEnd) ||
        oldMeetEnd.isBetween(newMeetStart, newMeetEnd) ||
        newMeetStart.isBetween(oldMeetStart, oldMeetEnd)
    ) {
        return true
    }

    return false;
}

module.exports = checkEmployeeDisponibility;
const checkEmployeeDisponibility = require('../helpers/checkEmployeeDisponibility');
const Meet = require('../../../models/Meet');
const EmployeeMeet = require('../../../models/EmployeeMeet');

const handler = async (req, res, next) => {
    const { meetName, meetDate, meetStart, meetEnd, employees } = req.body;

    const employeesDisponibility = await checkEmployeeDisponibility(employees);

    if (employeesDisponibility) {
        try {
            // Create and save the order
            const savedMeet = await Meet.create({
                meetName,
                meetDate,
                meetStart,
                meetEnd
            }, { w: 1 }, { returning: true });

            for (const employee of employees) {
                const newEmployeeMeet = {
                    employeeId: employee.id,
                    meetId: savedMeet.id,
                }

                await EmployeeMeet.create(newEmployeeMeet, { w: 1 }, { returning: true });
            }

            res.status(200).json('La reunión se ha creado correctamente para todos los empleados seleccionados.');
        } catch (err) {
            console.error('Server Error: ', err);
            res.sendStatus(500).json({ msg: 'Se ha generado un problema al intentar crear la reunion.' });
            next(err);
        }
    }
}

module.exports = handler;
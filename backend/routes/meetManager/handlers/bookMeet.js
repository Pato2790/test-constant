const checkEmployeeDisponibility = require('../helpers/checkEmployeeDisponibility');
const Meet = require('../../../models/Meet');
const EmployeeMeet = require('../../../models/EmployeeMeet');

const handler = async (req, res, next) => {
    const { meetName, meetDate, meetStart, meetEnd, employees } = req.body;

    const employeesDisponibility = await checkEmployeeDisponibility(employees, meetDate, meetStart, meetEnd);

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

            res.status(200).json({ message: 'La reunión se ha creado correctamente para todos los empleados seleccionados.', created: true });
        } catch (err) {
            console.error('Server Error: ', err);
            res.sendStatus(500).json({ message: 'Se ha generado un problema al intentar crear la reunion.', created: false });
            next(err);
        }
    }

    res.status(200).json({ message: 'No se ha podido crear la reunion porque uno o mas participantes tienen reuniones asignadas en dicho horario', created: false });
}

module.exports = handler;
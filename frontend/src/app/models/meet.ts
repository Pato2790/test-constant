import { Employee } from './employee'

export class Meet {
    meetId?: string
    meetName: string
    meetDate: Date
    meetStart: string
    meetEnd: string
    employees: Employee[]
}

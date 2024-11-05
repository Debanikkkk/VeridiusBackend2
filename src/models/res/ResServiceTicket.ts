import { jobCardStatus, ServiceTicket } from "../../entity/ServiceTickets";
import { ResUser } from "./ResUser";

export interface ResServiceTicket{
    date?: Date,
    id?: number,
    service_ticket_number?: string,
    status?: jobCardStatus,
    technician?: ResUser
}
import { Body, Controller, Path, Post, Put, Request, Route, Security, Tags } from "tsoa";
import { AppDataSource } from "../data-source";
import { serviceTicketStatus, ServiceTicket } from "../entity/ServiceTickets";
import { JWTRequest } from "../models/req/JWTRequest";
import { User } from "../entity/User";
import { ResServiceTicket } from "../models/res/ResServiceTicket";
import { ReqSTstatus } from "../models/req/ReqSTstatus";
function generateRandomString(length: number) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
@Tags('Service Ticket')
@Route('/serviceTicket')
export class ServiceTicketController extends Controller{
    private serviceticketrepository=AppDataSource.getRepository(ServiceTicket)
    private userrepository=AppDataSource.getRepository(User)


    /** 
     * generates service ticket
     * @summary generates service ticket 
    */
    @Post()
    @Security('Api-Token', [])
    public async saveServiceTicket(@Request() req: JWTRequest): Promise<ResServiceTicket>{
        const serviceTicketNumber=generateRandomString(16);
        const user=await this.userrepository.findOne({
            where:{
                id: req.user.id
            }
        })
        if(!user){
            return Promise.reject(new Error('USER NOT FODUN '))
        }
        const serviceTicketToSave: ServiceTicket={
            // date:,
            // id,
            service_ticket_number: serviceTicketNumber,
            status: serviceTicketStatus.new,
            technician: Promise.resolve(user)
        }

        const stSaver=Object.assign(new ServiceTicket(), serviceTicketToSave)
        const savedSt=await this.serviceticketrepository.save(stSaver)

        const resServiceTicket: ResServiceTicket={
            date: savedSt.date,
            id: savedSt.id,
            service_ticket_number: savedSt.service_ticket_number,
            status: savedSt.status,
            technician: user
        }
        return resServiceTicket
    }

     /**
     * UPDATE SERVICE TICKET STATUS
     * @summary UPDATE SERVICE TICKET STATUS
     */
    @Put('/{serviceTicketId}')
    public async updateServiceTicketStatus(@Path() serviceTicketId: number, @Body() request: ReqSTstatus){
        const {status}=request
        const currentSt=await this.serviceticketrepository.findOne({
            where:{
                id: serviceTicketId
            }
        })


        if(!currentSt){
            return Promise.reject(new Error('SERVICE TICEKR WAS NOT FOUND'))
        }

        currentSt.status=status

        const newST=Object.assign(new ServiceTicket(), currentSt)

        const updatedST=await this.serviceticketrepository.save(newST)

        return updatedST
    }

}
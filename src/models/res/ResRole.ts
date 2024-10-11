export interface ResRole{
    id?: number,
    name?: string,
    description?: string,
    subRole?: ResRole[],
}
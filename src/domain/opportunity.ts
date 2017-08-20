export class Opportunity {
  readonly $key?: string;
  readonly createdDate: string;
  readonly movementId: number;
  readonly updatedDate: string;
  readonly userGender: string;
  public archived?: boolean;
  
  constructor(
    public appointments: number,
    public city: string,
    public contacts: number,
    public country: string,
    public date: string,
    public endTime: string,
    public latitude: string,
    public location: string,
    public longitude: string,
    public people: number,
    public postalCode: string,
    public rating: number,
    public sales: number,
    public startTime: string,
    public state: string,
    public userId: number,
    public sessionId?: number,
    readonly id?: number
  ) {}
}

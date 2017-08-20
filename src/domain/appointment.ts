export class Appointment{
  readonly $key?: string;
  readonly createdDate: string;
  readonly updatedDate: string;
  public archived: boolean;
  
  constructor(
    public comments: string,
    public contactId: number,
    public contactName: string,
    public date: string,
    public location: string,
    public result: string,
    public sessionId: number,
    public time: string,
    public userId: number,
    readonly id?: number
  ) {}
}

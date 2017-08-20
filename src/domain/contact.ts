export class Contact {
  readonly $key?: string;
  readonly createdDate: string;
  readonly updatedDate: string;
  
  constructor(
    public archived: boolean,
    public city: string,
    public email: string,
    public firstName: string,
    public gender: string,
    public lastName: string,
    public notes: string,
    public partner: string,
    public phone: string,
    public postalCode: string,
    public rating: number,
    public sessionId: number,
    public state: string,
    public userId: number,
    readonly id?: number
  ) {}
}

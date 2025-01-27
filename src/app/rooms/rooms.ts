export interface Room
{
    totalrooms : number;
    availablerooms : number;
    bookedrooms : number;
}

export interface RoomList 
{
    roomNumber: string;
   roomType : string;
   amenities : string;
   price : number;
   photo : string;
   CheckInTime : Date;
   CheckOutTIme : Date;
   rating : number;
}

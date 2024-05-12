export enum StatusEnum {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
  Processing = 3,
  Completed = 4,
  InWarehouse = 5,
  OnBoard = 6,
  InTransit = 7,
  Delivered = 8,
  AtCustoms = 9,
  InTransshipment = 10,
}

export enum DirectionEnum {
  DepartureShipment = 'Departure Shipment',
  ArrivalShipment = 'Arrival Shipment',
}

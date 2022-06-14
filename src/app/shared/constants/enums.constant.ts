export enum Jobs {
  Access_Rights = 6200,
  Main = 100,
  View_User = 300000000,
  Add_User = 300000100,
  View_Client = 300000200,
  Add_Client = 300000300,
}
export enum modules {
  Settings = 130000,
  Dashboards = 180000,
  Reports = 170000,
  // Dashboards = 10001,
  // Reports = 20001,
  Users = 30001,
  Clients = 40001,
}
export enum HttpRequestType {
  POST,
  GET,
  PUT,
  DELETE,
}
export enum MessageType {
  Success,
  Warning,
  Error,
  Info,
}

export enum SnackBarPosition {
  Left,
  Center,
  Right,
}
export enum ReportFieldTypes {
  Text = 0,
  Number = 1,
  Date = 3,
  ImageGallery = 4,
  Variation = 5,
  Percentage = 6,
  Currency = 7,
  ClientStatus = 8,
}

export enum ReportActionType {
  SpecialPdfExport = 1,
  MasterDetails = 7,
  ExecuteCustomProcedure = 8,
}

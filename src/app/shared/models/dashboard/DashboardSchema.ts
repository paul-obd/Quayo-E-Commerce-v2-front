export class DashboardSchema {
  id: number;
  name: string;
  caption: string;
  layouts: Array<DashboardLayout>;
}

export class DashboardLayout{
  id: number;
  name: string;
  
  flex_xs: string;
  flex_sm: string;
  flex_md: string;
  flex_lg: string;
  flex_xl: string;

  components: Array<DashboardComponent>;
}

export class DashboardComponent {
  properties: DashboardComponentProperties;
  schema: any;
}

export class DashboardComponentProperties {
  id: number;
  name: string;
  typeId: number;
  flex_xs: string;
  flex_sm: string;
  flex_md: string;
  flex_lg: string;
  flex_xl: string;
  height: string;
  timeInterval: number;
}

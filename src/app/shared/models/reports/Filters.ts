export class Filters {
  public filters: Array<Filter> = [];
}

export class Filter {
  name: string;
  placeholder: string;
  icon: string;
  filterType: string;
  filterData: any
  filterColumns: Array<FilterColumn> = [];
}
export class FilterColumn {
  name: string;
  label: string;
}

export class FiltersResult {
  reportId: string;
  timeStamp: string;

  resultFilterDataArray: Array<FilterData>;
}

export class FilterData {
  filterItemName: string;
  dataType: string;
  data: Array<ReportFilterResultData>;
}

export class ReportFilterResultData {
  constructor(public key: string, public value: string) {  }
}

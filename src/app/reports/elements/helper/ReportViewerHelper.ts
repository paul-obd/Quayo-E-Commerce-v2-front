import { FilterData } from '../../../shared/models/reports/FiltersResult';

export class ReportViewerHelper {
  static addOrUpdateSelectedData(selectedDataArray: Array<FilterData>, selectedData: FilterData) {

    if (selectedData.data.length !== 0 || selectedData.dataType === 'Data Grid') {

      // tslint:disable-next-line: no-shadowed-variable
      const item = selectedDataArray.find(item => item.filterItemName === selectedData.filterItemName);

      if (!item) {
        selectedDataArray.push(selectedData);
      } else {
        if (selectedData.data.length <= 10) { selectedData.data = this.deleteNullDataFromArray(selectedData.data); }
        if (selectedData.data.length === 0) {
          this.deleteFromArray(selectedDataArray, selectedData);
        } else {
          item.data = selectedData.data;
        }
      }

    }
  }

    static deleteFromArray(array: any, itemToDelete: any) {
        const indexOf = array.findIndex(item => item.filterItemName === itemToDelete.filterItemName);
        array.splice(indexOf, 1);
  }

  static deleteNullDataFromArray(array: any) {
    const resArray = array.filter(item => item.value !== '');
    return resArray;
  }

}

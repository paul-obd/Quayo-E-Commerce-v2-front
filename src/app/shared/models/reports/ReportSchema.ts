export class ReportSchema {
    reportId: number;
    job_id: number;
    report_code: string;
    description: string;
    overview: string;
    report_type: string;
    is_visible: boolean;
    is_exportable_PDF: boolean;
    is_exportable_XLSX: boolean;
    is_exportable_Csv: boolean;
    is_grouped: boolean;
    is_colored: boolean;
    page_size: number;

    pivot_allow_sorting_by_summary: boolean;
    pivot_allow_filtering: boolean;
    pivot_show_row_totals: boolean;
    pivot_show_row_grand_totals: boolean;
    pivot_show_column_totals: boolean;
    pivot_show_column_grand_totals: boolean;

    pivot_show_data_fields:boolean;
    pivot_show_row_fields:boolean;
    pivot_show_filter_fields:boolean;
    pivot_show_column_fields:boolean;



    group_index: number;
    is_favorite: boolean;
    has_master_details: boolean;
    has_special_pdf_export: boolean;
    has_context_menu_items: boolean;
    report_field: Array<Report_Field>;
    report_filters: Array<Report_Filters>;
    report_context_menu_items: Array<Report_Context_Menu_Items>;
}

export class Report_Field {
    report_id: number;
    report_field_name: string;
    caption: string;
    field_type: number;
    field_format: string;
    is_visible: boolean;
    is_summable: boolean;
    is_avg: boolean;
    is_max: boolean;
    is_min: boolean;
    is_grouped: boolean;
    is_sortable: boolean;
    is_searchable: boolean;
    is_exportable_EXCEL: boolean;
    order_sequence: number;
    group_index: number;

    pivot_allow_expand_all: boolean;
    pivot_allow_filtering: boolean;
    pivot_allow_sorting: boolean;
    pivot_allow_sorting_by_summary: boolean;
    pivot_area_id: number;
    pivot_area_index: number;
    pivot_expanded: boolean;
    pivot_show_totals: boolean;
    pivot_summary_type: string;
}

export class Report_Filters {
  report_id: number;
  report_pre_filter_id: number;
  report_pre_filter_name: string;
  description: string;
  data_source: string;
  pre_filter_type: number;
  pre_filter_type_description: string;
}

export class Report_Context_Menu_Items {
  report_id: number;
  report_action_type: number;
  description: string;
  procedure_name: string;
  icon_name: string;
}
export class DataGridData {
  dataSource: any;
}

export class DatasourceParameters {
    ComponentId: number;
    DataHashCode: string
    ParametersCodeValue: Array<ParameterCodeValue>;
}

export class ParameterCodeValue {
    Code: string;
    Value: string;
}
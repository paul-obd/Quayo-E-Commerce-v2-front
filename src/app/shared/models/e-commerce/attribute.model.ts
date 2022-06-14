import { AttributeValue } from "./attribute-value.model";

export class Attribute{
    attributeCode: string;
    description: string;
    attributeValues: AttributeValue[];
    showShortDesciption: boolean= true
}
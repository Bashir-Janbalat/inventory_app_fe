import {FormField} from "./FormField.ts";
import {PageType} from "./PageType.ts";

export interface GenericFormProps {
    page: PageType
    title: string;
    fields: FormField[];
    submitButtonText: string
    onSubmit: (values: Record<string, string>) => Promise<void>;
    backTo?: string;
}
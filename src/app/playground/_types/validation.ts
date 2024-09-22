export type ValidationRequest = {
    validations: Validation[];
};

export type Validation = {
    id: string;
    variables: Variable[];
};

export type Variable = {
    type: 'file' | 'other';
    name: string;
    value: string;
};

export type ValidationResponse = {
    results: Result[];
};

export type Result = {
    id: string;
    isValid: boolean;
    message: string;
};

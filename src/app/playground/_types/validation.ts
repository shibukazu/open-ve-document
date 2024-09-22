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

export const validateValidationRequest = (request: ValidationRequest): boolean => {
    return request.validations.every((validation) => {
        return (
            validation.id.length > 0 &&
            validation.variables.length > 0 &&
            validation.variables.every((variable) => {
                return variable.name.length > 0;
            })
        );
    });
};

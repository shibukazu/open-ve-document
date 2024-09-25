'use client';

import { useState } from 'react';

import { getAPIURL, OpenVEMode } from '@/app/_utils/environment';
import {
    validateValidationRequest,
    ValidationRequest,
    ValidationResponse,
} from '@/app/playground/_types/validation';
import { TypographyH3, TypographyLarge } from '@/components/open-ve-document/typography';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

type Props = {
    validationResponse?: ValidationResponse;
    setValidationResponse: (response: ValidationResponse) => void;
    mode: OpenVEMode;
};

export const RequestEditor = ({ validationResponse, setValidationResponse, mode }: Props) => {
    const [request, setRequest] = useState<ValidationRequest>({ validations: [] });

    const onClickSend = async () => {
        if (!validateValidationRequest(request)) {
            toast({
                variant: 'destructive',
                title: 'Invalid Request',
                description: 'Please fill out all required fields.',
            });
        } else {
            try {
                const response = await validate(mode, request);
                setValidationResponse(response);
                toast({
                    title: 'Request Sent',
                    description: 'Validation request has been sent successfully.',
                });
            } catch (e) {
                toast({
                    variant: 'destructive',
                    title: 'Failed to validate',
                    description: 'There was a problem with your request. Try again later.',
                });
            }
        }
    };
    return (
        <div className='flex flex-col gap-2 w-full h-full'>
            <TypographyH3>Request</TypographyH3>
            {request.validations.map((validation, index) => (
                <Card key={index}>
                    <CardContent className='flex flex-col gap-2 p-2'>
                        <div className='flex flex-row justify-between'>
                            <TypographyLarge>Validation {index + 1}</TypographyLarge>
                            <Button
                                onClick={() => {
                                    const newValidations = request.validations.slice();
                                    newValidations.splice(index, 1);
                                    setRequest({ validations: newValidations });
                                }}
                                variant={'link'}
                            >
                                Delete
                            </Button>
                        </div>
                        <div className='flex flex-row justify-between items-center gap-2'>
                            <Label>ID</Label>
                            <Input
                                onBlur={(e) => {
                                    const newValidations = request.validations.slice();
                                    newValidations[index].id = e.target.value;
                                    setRequest({ validations: newValidations });
                                }}
                            />
                        </div>
                        {validation.variables.map((variable, variableIndex) => (
                            <div
                                key={variableIndex}
                                className='flex flex-row justify-between items-end gap-2'
                            >
                                <div className='className="grid w-full max-w-sm items-center gap-1.5'>
                                    <Label>Variable Type</Label>
                                    <Select
                                        defaultValue='other'
                                        onValueChange={(value) => {
                                            const newValidations = request.validations.slice();
                                            newValidations[index].variables[variableIndex].type =
                                                value as 'file' | 'other';
                                            setRequest({ validations: newValidations });
                                        }}
                                    >
                                        <SelectTrigger className='w-[180px]'>
                                            <SelectValue placeholder='Variable Type' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Variable Type</SelectLabel>
                                                <SelectItem value='file'>File</SelectItem>
                                                <SelectItem value='other'>Other</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className='className="grid w-full max-w-sm items-center gap-1.5'>
                                    <Label>Variable Name</Label>
                                    <Input
                                        onBlur={(e) => {
                                            const newValidations = request.validations.slice();
                                            newValidations[index].variables[variableIndex].name =
                                                e.target.value;
                                            setRequest({ validations: newValidations });
                                        }}
                                        required
                                    />
                                </div>
                                {variable.type === 'file' ? (
                                    <div className='className="grid w-full max-w-sm items-center gap-1.5'>
                                        <Label>Variable Value</Label>
                                        <Input
                                            type='file'
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) {
                                                    return;
                                                }

                                                const reader = new FileReader();
                                                reader.onload = async (event) => {
                                                    if (event.target?.result) {
                                                        const base64String = btoa(
                                                            String.fromCharCode(
                                                                ...new Uint8Array(
                                                                    event.target
                                                                        .result as ArrayBuffer,
                                                                ),
                                                            ),
                                                        );
                                                        const newValidations =
                                                            request.validations.slice();
                                                        newValidations[index].variables[
                                                            variableIndex
                                                        ].value = base64String;
                                                        setRequest({ validations: newValidations });
                                                    }
                                                };
                                                reader.readAsArrayBuffer(file);
                                            }}
                                            required
                                        />
                                    </div>
                                ) : (
                                    <div className='className="grid w-full max-w-sm items-center gap-1.5'>
                                        <Label>Variable Value</Label>
                                        <Input
                                            onBlur={(e) => {
                                                const newValidations = request.validations.slice();
                                                newValidations[index].variables[
                                                    variableIndex
                                                ].value = e.target.value;
                                                setRequest({ validations: newValidations });
                                            }}
                                            required
                                        />
                                    </div>
                                )}

                                <Button
                                    onClick={() => {
                                        const newValidations = request.validations.slice();
                                        newValidations[index].variables.splice(variableIndex, 1);
                                        setRequest({ validations: newValidations });
                                    }}
                                    variant={'link'}
                                >
                                    Delete
                                </Button>
                            </div>
                        ))}
                        <Button
                            onClick={() => {
                                const newValidations = request.validations.slice();
                                newValidations[index].variables.push({
                                    type: 'other',
                                    name: '',
                                    value: '',
                                });
                                setRequest({ validations: newValidations });
                            }}
                            variant={'secondary'}
                            className='w-full'
                        >
                            Add Variable
                        </Button>
                    </CardContent>
                </Card>
            ))}
            <Button
                variant={'secondary'}
                className='w-full'
                onClick={() => {
                    setRequest({
                        validations: [
                            ...request.validations,
                            {
                                id: '',
                                variables: [],
                            },
                        ],
                    });
                }}
            >
                Add Validation
            </Button>
            <Button className='w-full' onClick={onClickSend}>
                Send
            </Button>
        </div>
    );
};

const validate = async (mode: OpenVEMode, request: ValidationRequest) => {
    const _request = {
        validations: request.validations.map((validation) => ({
            id: validation.id,
            variables: validation.variables.reduce(
                (acc, variable) => {
                    acc[variable.name] = variable.value;
                    return acc;
                },
                {} as Record<string, string>,
            ),
        })),
    };
    const url = new URL('v1/check', getAPIURL(mode));
    const response = await fetch(url.toString(), {
        method: 'POST',
        body: JSON.stringify(_request),
    });

    if (!response.ok) {
        throw new Error('Failed to validate');
    }

    return response.json();
};

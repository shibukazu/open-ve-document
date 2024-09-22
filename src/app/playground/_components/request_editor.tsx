'use client';

import { useState } from 'react';

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
import { ValidationRequest, ValidationResponse } from '@/app/playground/_types/validation';

type Props = {
    validationResponse?: ValidationResponse;
    setValidationResponse: (response: ValidationResponse) => void;
};

export const RequestEditor = ({ validationResponse }: Props) => {
    const [request, setRequest] = useState<ValidationRequest>({ validations: [] });

    const onClickSend = () => {
        console.log(request);
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
                                                const newValidations = request.validations.slice();
                                                newValidations[index].variables[
                                                    variableIndex
                                                ].value = e.target.value;
                                                setRequest({ validations: newValidations });
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

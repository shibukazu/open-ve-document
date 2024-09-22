'use client';

import { TypographyH3, TypographyMedium } from '@/components/open-ve-document/typography';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';

export const DSLEditor = () => {
    const { toast } = useToast();
    const [dsl, setDSL] = useState<string | undefined>(undefined);

    const onClickRegister = async () => {
        if (!dsl) {
            return;
        }
        try {
            await registerDSL(dsl);
            toast({
                title: 'DSL Registered',
                description: 'DSL has been registered successfully.',
            });
        } catch (e) {
            toast({
                variant: 'destructive',
                title: 'Failed to register DSL',
                description: 'There was a problem with your request. Try again later.',
            });
        }
    };

    const onClickReset = async () => {
        try {
            await registerDefaultDSL();
            setDSL(defaultDSL);
            toast({
                title: 'DSL Reset',
                description: 'DSL has been reset to default.',
            });
        } catch (e) {
            toast({
                variant: 'destructive',
                title: 'Failed to reset DSL',
                description: 'There was a problem with your request. Try again later.',
            });
        }
    };

    useEffect(() => {
        fetchInitialDSL().then((dsl) => setDSL(JSON.stringify(dsl, null, 4)));
    }, []);

    return (
        <div className='flex flex-col gap-2 w-full h-full'>
            <TypographyH3>Validation Model Editor</TypographyH3>
            <div className='flex flex-row justify-between items-center gap-2'>
                <TypographyMedium>Edit Open-VE DSL (json style) and Register.</TypographyMedium>
                <Button onClick={onClickReset}>Reset</Button>
            </div>
            <Textarea
                defaultValue={dsl}
                className='flex-grow bg-secondary'
                onBlur={(e) => setDSL(e.target.value)}
            />
            <Button className='w-full' onClick={onClickRegister}>
                Register
            </Button>
        </div>
    );
};

const fetchInitialDSL = async () => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error('API URL is not defined');
    }
    const url = new URL('v1/dsl', process.env.NEXT_PUBLIC_API_URL);
    const response = await fetch(url.toString());
    if (!response.ok) {
        return '';
    }
    return response.json();
};

const registerDSL = async (dsl: string) => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error('API URL is not defined');
    }
    const url = new URL('v1/dsl', process.env.NEXT_PUBLIC_API_URL);
    const response = await fetch(url.toString(), {
        method: 'POST',
        body: dsl,
    });

    if (!response.ok) {
        throw new Error('Failed to register DSL');
    }

    return response.json();
};

const registerDefaultDSL = async () => {
    await registerDSL(defaultDSL);
};

const defaultDSL = JSON.stringify(
    {
        validations: [
            {
                id: 'user',
                cels: ['age >= 20', 'size(name) < 20', 'size(picture) < 360'],
                variables: [
                    {
                        name: 'name',
                        type: 'string',
                    },
                    {
                        name: 'age',
                        type: 'int',
                    },
                    {
                        name: 'picture',
                        type: 'bytes',
                    },
                ],
            },
        ],
    },
    null,
    4,
);

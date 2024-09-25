'use client';

import { useEffect, useState } from 'react';

import { getAPIURL, OpenVEMode } from '@/app/_utils/environment';
import { TypographyH3, TypographyMedium } from '@/components/open-ve-document/typography';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type Props = {
    mode: OpenVEMode;
};

export const DSLEditor = ({ mode }: Props) => {
    const { toast } = useToast();
    const [dsl, setDSL] = useState<string | undefined>(undefined);

    const onClickRegister = async () => {
        if (!dsl) {
            return;
        }
        try {
            await registerDSL(mode, dsl);
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
            await registerDefaultDSL(mode);
            setDSL(mode === 'master' ? defaultMasterDSL : defaultSlaveDSL);
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
        fetchInitialDSL(mode).then((dsl) => setDSL(JSON.stringify(dsl, null, 4)));
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

const fetchInitialDSL = async (mode: OpenVEMode) => {
    const url = new URL('v1/dsl', getAPIURL(mode));
    const response = await fetch(url.toString());
    if (!response.ok) {
        return '';
    }
    return response.json();
};

const registerDSL = async (mode: OpenVEMode, dsl: string) => {
    const url = new URL('v1/dsl', getAPIURL(mode));
    const response = await fetch(url.toString(), {
        method: 'POST',
        body: dsl,
    });

    if (!response.ok) {
        throw new Error('Failed to register DSL');
    }

    return response.json();
};

const registerDefaultDSL = async (mode: OpenVEMode) => {
    if (mode === 'master') {
        return await registerDSL(mode, defaultMasterDSL);
    } else {
        return await registerDSL(mode, defaultSlaveDSL);
    }
};

const defaultMasterDSL = JSON.stringify(
    {
        validations: [
            {
                id: 'user',
                cels: ['size(name) < 20'],
                variables: [
                    {
                        name: 'name',
                        type: 'string',
                    },
                ],
            },
        ],
    },
    null,
    4,
);

const defaultSlaveDSL = JSON.stringify(
    {
        validations: [
            {
                id: 'item',
                cels: ['price > 0', 'size(image) < 360'],
                variables: [
                    {
                        name: 'price',
                        type: 'int',
                    },
                    {
                        name: 'image',
                        type: 'bytes',
                    },
                ],
            },
        ],
    },
    null,
    4,
);

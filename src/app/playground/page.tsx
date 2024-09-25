'use client';

import { useState } from 'react';

import { Playground } from '@/app/playground/_components/playground';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function Page() {
    const [mode, setMode] = useState<'slave' | 'master'>('master');
    return (
        <div className='flex flex-col justify-start items-start p-2 h-full w-screen'>
            <div className='flex flex-row justify-end w-full'>
                <Select
                    value={mode}
                    onValueChange={(value) => setMode(value as 'slave' | 'master')}
                >
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Open-VE Mode' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='slave'>Slave</SelectItem>
                        <SelectItem value='master'>Master</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div
                className='w-full h-full'
                style={{ display: mode === 'master' ? 'block' : 'none' }}
            >
                <Playground mode='master' />
            </div>
            <div className='w-full h-full' style={{ display: mode === 'slave' ? 'block' : 'none' }}>
                <Playground mode='slave' />
            </div>
        </div>
    );
}

'use client';

import { DSLEditor } from '@/app/playground/_components/dsl_editor';
import { RequestEditor } from '@/app/playground/_components/request_editor';
import { ResponseViewer } from '@/app/playground/_components/response_editor';
import { ValidationResponse } from '@/app/playground/_types/validation';
import { useState } from 'react';

export default function Playground() {
    const [response, setResponse] = useState<ValidationResponse | undefined>(undefined);
    return (
        <div className='grid grid-cols-2 h-full w-screen'>
            <div className='flex justify-start items-start flex-col p-2 border-r-2'>
                <DSLEditor />
            </div>
            <div className='grid grid-rows-2'>
                <div className='flex justify-start items-start flex-col gap-4 p-2 max-h-[45vh] overflow-scroll'>
                    <RequestEditor
                        validationResponse={response}
                        setValidationResponse={setResponse}
                    />
                </div>
                <div className='flex justify-start items-start flex-col gap-4 p-2 max-h-[45vh] overflow-scroll'>
                    <ResponseViewer response={response} />
                </div>
            </div>
        </div>
    );
}

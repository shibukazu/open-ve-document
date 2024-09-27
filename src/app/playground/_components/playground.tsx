import { useState } from 'react';

import { OpenVEMode } from '@/app/_utils/environment';
import { DSLEditor } from '@/app/playground/_components/dsl_editor';
import { RequestEditor } from '@/app/playground/_components/request_editor';
import { ResponseViewer } from '@/app/playground/_components/response_editor';
import { ValidationResponse } from '@/app/playground/_types/validation';

type Props = {
    mode: OpenVEMode;
};

export const Playground = ({ mode }: Props) => {
    const [response, setResponse] = useState<ValidationResponse | undefined>(undefined);
    return (
        <div className='grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 h-full w-full'>
            <div className='flex justify-start items-start flex-col p-2 md:border-r-2'>
                <DSLEditor mode={mode} />
            </div>
            <div className='grid grid-rows-2'>
                <div className='flex justify-start items-start flex-col gap-4 p-2 max-h-[45vh] overflow-scroll'>
                    <RequestEditor
                        mode={mode}
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
};

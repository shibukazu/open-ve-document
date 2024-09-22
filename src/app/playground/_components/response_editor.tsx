import { ValidationResponse } from '@/app/playground/_types/validation';
import {
    TypographyH3,
    TypographyLarge,
    TypographyMedium,
} from '@/components/open-ve-document/typography';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
    response?: ValidationResponse;
};

export const ResponseViewer = ({ response }: Props) => {
    return (
        <div className='flex flex-col gap-2 w-full h-full'>
            <TypographyH3>Response</TypographyH3>
            {response?.results.map((result, index) => (
                <Card key={index}>
                    <CardContent className='flex flex-col gap-2 p-2'>
                        <div className='flex flex-row justify-between items-center gap-2'>
                            <TypographyLarge>ID: {result.id}</TypographyLarge>
                            <TypographyMedium
                                className={result.isValid ? 'text-green-500' : 'text-red-500'}
                            >
                                {result.isValid ? 'Valid' : 'Invalid'}
                            </TypographyMedium>
                        </div>
                        <div className='flex flex-row justify-start items-center gap-2'>
                            <TypographyLarge>Result: </TypographyLarge>
                            <TypographyMedium>{result.message}</TypographyMedium>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

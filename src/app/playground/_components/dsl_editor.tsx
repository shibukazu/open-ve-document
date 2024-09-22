import { TypographyH3, TypographyMedium } from '@/components/open-ve-document/typography';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export const DSLEditor = () => {
    return (
        <div className='flex flex-col gap-2 w-full h-full'>
            <TypographyH3>Validation Model Editor</TypographyH3>
            <TypographyMedium>Edit Open-VE DSL (json style) and Register.</TypographyMedium>
            <Textarea defaultValue={initialDSL} className='flex-grow bg-secondary' />
            <Button className='w-full'>Register</Button>
        </div>
    );
};

const initialDSL = `{
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
};`;

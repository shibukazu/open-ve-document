import Link from 'next/link';

import { FaGithub } from 'react-icons/fa';

import { TypographyH3, TypographyH4 } from '@/components/open-ve-document/typography';
import { Button } from '@/components/ui/button';

export const Header = () => {
    return (
        <header className='bg-primary flex justify-between items-center w-full h-12 py-8'>
            <Link href='/'>
                <div className='flex flex-justify-start items-center gap-2 ml-2'>
                    <TypographyH3 className='text-primary-foreground'>Open-VE</TypographyH3>
                    <div className='flex justify-start items-center gap-2'>
                        <TypographyH3 className='text-primary-foreground'>|</TypographyH3>
                        <TypographyH4 className='text-primary-foreground'>
                            Data Validation Engine
                        </TypographyH4>
                    </div>
                </div>
            </Link>

            <nav className='flex justify-end items-center gap-1 mr-4 flex-row'>
                <Button variant='link' className='text-primary-foreground'>
                    <Link href='/'>Home</Link>
                </Button>
                <Button variant='link' className='text-primary-foreground'>
                    <Link href='/playground'>Playground</Link>
                </Button>
                <Button variant='link' className='text-primary-foreground'>
                    <Link href='/docs'>Docs</Link>
                </Button>
                <Button variant='link' className='text-primary-foreground'>
                    <Link href='/api'>API Reference</Link>
                </Button>
                <Link href='https://github.com/shibukazu/open-ve' target='_blank'>
                    <Button variant={'secondary'}>
                        <FaGithub className='mr-2' />
                        GiHub
                    </Button>
                </Link>
            </nav>
        </header>
    );
};

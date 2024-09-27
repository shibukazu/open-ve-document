import Link from 'next/link';

import { FaGithub } from 'react-icons/fa';

import { TypographyH3, TypographyH4 } from '@/components/open-ve-document/typography';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
    return (
        <header className='bg-primary flex justify-between items-center w-screen h-12 py-8 pr-2'>
            <Link href='/' className='w-full'>
                <div className='flex flex-justify-start items-center gap-2 ml-2'>
                    <TypographyH3 className='text-primary-foreground'>Open-VE</TypographyH3>
                    <div className='hidden md:block gap-2'>
                        <div className='flex flex-justify-start items-center'>
                            <TypographyH3 className='hidden md:block text-primary-foreground'>
                                |
                            </TypographyH3>
                            <TypographyH4 className='hidden md:block text-primary-foreground'>
                                Data Validation Engine
                            </TypographyH4>
                        </div>
                    </div>
                </div>
            </Link>

            <nav className='hidden md:block w-full'>
                <div className='flex justify-end items-center gap-1 flex-row'>
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
                </div>
            </nav>
            <div className='md:hidden'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline'>Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='flex flex-col justify-center items-center'>
                        <Button variant='link'>
                            <Link href='/'>Home</Link>
                        </Button>
                        <Button variant='link'>
                            <Link href='/playground'>Playground</Link>
                        </Button>
                        <Button variant='link'>
                            <Link href='/docs'>Docs</Link>
                        </Button>
                        <Button variant='link'>
                            <Link href='/api'>API Reference</Link>
                        </Button>
                        <Link href='https://github.com/shibukazu/open-ve' target='_blank'>
                            <Button variant={'link'}>
                                <FaGithub className='mr-2' />
                                GiHub
                            </Button>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

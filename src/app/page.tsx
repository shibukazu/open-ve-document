import { FaGithub } from 'react-icons/fa';

import {
    TypographyH1,
    TypographyH3,
    TypographyLarge,
    TypographyMedium,
} from '@/components/open-ve-document/typography';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <ol>
                <div className='flex justify-center items-center flex-col gap-4 min-h-96'>
                    <TypographyH1>Open-VE</TypographyH1>
                    <TypographyH3>Centralized and Consistent Data Validation Engine</TypographyH3>
                    <div className='flex flex-row justify-between items-center gap-4'>
                        <Link href='/playground'>
                            <Button>🛝 Playground</Button>
                        </Link>

                        <Link href='https://github.com/shibukazu/open-ve' target='_blank'>
                            <Button>
                                <FaGithub className='mr-2' />
                                Join Development
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className='flex justify-center items-center flex-col gap-4 w-full'>
                    <div className='flex flex-col w-full gap-2'>
                        <div className='flex justify-start items-center w-full'>
                            <TypographyH3>What&apos; s Open-VE</TypographyH3>
                        </div>
                        <div className='flex flex-col justify-start items-start w-full'>
                            <TypographyMedium>
                                Open-VE is a powerful solution that simplifies the management of
                                validation rules.
                            </TypographyMedium>
                            <TypographyMedium>
                                Ensuring consistent validation across all layers, including
                                frontend, BFF(Backend for Frontend), and microservices, through a
                                single, simple API.
                            </TypographyMedium>
                        </div>
                    </div>

                    <div className='flex flex-col justify-start items-center w-full gap-2'>
                        <div className='flex justify-start w-full'>
                            <TypographyH3>Features</TypographyH3>
                        </div>
                        <div className='flex flex-col justify-start items-start w-full'>
                            <TypographyLarge>You can easily do...</TypographyLarge>
                            <ul>
                                <li>・📓 Manage validation rules across all layers in one place</li>
                                <li>
                                    ・📝 Write validation rules independent of any programming
                                    language with simple and trustful expression language CEL
                                </li>
                                <li>
                                    ・👩‍💻 Validate data from all layers with simple Restful/gRPC API
                                </li>
                                <li>・✅ Provide consistent validation errors to all layers</li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col justify-start items-center w-full gap-2'>
                        <div className='flex justify-start w-full'>
                            <TypographyH3>Quick Start</TypographyH3>
                        </div>
                        <div className='flex flex-col justify-start items-start w-full gap-1'>
                            <TypographyLarge>
                                You can try Open-VE in whichever way you prefer.
                            </TypographyLarge>
                            <Tabs defaultValue='brew' className='w-full max-w-xl space-y-1'>
                                <TabsList className='grid w-full grid-cols-3'>
                                    <TabsTrigger value='brew'>Brew</TabsTrigger>
                                    <TabsTrigger value='source'>Source</TabsTrigger>
                                    <TabsTrigger value='docker'>Docker</TabsTrigger>
                                </TabsList>
                                <TabsContent value='brew'>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Install from Brew</CardTitle>
                                            <CardDescription>
                                                Install Open-VE from Brew (for MacOS and Linux).
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className='bg-primary text-primary-foreground p-2 rounded-lg'>
                                                <p>brew install shibukazu/tap/open-ve</p>
                                                <p>open-ve run</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value='source'>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Build from Source</CardTitle>
                                            <CardDescription>
                                                Build Open-VE from source.
                                                <br />
                                                go runtime and git are required.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className='bg-primary text-primary-foreground p-2 rounded-lg'>
                                                <p>
                                                    git clone
                                                    https://github.com/shibukazu/open-ve.git
                                                </p>
                                                <p>go build -o open-ve go/cmd/open-ve/main.go</p>
                                                <p>./open-ve run</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value='docker'>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Run on Docker</CardTitle>
                                            <CardDescription>
                                                Run Open-VE on Docker.
                                                <br />
                                                docker and docker-compose are required.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className='bg-primary text-primary-foreground p-2 rounded-lg'>
                                                <p>
                                                    git clone
                                                    https://github.com/shibukazu/open-ve.git
                                                </p>
                                                <p>docker-compose up</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </ol>
        </div>
    );
}

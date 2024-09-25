type EnvironmentVar = 'NEXT_PUBLIC_MASTER_API_URL' | 'NEXT_PUBLIC_SLAVE_API_URL';
export const getEnvironmentVar = (varName: EnvironmentVar): string => {
    switch (varName) {
        case 'NEXT_PUBLIC_MASTER_API_URL':
            if (!process.env.NEXT_PUBLIC_MASTER_API_URL) {
                throw new Error('Master API URL is not set');
            }
            return process.env.NEXT_PUBLIC_MASTER_API_URL;
        case 'NEXT_PUBLIC_SLAVE_API_URL':
            if (!process.env.NEXT_PUBLIC_SLAVE_API_URL) {
                throw new Error('Slave API URL is not set');
            }
            return process.env.NEXT_PUBLIC_SLAVE_API_URL;
    }
};

export type OpenVEMode = 'slave' | 'master';
export const getAPIURL = (mode: OpenVEMode): string => {
    if (mode === 'master') {
        return getEnvironmentVar('NEXT_PUBLIC_MASTER_API_URL');
    }
    return getEnvironmentVar('NEXT_PUBLIC_SLAVE_API_URL');
};

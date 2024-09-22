'use client';

import { RedocStandalone } from 'redoc';

export default function API() {
    return (
        <RedocStandalone
            specUrl='https://raw.githubusercontent.com/shibukazu/open-ve/refs/heads/main/openapi/openapi.swagger.json'
            options={{
                hideLoading: true,
            }}
        />
    );
}

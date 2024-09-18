import React from 'react';

type TypographyProps = {
    children: React.ReactNode;
    className?: string;
};
export function TypographyH1({ children, className: _className }: TypographyProps) {
    return (
        <h1
            className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${_className}`}
        >
            {children}
        </h1>
    );
}

export function TypographyH2({ children, className: _className }: TypographyProps) {
    return (
        <h2
            className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0' ${_className}`}
        >
            {children}
        </h2>
    );
}

export function TypographyH3({ children, className: _className }: TypographyProps) {
    return (
        <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${_className}`}>
            {children}
        </h3>
    );
}

export function TypographyH4({ children, className: _className }: TypographyProps) {
    return (
        <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${_className}`}>
            {children}
        </h4>
    );
}

export function TypographyLarge({ children, className: _className }: TypographyProps) {
    return <div className={`text-lg font-semibold ${_className}`}>{children}</div>;
}

export function TypographyMedium({ children, className: _className }: TypographyProps) {
    return <div className={`text-base  ${_className}`}>{children}</div>;
}

export function TypographyBlockquote({ children, className: _className }: TypographyProps) {
    return (
        <blockquote className={`mt-6 border-l-2 pl-6 italic ${_className}`}>{children}</blockquote>
    );
}

export function TypographyInlineCode({ children, className: _className }: TypographyProps) {
    return (
        <code
            className={`relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${_className}`}
        >
            {children}
        </code>
    );
}

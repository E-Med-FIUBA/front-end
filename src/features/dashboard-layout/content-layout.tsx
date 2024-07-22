import * as React from 'react';

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
};

export const ContentLayout = ({
  children,
  title,
  actions,
}: ContentLayoutProps) => {
  return (
    <>
      <div className="flex h-full flex-col gap-2 py-6">
        <div className="container mx-auto flex justify-between px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <div className="flex items-center justify-between gap-4">
            {actions}
          </div>
        </div>
        <div className="container mx-auto flex-[1_1_0] overflow-auto px-4 sm:px-6 md:px-8">
          {children}
        </div>
      </div>
    </>
  );
};

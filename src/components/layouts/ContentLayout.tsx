import * as React from "react";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
};

export const ContentLayout = ({ children, title, actions }: ContentLayoutProps) => {
  return (
    <>
      <div className="py-6 h-full flex flex-col gap-2">
        <div className="mx-auto container px-4 sm:px-6 md:px-8 flex justify-between">
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <div className="flex justify-between items-center gap-4">{actions}</div>
        </div>
        <div className="mx-auto container px-4 sm:px-6 md:px-8 flex-[1_1_0] overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
};

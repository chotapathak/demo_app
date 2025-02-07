import React from 'react';

const Dialog = ({ children, ...props }) => (
  <div role="dialog" {...props}>
    {children}
  </div>
);

const DialogTrigger = ({ children, ...props }) => (
  <div {...props}>
    {children}
  </div>
);

const DialogContent = ({ children, className, ...props }) => (
  <div
    className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg ${className}`}
    {...props}
  >
    {children}
  </div>
);

const DialogHeader = ({ className, ...props }) => (
  <div
    className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
    {...props}
  />
);

const DialogTitle = ({ className, ...props }) => (
  <h3
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
);

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle }; 
import React from "react";

const FormEditLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col items-center p-6  sm:p-20">
      {children}
    </main>
  );
};

export default FormEditLayout;

import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen flex justify-center items-center">{children}</div>
  );
}

export default Layout;

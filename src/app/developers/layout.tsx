import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Developers",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default Layout;

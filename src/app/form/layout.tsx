import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form",
  description: "Robert Ostermann: Fillout Frontend Take-home",
  authors: { name: "Robert Ostermann", url: "https://github.com/RobertOstermann" },
};

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="form-layout" className="flex h-full flex-col bg-linear-to-b">
      {children}
    </div>
  );
}

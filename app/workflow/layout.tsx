import { Navbar } from "@/components/navbar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <div className=" ">
        <Navbar />
        
      </div>
      <body>{children}</body>
    </html>
  );
}

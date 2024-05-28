import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/footer";
import { CMS_NAME } from "../lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: `A statically generated blog example using Next.js and ${CMS_NAME}.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

import "simplebar-react/dist/simplebar.min.css";
import "slick-carousel/slick/slick.css";
import "../assets/css/react-slick.css";

import { ThemeProvider } from "@mui/material/styles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Provider as NotificationProvider } from "@/context/notification";
import theme from "@/config/theme";
import { AppProvider } from "@/context/state";
import QueryClientProvider from "@/context/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sule Lamido University Journal Management System",
  description: "Managing and Publishing of Journals",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <QueryClientProvider>
            <body className={inter.className}>
              <main>{children}</main>
              <ReactQueryDevtools initialIsOpen={false} />
            </body>
          </QueryClientProvider>
        </NotificationProvider>
      </ThemeProvider>
    </AppProvider>
  );
}

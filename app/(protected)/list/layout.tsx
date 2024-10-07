import ContentWrapper from "@/app/components/ContentWrapper/ContentWrapper";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Заметки | Список",
  description: "Список заметок",
};

export default function ListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentWrapper>
      <Header />
      {children}
      <Footer />
    </ContentWrapper>
  );
}

import ContentWrapper from "@/app/components/ContentWrapper/ContentWrapper";
import Header from "@/app/components/Header/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Замети | Создать",
  description: "Создание заметки",
};

export default function NewNoteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContentWrapper>
      <Header title="Новая заметка" />
      {children}
    </ContentWrapper>
  );
}

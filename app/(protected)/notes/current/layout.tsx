import ContentWrapper from "@/app/components/ContentWrapper/ContentWrapper";
import Header from "@/app/components/Header/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Заметки | Редактор",
  description: "Редактировать заметку",
};

export default function CurrentNoteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContentWrapper>
      <Header title="Изменить заметку" />
      {children}
    </ContentWrapper>
  );
}

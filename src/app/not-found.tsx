import Image from "next/image";
import type { Metadata } from "next";
import { H2, P } from "@/components/text";
import s from "./404Page.module.css";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "ページが見つかりません | Ghostty",
  description:
    "お探しのページは見つかりませんでした。ドキュメントやダウンロードページをご覧ください。",
};

export default function NotFoundPage() {
  return (
    <main className={s.notFoundPage}>
      <header className={s.header}>
        <H2>ページが見つかりませんでした。</H2>
      </header>
      <section>
        <Image
          className={s.image}
          src="/ghostty-404.png"
          alt="Ghostty 404 image - CC BY 4.0 (c) @qwerasd205"
          width={425}
          height={500}
        />
        <P className={s.imageCopyright}>
          <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>{" "}
          &#169; Qwerasd
        </P>
      </section>
    </main>
  );
}

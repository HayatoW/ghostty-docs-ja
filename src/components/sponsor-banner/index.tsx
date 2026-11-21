import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import s from "./SponsorBanner.module.css";

interface SponsorBannerProps {
  title?: string;
  description?: string;
  href?: string;
}

/** A compact sponsorship call-to-action banner for use in release notes and other content pages. */
export default function SponsorBanner({
  title = "Ghostty は非営利です。開発へのご支援をお願いします。",
  description = "寄付のほぼすべては貢献者への報酬に直接充てられます。支援の方法を詳しく見る。",
  href = "/docs/sponsor",
}: SponsorBannerProps) {
  return (
    <Link href={href} className={s.banner}>
      <div className={s.iconContainer}>
        <Heart className={s.icon} />
      </div>
      <div className={s.content}>
        <span className={s.title}>{title}</span>
        <span className={s.description}>{description}</span>
      </div>
      <ArrowRight className={s.arrow} />
      <span className={s.mobileAction}>詳しく見る →</span>
    </Link>
  );
}

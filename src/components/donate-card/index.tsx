"use client";

import { Check, Copy, Heart, Building2, Coins, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { H3, P } from "../text";
import s from "./DonateCard.module.css";

interface DonateCardProps {
  href?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  ein?: string;
  contactName?: string;
  contactEmail?: string;
}

export default function DonateCard({
  href = "https://donate.ghostty.org",
  title = "Ghostty を支援する",
  description = "皆さんのご支援は開発の継続を助け、Ghostty を無料のオープンソースとして維持します。",
  buttonText = "今すぐ寄付する",
  ein = "81-2908499",
  contactName = "Hack Club の Paul",
  contactEmail = "paul@hackclub.com",
}: DonateCardProps) {
  const [copied, setCopied] = useState(false);

  const copyEin = async () => {
    await navigator.clipboard.writeText(ein);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={s.donateCard}>
      <div className={s.main}>
        <div className={s.iconContainer}>
          <Heart className={s.icon} />
        </div>
        <div className={s.content}>
          <H3 className={s.title}>{title}</H3>
          <P className={s.description}>{description}</P>
          <div className={s.actions}>
            <Link href={href} className={s.button}>
              <Heart className={s.buttonIcon} />
              {buttonText}
            </Link>
            <button
              type="button"
              onClick={copyEin}
              className={s.einButton}
              title="EIN をコピー"
            >
              <span className={s.einText}>
                <span className={s.einLabel}>EIN:</span>
                <span className={s.einValue}>{ein}</span>
              </span>
              {copied ? (
                <Check className={s.copyIcon} />
              ) : (
                <Copy className={s.copyIcon} />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={s.methods}>
        <div className={`${s.method} ${s.methodDaf}`}>
          <div className={s.methodIcon}>
            <Building2 />
          </div>
          <div className={s.methodContent}>
            <span className={s.methodTitle}>DAF または財団</span>
            <span className={s.methodDesc}>
              上記の EIN を使い、備考欄で受取先に「Ghostty」を指定してください
            </span>
          </div>
        </div>
        <div className={`${s.method} ${s.methodCrypto}`}>
          <div className={s.methodIcon}>
            <Coins />
          </div>
          <div className={s.methodContent}>
            <span className={s.methodTitle}>株式、暗号資産、その他の資産</span>
            <span className={s.methodDesc}>
              <a href={`mailto:${contactEmail}`} className={s.methodLink}>
                {contactName}
              </a>{" "}
              にお問い合わせください。
            </span>
          </div>
        </div>
        <div className={`${s.method} ${s.methodOther}`}>
          <div className={s.methodIcon}>
            <HelpCircle />
          </div>
          <div className={s.methodContent}>
            <span className={s.methodTitle}>その他のご質問</span>
            <span className={s.methodDesc}>
              その他のお問い合わせは{" "}
              <a href={`mailto:${contactEmail}`} className={s.methodLink}>
                {contactName}
              </a>{" "}
              までご連絡ください。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

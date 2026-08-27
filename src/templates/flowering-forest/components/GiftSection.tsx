import { memo, useRef, useState } from "react";
import type { InvitationData } from "../../types";
import { getCoupleDisplay, revealStyle } from "../hooks";
import { Content, Layer, Section } from "./Section";
import { SectionLabel } from "./Decor";

type GiftAccount = { owner: string; bank: string; accountName: string; accountNumber: string };
type GiftEwallet = { label: string; name: string; phone: string };

export function readGiftAccounts(extras: InvitationData["extras"]): GiftAccount[] {
  const arr = (extras as Record<string, unknown> | undefined)?.giftAccounts;
  if (!Array.isArray(arr)) return [];
  return arr.filter(
    (a): a is GiftAccount => !!a && typeof a === "object" && typeof (a as GiftAccount).accountNumber === "string"
  );
}

export function readGiftEwallet(extras: InvitationData["extras"]): GiftEwallet | null {
  const w = (extras as Record<string, unknown> | undefined)?.giftEwallet;
  if (!w || typeof w !== "object") return null;
  const { label, name, phone } = w as GiftEwallet;
  return typeof phone === "string" && typeof name === "string" ? { label: label ?? "E-Wallet", name, phone } : null;
}

// group digits in fours, e.g. 1234567890 → 1234 5678 90
const group = (n: string) => n.replace(/(.{4})/g, "$1 ").trim();

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

function CopyCard({
  title,
  lines,
  copyValue,
  delay,
  onCopied,
}: {
  title: string;
  lines: { label: string; value: string }[];
  copyValue: string;
  delay: number;
  onCopied: (ok: boolean) => void;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
    copyToClipboard(copyValue).then(onCopied);
  };
  return (
    <div className="ff-reveal-up w-full max-w-70" style={revealStyle(delay)}>
      <div
        className="ff-shadow-ice relative overflow-hidden rounded-2xl p-4 text-left text-white"
        style={{ backgroundImage: "linear-gradient(135deg,#0A5A56 0%,#0B7A75 45%,#1BB7A6 100%)" }}
      >
        <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
        <p className="relative font-body text-[9px] uppercase tracking-[0.35em] text-white/80">{title}</p>
        {lines.map((l, i) => (
          <div key={i} className="relative mt-2.5">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/60">{l.label}</p>
            <p className="mt-0.5 text-sm tabular-nums tracking-[0.15em] text-white">{l.value}</p>
          </div>
        ))}
        <button
          onClick={copy}
          className="relative mt-3 shrink-0 rounded-full border border-white/40 bg-white/20 px-3.5 py-1.5 font-body text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-all active:scale-95 hover:bg-white/30"
        >
          {copied ? "Tersalin ✓" : "Salin"}
        </button>
      </div>
    </div>
  );
}

export const GiftSection = memo(function GiftSection({ data }: { data: InvitationData }) {
  const accounts = readGiftAccounts(data.extras);
  const ewallet = readGiftEwallet(data.extras);
  const { firstInitial, secondInitial } = getCoupleDisplay(data);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  const notify = (ok: boolean) => {
    setToast(ok ? "Tersalin ✓" : "Gagal menyalin, salin manual");
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  };

  if (!accounts.length && !ewallet) return null;

  return (
    <>
      <Section id="gift">
        <Layer depth={1.2} className="opacity-40">
          <div className="h-64 w-64 rounded-full bg-white/60 blur-3xl" />
        </Layer>
        <Content className="gap-5">
          <div className="ff-reveal-down" style={revealStyle(80)}>
            <SectionLabel numeral="V" title="Hadiah" />
          </div>
          <h3 className="ff-reveal-zoomout ff-shimmer-text ff-font-display text-3xl italic" style={revealStyle(240)}>
            Kirimkan Hadiah
          </h3>
          <p className="ff-reveal-blur max-w-xs text-sm italic" style={{ ...revealStyle(380), color: "var(--ff-700)" }}>
            Doa restu Anda adalah anugerah terindah bagi kami. Bagi yang ingin berbagi kebahagiaan dalam bentuk
            hadiah, dapat melalui rekening berikut.
          </p>
          {accounts.map((acc, i) => (
            <CopyCard
              key={i}
              title={`${acc.bank} · ${firstInitial}${secondInitial}`}
              lines={[
                { label: acc.owner, value: acc.accountName },
                { label: "No. Rekening", value: group(acc.accountNumber) },
              ]}
              copyValue={acc.accountNumber}
              delay={520 + i * 200}
              onCopied={notify}
            />
          ))}
          {ewallet && (
            <CopyCard
              title={ewallet.label}
              lines={[
                { label: ewallet.name, value: ewallet.phone },
              ]}
              copyValue={ewallet.phone}
              delay={520 + accounts.length * 200}
              onCopied={notify}
            />
          )}
        </Content>
      </Section>

      <div
        className={`pointer-events-none fixed bottom-20 left-1/2 z-60 -translate-x-1/2 transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <div className="ff-shadow-ice rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] text-white backdrop-blur" style={{ backgroundColor: "rgba(6,42,59,0.9)" }}>
          {toast ?? ""}
        </div>
      </div>
    </>
  );
});

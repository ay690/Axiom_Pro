'use client';

import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpDown, ChevronDown, Copy, X } from 'lucide-react';

type ExchangeDepositModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ExchangeTab = 'convert' | 'deposit' | 'buy';

function SolanaMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="solg" x1="8" y1="10" x2="40" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FFA3" />
          <stop offset="0.5" stopColor="#DC1FFF" />
          <stop offset="1" stopColor="#00D1FF" />
        </linearGradient>
      </defs>
      <path
        d="M11 14.2c.6-.7 1.5-1.2 2.5-1.2h27.8c1.7 0 2.6 2.1 1.4 3.4l-2.7 3.2c-.6.7-1.5 1.2-2.5 1.2H9.7c-1.7 0-2.6-2.1-1.4-3.4L11 14.2z"
        fill="url(#solg)"
      />
      <path
        d="M11 28.6c.6-.7 1.5-1.2 2.5-1.2h27.8c1.7 0 2.6 2.1 1.4 3.4l-2.7 3.2c-.6.7-1.5 1.2-2.5 1.2H9.7c-1.7 0-2.6-2.1-1.4-3.4L11 28.6z"
        fill="url(#solg)"
        opacity="0.9"
      />
      <path
        d="M40.9 21.4c-.6.7-1.5 1.2-2.5 1.2H10.6c-1.7 0-2.6-2.1-1.4-3.4l2.7-3.2c.6-.7 1.5-1.2 2.5-1.2h27.8c1.7 0 2.6 2.1 1.4 3.4l-2.7 3.2z"
        fill="url(#solg)"
        opacity="0.85"
      />
    </svg>
  );
}

function OnramperMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" opacity="0.9" />
      <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.9" />
      <text
        x="22"
        y="14"
        fill="currentColor"
        fontSize="14"
        fontWeight="600"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial"
        opacity="0.9"
      >
        onramper
      </text>
    </svg>
  );
}

function BnbMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 5l7.2 7.2L24 19.4l-7.2-7.2L24 5z"
        fill="#F3BA2F"
      />
      <path
        d="M12.2 16.8L19.4 24l-7.2 7.2L5 24l7.2-7.2z"
        fill="#F3BA2F"
      />
      <path
        d="M35.8 16.8L43 24l-7.2 7.2L28.6 24l7.2-7.2z"
        fill="#F3BA2F"
      />
      <path
        d="M24 28.6l7.2 7.2L24 43l-7.2-7.2L24 28.6z"
        fill="#F3BA2F"
      />
      <path
        d="M24 19.7l4.3 4.3L24 28.3l-4.3-4.3L24 19.7z"
        fill="#F3BA2F"
      />
    </svg>
  );
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={
        active
          ? 'rounded-md bg-white/10 px-3 py-1.5 text-white'
          : 'rounded-md px-3 py-1.5 text-white/45 hover:bg-white/5 hover:text-white/70'
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function ConvertCard({
  title,
  rightLabel,
  token,
  amount,
  subRight,
}: {
  title: string;
  rightLabel: string;
  token: 'sol' | 'bnb';
  amount: string;
  subRight?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="flex items-center justify-between text-[11.5px]">
        <div className="text-white/45">{title}</div>
        <div className="text-white/45">{rightLabel}</div>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="text-[22px] font-medium tracking-tight text-white/60">{amount}</div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2.5 py-2 text-[13px] font-medium text-white/80"
        >
          {token === 'sol' ? <SolanaMark className="h-4 w-4" /> : <BnbMark className="h-4 w-4" />}
          <span>{token === 'sol' ? 'SOL' : 'BNB'}</span>
          <ChevronDown className="h-4 w-4 text-white/45" />
        </button>
      </div>

      <div className="mt-1 flex items-center justify-between text-[11px]">
        <div className="invisible">.</div>
        <div className="text-white/45">{subRight ?? ''}</div>
      </div>
    </div>
  );
}

function FakeQr({ className }: { className?: string }) {
  const cells = useMemo(() => {
    const size = 21;
    const data: boolean[] = [];
    let seed = 1337;
    const rnd = () => {
      seed = (seed * 1103515245 + 12345) % 2147483647;
      return seed / 2147483647;
    };

    for (let i = 0; i < size * size; i += 1) data.push(rnd() > 0.58);

    const setFinder = (x0: number, y0: number) => {
      for (let y = 0; y < 7; y += 1) {
        for (let x = 0; x < 7; x += 1) {
          const idx = (y0 + y) * size + (x0 + x);
          const isBorder = x === 0 || y === 0 || x === 6 || y === 6;
          const isInner = x >= 2 && x <= 4 && y >= 2 && y <= 4;
          data[idx] = isBorder || isInner;
        }
      }
    };

    setFinder(0, 0);
    setFinder(size - 7, 0);
    setFinder(0, size - 7);

    return { size, data };
  }, []);

  const cell = 6;
  const pad = 10;
  const w = cells.size * cell + pad * 2;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${w} ${w}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width={w} height={w} rx="12" fill="#FFFFFF" />
      <g transform={`translate(${pad} ${pad})`}>
        {cells.data.map((on, i) => {
          if (!on) return null;
          const x = (i % cells.size) * cell;
          const y = Math.floor(i / cells.size) * cell;
          return <rect key={i} x={x} y={y} width={cell} height={cell} fill="#0B0B0D" />;
        })}
      </g>
    </svg>
  );
}

export default function ExchangeDepositModal({ open, onOpenChange }: ExchangeDepositModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<ExchangeTab>('deposit');

  const depositAddress = 'EBD6hEZSdathvVDM2rmvTBsa7Tb2zhqthL5YVqEDpYQ';

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };

    document.addEventListener('keydown', onKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1200);
    return () => window.clearTimeout(t);
  }, [copied]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(depositAddress);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (!open) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onMouseDown={() => onOpenChange(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-105 max-w-[calc(100vw-32px)] overflow-hidden rounded-xl border border-white/10 bg-linear-to-b from-[#1B1D22] to-[#121318] shadow-[0_30px_80px_rgba(0,0,0,0.75)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <div className="text-[13px] font-semibold text-white/95">Exchange</div>
          <button
            className="rounded-md p-1.5 text-white/60 transition hover:bg-white/5 hover:text-white/80"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="h-px w-full bg-white/10" />

        <div className="px-5 pt-4">
          <div className="rounded-lg border border-white/10 bg-white/5 p-1">
            <div className="grid grid-cols-3 gap-1 text-[12.5px] font-medium">
              <TabButton active={activeTab === 'convert'} onClick={() => setActiveTab('convert')}>
                Convert
              </TabButton>
              <TabButton active={activeTab === 'deposit'} onClick={() => setActiveTab('deposit')}>
                Deposit
              </TabButton>
              <TabButton active={activeTab === 'buy'} onClick={() => setActiveTab('buy')}>
                Buy
              </TabButton>
            </div>
          </div>

          {activeTab === 'convert' && (
            <div className="mt-4">
              <div className="text-[12px] text-white/45">Swap SOL for BNB</div>

              <div className="mt-3">
                <ConvertCard
                  title="Converting"
                  rightLabel="Balance: 0"
                  token="sol"
                  amount="0.0"
                  subRight="(~$0.00)"
                />

                <div className="relative my-3 flex items-center justify-center">
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#1A1B20] text-white/70 shadow-[0_8px_25px_rgba(0,0,0,0.35)]"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </div>

                <ConvertCard
                  title="Gaining"
                  rightLabel="Balance: 0"
                  token="bnb"
                  amount="0.0"
                  subRight="1 SOL ~ 0.1468 BNB"
                />
              </div>

              <div className="mt-5 pb-5">
                <button
                  type="button"
                  className="h-11 w-full rounded-full bg-[#4B6BFF] text-[13px] font-semibold text-[#0B0B0D] shadow-[0_10px_30px_rgba(75,107,255,0.25)] transition hover:bg-[#5A77FF]"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {activeTab === 'deposit' && (
            <>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3">
                  <SolanaMark className="h-4 w-4" />
                  <div className="text-[13px] font-medium text-white/90">Solana</div>
                </div>
                <div className="flex h-10 items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3">
                  <div className="text-[12px] text-white/45">Balance:</div>
                  <div className="text-[13px] font-medium text-white/75">0 SOL</div>
                </div>
              </div>

              <div className="mt-4 text-[15px] leading-4 text-white/45">
                Only deposit Solana through the Solana network for this address.
              </div>

              <div className="mt-4 flex gap-3">
                <div className="relative h-35 w-35 shrink-0 rounded-xl bg-white p-2">
                  <div className="absolute inset-2">
                    <FakeQr className="h-full w-full" />
                  </div>
                  <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0B0B0D] p-2 shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
                    <SolanaMark className="h-6 w-6" />
                  </div>
                </div>

                <div className="relative flex min-h-35 flex-1 flex-col rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-[12px] font-medium text-white/55">Deposit Address</div>
                  <div className="mt-2 text-[13px] leading-5 text-white/90 break-all">{depositAddress}</div>
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 rounded-md border border-white/10 bg-white/5 p-2 text-white/60 transition hover:bg-white/10 hover:text-white/80"
                    onClick={onCopy}
                    aria-label="Copy address"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 text-[12px] text-white/45">
                Don&apos;t have any Solana? <span className="text-blue-400">Buy through Onramper.</span>
              </div>

              <div className="mt-6 pb-5">
                <button
                  type="button"
                  onClick={onCopy}
                  className="h-11 w-full rounded-full bg-[#4B6BFF] text-[13px] font-semibold text-[#0B0B0D] shadow-[0_10px_30px_rgba(75,107,255,0.25)] transition hover:bg-[#5A77FF]"
                >
                  {copied ? 'Copied' : 'Copy Address'}
                </button>
              </div>
            </>
          )}

          {activeTab === 'buy' && (
            <div className="mt-4 flex min-h-85 flex-col pb-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3">
                  <SolanaMark className="h-4 w-4" />
                  <div className="text-[13px] font-medium text-white/90">Solana</div>
                </div>
                <div className="flex h-10 items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3">
                  <div className="text-[12px] text-white/45">Balance:</div>
                  <div className="text-[13px] font-medium text-white/75">0 SOL</div>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex items-center justify-between text-[11.5px]">
                  <div className="text-white/45">Buying</div>
                  <div className="text-white/45">SOL Price: 122.70</div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="text-[22px] font-medium tracking-tight text-white/60">0.0</div>
                  <div className="flex items-center gap-2 text-[13px] font-medium text-white/80">
                    <SolanaMark className="h-4 w-4" />
                    <span>SOL</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <div className="text-red-500">Minimum: 20 USD</div>
                  <div className="text-white/45">~ 0 USD</div>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-end pb-3">
                <div className="flex items-center gap-2 text-[12px] text-white/35">
                  <span>powered by</span>
                  <OnramperMark className="h-3.5 w-18.5 text-white/80" />
                </div>
              </div>

              <button
                type="button"
                className="h-11 w-full rounded-full bg-[#4B6BFF] text-[13px] font-semibold text-[#0B0B0D] shadow-[0_10px_30px_rgba(75,107,255,0.25)] transition hover:bg-[#5A77FF]"
              >
                Buy
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

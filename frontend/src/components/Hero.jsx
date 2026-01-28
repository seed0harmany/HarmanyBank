import React, { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowUpRight } from "lucide-react";
import MOCK_USER from "../helper/mockuser";
import dayjs from "dayjs";

export default function Hero() {
  const [showBalance, setShowBalance] = useState(true);
  const [user] = useState(MOCK_USER);

  const target = 7356300.86;
  const [displayValue, setDisplayValue] = useState(0);

  const today = dayjs().format("MMMM D, YYYY");

  useEffect(() => {
    let start = 0;
    const duration = 1600;
    const step = 16;
    const increment = target / (duration / step);

    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setDisplayValue(start);
    }, step);

    return () => clearInterval(interval);
  }, []);

  const formattedBalance = displayValue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#050D1F] via-[#071633] to-[#0A2242] text-white pb-10">
      {/* Depth overlay */}
      <div className="absolute inset-0 bg-white/[0.04] backdrop-blur-[2px] pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute -top-16 left-1/3 w-56 h-56 bg-teal-400/15 blur-3xl rounded-full" />
      <div className="absolute top-1/2 right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />

      <div className="relative mx-auto max-w-7xl px-6 py-10 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* LEFT — Identity */}
        <div className="space-y-1">
          <p className="text-[13px] text-white/70 tracking-wide">
            Good morning
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {user?.firstName || "SEED"}
          </h1>

          <p className="text-[12px] text-white/55">
            Today is {today}
          </p>

          {/* Spending insight */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-300/20">
            <ArrowUpRight className="w-3.5 h-3.5 text-teal-300" />
            <span className="text-[11px] text-teal-200">
              Spending up <strong>12%</strong> vs last month
            </span>
          </div>
        </div>

        {/* RIGHT — Balance Card */}
        <div
          className="
            relative w-full md:w-[340px]
            rounded-2xl
            bg-white/15 backdrop-blur-xl
            border border-white/20
            px-6 py-5
            flex items-center justify-between
          "
        >
          {/* Inner highlight */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">
              Total Balance
            </p>

            <div className="text-3xl font-semibold tracking-tight leading-tight">
              {showBalance ? formattedBalance : "••••••••"}
            </div>

            <div className="flex items-center justify-between mt-2">
              <p className="text-[10px] uppercase tracking-widest text-white/50">
                Available
              </p>

              <a href="#transaction"
                className="text-[11px] text-white/70 hover:text-white transition"
              >
                View activity
              </a>
            </div>
          </div>

          {/* Toggle */}
          <button
            onClick={() => setShowBalance((p) => !p)}
            aria-label={showBalance ? "Hide balance" : "Show balance"}
            className="
              relative z-10
              ml-4
              p-2.5 rounded-xl
              bg-white/20 hover:bg-white/30
              border border-white/25
              transition
            "
          >
            {showBalance ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

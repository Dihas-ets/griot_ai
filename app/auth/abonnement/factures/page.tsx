"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Download, FileText, Search, ReceiptText } from "lucide-react";
import axios from "@/lib/axios";

type Invoice = {
  id: number | string;
  numero?: string | null;
  reference?: string | null;
  date?: string | null;
  date_facture?: string | null;
  created_at?: string | null;
  montant?: number | string | null;
  total?: number | string | null;
  amount?: number | string | null;
  devise?: string | null;
  currency?: string | null;
  statut?: string | null;
  status?: string | null;
  plan?: {
    nom?: string | null;
    name?: string | null;
  } | null;
  pdf_url?: string | null;
  invoice_url?: string | null;
  url?: string | null;
  [key: string]: unknown;
};

function formatDate(date?: string | null) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatAmount(
  amount?: number | string | null,
  currency = "XOF"
) {
  const numericAmount = Number(amount ?? 0);

  if (Number.isNaN(numericAmount)) {
    return "—";
  }

  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericAmount) + ` ${currency}`;
}

function getInvoiceStatus(invoice: Invoice) {
  return (
    invoice.statut ??
    invoice.status ??
    "—"
  );
}

function getInvoiceStatusLabel(status: string) {
  switch (status.toLowerCase()) {
    case "payee":
    case "payé":
    case "paid":
      return "Payée";

    case "en_attente":
    case "pending":
      return "En attente";

    case "annulee":
    case "annulée":
    case "cancelled":
      return "Annulée";

    case "remboursee":
    case "remboursée":
    case "refunded":
      return "Remboursée";

    default:
      return status;
  }
}

function getInvoiceNumber(invoice: Invoice) {
  return (
    invoice.numero ??
    invoice.reference ??
    `FACT-${invoice.id}`
  );
}

function getInvoiceDate(invoice: Invoice) {
  return (
    invoice.date_facture ??
    invoice.date ??
    invoice.created_at
  );
}

function getInvoiceAmount(invoice: Invoice) {
  return invoice.montant ?? invoice.total ?? invoice.amount;
}

function getInvoiceCurrency(invoice: Invoice) {
  return invoice.devise ?? invoice.currency ?? "XOF";
}

function getPlanName(invoice: Invoice) {
  return (
    invoice.plan?.nom ??
    invoice.plan?.name ??
    "Abonnement Griot AI"
  );
}

function getInvoiceUrl(invoice: Invoice) {
  return (
    invoice.pdf_url ??
    invoice.invoice_url ??
    invoice.url ??
    null
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();

  const className =
    normalized === "payee" ||
    normalized === "payé" ||
    normalized === "paid"
      ? "border-green-100 bg-green-50 text-green-700"
      : normalized === "en_attente" ||
          normalized === "pending"
        ? "border-amber-100 bg-amber-50 text-amber-700"
        : normalized === "annulee" ||
            normalized === "annulée" ||
            normalized === "cancelled"
          ? "border-red-100 bg-red-50 text-red-700"
          : "border-slate-200 bg-slate-50 text-slate-600";

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-wide ${className}`}
    >
      {getInvoiceStatusLabel(status)}
    </span>
  );
}

export default function FacturesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("/api/factures");

      const data = response.data;

      const loadedInvoices =
        data?.factures ??
        data?.invoices ??
        data?.data ??
        (Array.isArray(data) ? data : []);

      setInvoices(
        Array.isArray(loadedInvoices)
          ? loadedInvoices
          : []
      );
    } catch (err: any) {
      console.error("Erreur chargement factures :", err);

      setError(
        err?.response?.data?.message ||
          "Impossible de charger vos factures."
      );

      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredInvoices = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return invoices;
    }

    return invoices.filter((invoice) => {
      const number = getInvoiceNumber(invoice).toLowerCase();
      const plan = getPlanName(invoice).toLowerCase();
      const status = getInvoiceStatus(invoice).toLowerCase();

      return (
        number.includes(query) ||
        plan.includes(query) ||
        status.includes(query)
      );
    });
  }, [invoices, search]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/dashboard/parametres"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
              aria-label="Retour aux paramètres"
            >
              <ChevronLeft size={18} />
            </Link>

            <div className="min-w-0">
              <p className="hidden text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 sm:block">
                Facturation
              </p>

              <h1 className="truncate text-sm font-black sm:text-base">
                Factures
              </h1>
            </div>
          </div>

          <Link
            href="/dashboard/parametres"
            className="hidden rounded-xl border border-slate-200 px-4 py-2 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50 sm:block"
          >
            Paramètres
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
            Mes factures
          </h2>

          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Consultez l'historique de vos factures et paiements Griot AI.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
            {error}
          </div>
        )}

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h3 className="text-sm font-black text-slate-800 sm:text-base">
                Historique des factures
              </h3>

              <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                Toutes les factures associées à votre compte.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher une facture..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs font-medium outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/5"
              />
            </div>
          </div>

          {loading ? (
            <div className="p-10 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-red-600" />

              <p className="mt-4 text-xs font-bold text-slate-500">
                Chargement de vos factures...
              </p>
            </div>
          ) : filteredInvoices.length === 0 ? (
            <div className="p-10 text-center sm:p-14">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <ReceiptText size={25} />
              </div>

              <h3 className="mt-4 text-sm font-black text-slate-800">
                Aucune facture
              </h3>

              <p className="mx-auto mt-2 max-w-md text-[10px] leading-relaxed text-slate-400 sm:text-xs">
                {search
                  ? "Aucune facture ne correspond à votre recherche."
                  : "Vos factures apparaîtront ici après vos paiements d'abonnement."}
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-4 rounded-xl border border-slate-200 px-4 py-2.5 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Effacer la recherche
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <th className="px-5 py-3 text-left text-[9px] font-black uppercase tracking-wider text-slate-400">
                      Facture
                    </th>

                    <th className="px-5 py-3 text-left text-[9px] font-black uppercase tracking-wider text-slate-400">
                      Date
                    </th>

                    <th className="px-5 py-3 text-left text-[9px] font-black uppercase tracking-wider text-slate-400">
                      Formule
                    </th>

                    <th className="px-5 py-3 text-left text-[9px] font-black uppercase tracking-wider text-slate-400">
                      Montant
                    </th>

                    <th className="px-5 py-3 text-left text-[9px] font-black uppercase tracking-wider text-slate-400">
                      Statut
                    </th>

                    <th className="px-5 py-3 text-right text-[9px] font-black uppercase tracking-wider text-slate-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredInvoices.map((invoice) => {
                    const invoiceUrl = getInvoiceUrl(invoice);

                    return (
                      <tr
                        key={invoice.id}
                        className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                              <FileText size={16} />
                            </div>

                            <div>
                              <p className="text-xs font-black text-slate-800">
                                {getInvoiceNumber(invoice)}
                              </p>

                              <p className="mt-0.5 text-[9px] text-slate-400">
                                Facture Griot AI
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-xs font-medium text-slate-600">
                          {formatDate(getInvoiceDate(invoice))}
                        </td>

                        <td className="px-5 py-4 text-xs font-bold text-slate-700">
                          {getPlanName(invoice)}
                        </td>

                        <td className="px-5 py-4 text-xs font-black text-slate-800">
                          {formatAmount(
                            getInvoiceAmount(invoice),
                            getInvoiceCurrency(invoice)
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge
                            status={getInvoiceStatus(invoice)}
                          />
                        </td>

                        <td className="px-5 py-4 text-right">
                          {invoiceUrl ? (
                            <a
                              href={invoiceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50 hover:text-red-600"
                            >
                              <Download size={13} />
                              Télécharger
                            </a>
                          ) : (
                            <span className="text-[10px] font-medium text-slate-300">
                              PDF indisponible
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  company: z.string().max(120).optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  subject: z.string().min(1).max(60),
  message: z.string().min(1).max(2000),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Champs invalides." },
        { status: 400 },
      );
    }
    if (parsed.data.website) {
      // Honeypot triggered — silent success
      return NextResponse.json({ ok: true });
    }

    const { name, email, company, phone, subject, message } = parsed.data;

    const apiKey = process.env.RESEND_API_KEY;
    const dest = process.env.CONTACT_DEST_EMAIL || "alexandre.gil@california.fr";
    const from = process.env.CONTACT_FROM_EMAIL || "Site Alex Gil <onboarding@resend.dev>";

    if (!apiKey) {
      console.warn("[contact] RESEND_API_KEY missing — dropping mail", {
        name, email, subject,
      });
      // In dev / preview without key: act as success so the UX doesn't break.
      return NextResponse.json({ ok: true, dev: true });
    }

    const resend = new Resend(apiKey);
    const html = `
      <div style="font-family:system-ui,sans-serif;line-height:1.55;color:#0a0a0a">
        <h2 style="margin:0 0 16px">Nouveau message — site Alex Gil</h2>
        <p><strong>Sujet :</strong> ${escapeHtml(subject)}</p>
        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Email :</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        ${company ? `<p><strong>Entreprise :</strong> ${escapeHtml(company)}</p>` : ""}
        ${phone ? `<p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>` : ""}
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>
    `;

    const r = await resend.emails.send({
      from,
      to: dest,
      replyTo: email,
      subject: `[Site] ${subject} — ${name}`,
      html,
    });

    if (r.error) {
      console.error("[contact] resend error", r.error);
      return NextResponse.json({ error: "Envoi impossible" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] error", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

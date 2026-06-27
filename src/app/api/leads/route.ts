import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data-store";
import { isRateLimited } from "@/lib/rate-limit";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  propertyType?: string;
  area?: string;
  message?: string;
  source: "quote_form" | "contact_form" | "whatsapp" | "phone" | "manual";
  status: "new" | "contacted" | "converted" | "lost";
  notes?: string;
  createdAt: string;
}

const sampleLeads: Lead[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    phone: "9876543210",
    email: "rahul@example.com",
    service: "deep-cleaning",
    propertyType: "2 BHK",
    area: "Kothrud",
    message: "Need deep cleaning before Diwali",
    source: "quote_form",
    status: "new",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2",
    name: "Priya Patil",
    phone: "9123456789",
    service: "sofa-cleaning",
    propertyType: "3 BHK",
    area: "Baner",
    source: "whatsapp",
    status: "contacted",
    notes: "Called back, interested in monthly plan",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    name: "Amit Deshmukh",
    phone: "9988776655",
    email: "amit@company.com",
    service: "office-cleaning",
    propertyType: "Office",
    area: "Hinjewadi",
    message: "Looking for weekly office cleaning contract",
    source: "contact_form",
    status: "converted",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export async function GET() {
  const leads = await readData<Lead[]>("leads.json", sampleLeads);
  return NextResponse.json(leads);
}

export async function POST(request: NextRequest) {
  // Rate limit: 10 requests per minute per IP
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const leads = await readData<Lead[]>("leads.json", sampleLeads);

    const newLead: Lead = {
      id: Date.now().toString(),
      name: body.name || "",
      phone: body.phone || "",
      email: body.email || "",
      service: body.service || "",
      propertyType: body.propertyType || "",
      area: body.area || "",
      message: body.message || "",
      source: body.source || "manual",
      status: "new",
      createdAt: new Date().toISOString(),
    };

    leads.unshift(newLead);
    await writeData("leads.json", leads);
    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const leads = await readData<Lead[]>("leads.json", sampleLeads);

    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    leads[index] = { ...leads[index], ...updates };
    await writeData("leads.json", leads);
    return NextResponse.json({ success: true, lead: leads[index] });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const leads = await readData<Lead[]>("leads.json", sampleLeads);
    const filtered = leads.filter((l) => l.id !== id);
    await writeData("leads.json", filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

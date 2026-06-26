import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data-store";
import { Booking, generateBookingId } from "@/lib/booking";

const sampleBookings: Booking[] = [
  {
    id: "BK-ABC123",
    name: "Rajesh Kumar",
    phone: "9876543210",
    email: "rajesh@example.com",
    service: "Deep Cleaning",
    propertyType: "2 BHK",
    address: "Flat 402, Sunshine Apartments, Kothrud",
    area: "Kothrud",
    date: "2026-07-05",
    timeSlot: "10:00 AM - 12:00 PM",
    message: "Please bring eco-friendly products",
    status: "confirmed",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "BK-DEF456",
    name: "Sneha Patil",
    phone: "9123456789",
    service: "Sofa Cleaning",
    propertyType: "3 BHK",
    address: "12, Rose Society, Baner Road",
    area: "Baner",
    date: "2026-07-06",
    timeSlot: "2:00 PM - 4:00 PM",
    status: "pending",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export async function GET() {
  const bookings = await readData<Booking[]>("bookings.json", sampleBookings);
  return NextResponse.json(bookings);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bookings = await readData<Booking[]>("bookings.json", sampleBookings);

    const newBooking: Booking = {
      id: generateBookingId(),
      name: body.name || "",
      phone: body.phone || "",
      email: body.email || "",
      service: body.service || "",
      propertyType: body.propertyType || "",
      address: body.address || "",
      area: body.area || "",
      date: body.date || "",
      timeSlot: body.timeSlot || "",
      message: body.message || "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    bookings.unshift(newBooking);
    await writeData("bookings.json", bookings);

    return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const bookings = await readData<Booking[]>("bookings.json", sampleBookings);

    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    bookings[index] = { ...bookings[index], ...updates };
    await writeData("bookings.json", bookings);
    return NextResponse.json({ success: true, booking: bookings[index] });
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

    const bookings = await readData<Booking[]>("bookings.json", sampleBookings);
    const filtered = bookings.filter((b) => b.id !== id);
    await writeData("bookings.json", filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

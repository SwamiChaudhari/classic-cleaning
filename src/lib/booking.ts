/**
 * Online Booking System
 * 
 * Provides booking management with date/time slots,
 * service selection, and confirmation flow.
 * 
 * Usage:
 *   // Check available slots
 *   const slots = getAvailableSlots('2026-07-15');
 *   
 *   // Create a booking
 *   const booking = await createBooking({...});
 */

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  propertyType?: string;
  address: string;
  area: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g., "09:00-11:00"
  message?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  createdAt: string;
}

export interface TimeSlot {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

/**
 * Generate available time slots for a given date.
 */
export function getAvailableSlots(
  date: string,
  existingBookings: Booking[] = []
): TimeSlot[] {
  const slots: TimeSlot[] = [
    { id: "morning-1", label: "8:00 AM - 10:00 AM", startTime: "08:00", endTime: "10:00", available: true },
    { id: "morning-2", label: "10:00 AM - 12:00 PM", startTime: "10:00", endTime: "12:00", available: true },
    { id: "afternoon-1", label: "12:00 PM - 2:00 PM", startTime: "12:00", endTime: "14:00", available: true },
    { id: "afternoon-2", label: "2:00 PM - 4:00 PM", startTime: "14:00", endTime: "16:00", available: true },
    { id: "evening-1", label: "4:00 PM - 6:00 PM", startTime: "16:00", endTime: "18:00", available: true },
    { id: "evening-2", label: "6:00 PM - 8:00 PM", startTime: "18:00", endTime: "20:00", available: true },
  ];

  // Mark slots as unavailable if already booked
  const bookedSlots = existingBookings
    .filter((b) => b.date === date && b.status !== "cancelled")
    .map((b) => b.timeSlot);

  return slots.map((slot) => ({
    ...slot,
    available: !bookedSlots.includes(slot.label),
  }));
}

/**
 * Get the next N available dates (excluding Sundays by default).
 */
export function getAvailableDates(daysCount: number = 14, excludeSunday: boolean = true): string[] {
  const dates: string[] = [];
  const today = new Date();

  for (let i = 1; i <= daysCount + 7 && dates.length < daysCount; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    if (excludeSunday && date.getDay() === 0) continue;

    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
}

/**
 * Format a date for display.
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Format a date for short display.
 */
export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

/**
 * Generate a unique booking ID.
 */
export function generateBookingId(): string {
  const prefix = "BK";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Validate booking data before submission.
 */
export function validateBooking(data: Partial<Booking>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name is required");
  }
  if (!data.phone || data.phone.trim().length < 10) {
    errors.push("Valid phone number is required");
  }
  if (!data.service) {
    errors.push("Please select a service");
  }
  if (!data.date) {
    errors.push("Please select a date");
  }
  if (!data.timeSlot) {
    errors.push("Please select a time slot");
  }
  if (!data.address || data.address.trim().length < 10) {
    errors.push("Complete address is required");
  }

  // Check if date is in the future
  if (data.date) {
    const selected = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      errors.push("Please select a future date");
    }
  }

  return { valid: errors.length === 0, errors };
}

'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Phone, User, CheckCircle2, XCircle, AlertCircle, Eye, Trash2, Download } from 'lucide-react';
import { readData, writeData } from '@/lib/data-store';

interface Booking {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  propertyType?: string;
  address: string;
  area: string;
  date: string;
  timeSlot: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
  confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-700', icon: CheckCircle2 },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700', icon: XCircle },
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookings')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setBookings(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const persist = async (data: Booking[]) => {
    await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => {});
  };

  const updateStatus = (id: string, status: Booking['status']) => {
    const updated = bookings.map((b) => b.id === id ? { ...b, status } : b);
    setBookings(updated);
    fetch('/api/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    }).catch(() => {});
  };

  const deleteBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    fetch(`/api/bookings?id=${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
  };

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Phone', 'Service', 'Date', 'Time', 'Area', 'Status'];
    const rows = bookings.map((b) => [b.id, b.name, b.phone, b.service, b.date, b.timeSlot, b.area, b.status]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookings.csv';
    a.click();
  };

  return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy">Bookings</h1>
            <p className="mt-1 text-sm text-gray-500">Manage customer bookings and schedule.</p>
          </div>
          <button onClick={exportCSV} className="inline-flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-white">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Total</p>
            <p className="mt-1 text-2xl font-bold text-navy">{stats.total}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="mt-1 text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Confirmed</p>
            <p className="mt-1 text-2xl font-bold text-blue-600">{stats.confirmed}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="mt-1 text-2xl font-bold text-green-600">{stats.completed}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize ${filter === s ? 'bg-navy text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-3">
          {filtered.map((booking) => {
            const config = statusConfig[booking.status];
            return (
              <div key={booking.id} className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10">
                      <User className="h-5 w-5 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{booking.name}</h3>
                      <p className="text-sm text-gray-500">{booking.service} • {booking.propertyType}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}>
                    {config.label}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Phone className="h-3.5 w-3.5" /> {booking.phone}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="h-3.5 w-3.5" /> {booking.date}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="h-3.5 w-3.5" /> {booking.timeSlot}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="h-3.5 w-3.5" /> {booking.area}
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  {booking.status === 'pending' && (
                    <>
                      <button onClick={() => updateStatus(booking.id, 'confirmed')} className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100">Confirm</button>
                      <button onClick={() => updateStatus(booking.id, 'cancelled')} className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100">Cancel</button>
                    </>
                  )}
                  {booking.status === 'confirmed' && (
                    <button onClick={() => updateStatus(booking.id, 'completed')} className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100">Mark Complete</button>
                  )}
                  <button onClick={() => setSelectedBooking(booking)} className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100">
                    <Eye className="inline h-3 w-3 mr-1" /> Details
                  </button>
                  <button onClick={() => deleteBooking(booking.id)} className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 ml-auto">
                    <Trash2 className="inline h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="rounded-xl bg-white py-12 text-center shadow-sm">
              <p className="text-gray-400">No bookings found.</p>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4" onClick={() => setSelectedBooking(null)}>
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg font-semibold text-navy mb-4">Booking Details</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">ID</span><span className="font-mono">{selectedBooking.id}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Name</span><span>{selectedBooking.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Phone</span><span>{selectedBooking.phone}</span></div>
                {selectedBooking.email && <div className="flex justify-between"><span className="text-gray-500">Email</span><span>{selectedBooking.email}</span></div>}
                <div className="flex justify-between"><span className="text-gray-500">Service</span><span>{selectedBooking.service}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Date</span><span>{selectedBooking.date}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Time</span><span>{selectedBooking.timeSlot}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Address</span><span className="text-right max-w-[60%]">{selectedBooking.address}</span></div>
                {selectedBooking.message && <div className="pt-2 border-t"><span className="text-gray-500">Message:</span><p className="mt-1">{selectedBooking.message}</p></div>}
              </div>
              <button onClick={() => setSelectedBooking(null)} className="mt-4 w-full rounded-lg bg-navy py-2.5 text-sm font-semibold text-white">Close</button>
            </div>
          </div>
        )}
      </div>
  );
}

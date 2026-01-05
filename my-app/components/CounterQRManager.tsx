'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Plus, Trash2, Edit2, Check, X, Download, Copy, QrCode } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

interface Counter {
  id: string;
  name: string;
}

export default function CounterQRManager() {
  const [counters, setCounters] = useState<Counter[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    // Generate initial counters only on client
    setCounters([
      { id: generateId(), name: 'Front Desk' },
      { id: generateId(), name: 'Payment Counter' },
      { id: generateId(), name: 'Customer Service' }
    ]);
  }, []);

  function generateId(): string {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 6);
    return `CTR-${timestamp}-${random}`;
  }

  function addCounter() {
    const newCounter: Counter = {
      id: generateId(),
      name: `Counter ${counters.length + 1}`
    };
    setCounters([...counters, newCounter]);
    toast.success('Counter added successfully');
  }

  function deleteCounter(id: string) {
    setCounters(counters.filter(c => c.id !== id));
    toast.success('Counter deleted');
  }

  function startEdit(counter: Counter) {
    setEditingId(counter.id);
    setEditValue(counter.name);
  }

  function saveEdit() {
    if (editingId && editValue.trim()) {
      setCounters(counters.map(c =>
        c.id === editingId ? { ...c, name: editValue.trim() } : c
      ));
      setEditingId(null);
      setEditValue('');
      toast.success('Counter name updated');
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setEditValue('');
  }

  function downloadQR(counterId: string, counterName: string) {
    const svg = document.getElementById(`qr-${counterId}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `${counterName.replace(/\s+/g, '-')}-QR.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    toast.success('QR code downloaded');
  }

  function copyToClipboard(text: string, type: 'id' | 'url') {
    navigator.clipboard.writeText(text);
    toast.success(`${type === 'id' ? 'Counter ID' : 'URL'} copied to clipboard`);
  }

  const qrUrl = (counterId: string) => `https://app.com/q/${counterId}`;

  // Show loading state while counters are being generated
  if (counters.length === 0) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <QrCode className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Service Counter QR Management
              </h2>
              <p className="text-sm text-slate-500">
                Manage QR codes for customer service counters
              </p>
            </div>
          </div>
          <button
            onClick={addCounter}
            className="flex items-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-all hover:shadow-lg shadow-emerald-200"
          >
            <Plus className="w-4 h-4" />
            Add Counter
          </button>
        </div>
      </div>

      {/* Counters Grid */}
      {counters.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <QrCode className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-500 mb-2">No counters added yet</p>
          <p className="text-sm text-slate-400">Add your first counter to generate QR codes</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {counters.map((counter) => (
              <div
                key={counter.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 overflow-hidden group"
              >
                {/* Card Header */}
                <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white">
                  <div className="flex items-center justify-between">
                    {editingId === counter.id ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit();
                            if (e.key === 'Escape') cancelEdit();
                          }}
                          className="flex-1 px-3 py-1.5 bg-white text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                          autoFocus
                        />
                        <button
                          onClick={saveEdit}
                          className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-100 rounded-lg">
                            <QrCode className="w-4 h-4 text-emerald-700" />
                          </div>
                          <h3 className="font-medium text-slate-900 text-sm">
                            {counter.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEdit(counter)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Edit name"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteCounter(counter.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete counter"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* QR Code Display */}
                <div className="p-4">
                  <div className="flex flex-col items-center">
                    {/* QR Code Container */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm mb-4">
                      <QRCodeSVG
                        id={`qr-${counter.id}`}
                        value={qrUrl(counter.id)}
                        size={140}
                        level="H"
                        includeMargin={false}
                        bgColor="#FFFFFF"
                        fgColor="#059669" // Emerald-600
                        className="rounded"
                      />
                    </div>

                    {/* Counter ID */}
                    <div className="w-full mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-slate-500">Counter ID</span>
                        <button
                          onClick={() => copyToClipboard(counter.id, 'id')}
                          className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                          <Copy className="w-3 h-3 inline mr-1" />
                          Copy
                        </button>
                      </div>
                      <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                        <code className="text-xs font-mono text-emerald-700 break-all">
                          {counter.id}
                        </code>
                      </div>
                    </div>

                    {/* QR URL */}
                    <div className="w-full mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-slate-500">Scan URL</span>
                        <button
                          onClick={() => copyToClipboard(qrUrl(counter.id), 'url')}
                          className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                          <Copy className="w-3 h-3 inline mr-1" />
                          Copy
                        </button>
                      </div>
                      <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                        <code className="text-xs font-mono text-slate-600 break-all">
                          {qrUrl(counter.id)}
                        </code>
                      </div>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() => downloadQR(counter.id, counter.name)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-sm font-medium rounded-lg transition-all hover:shadow-lg shadow-emerald-200"
                    >
                      <Download className="w-4 h-4" />
                      Download QR Code
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Counter Stats */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <QrCode className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-emerald-700">{counters.length}</span>
                    {' '}active counter{counters.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-xs text-slate-400">
                    All counters are active and ready for scanning
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600">
                  Last updated: Just now
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
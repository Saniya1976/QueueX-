'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

interface Counter {
  id: string;
  name: string;
}

export default function CounterQRManager() {
  const [counters, setCounters] = useState<Counter[]>([
    { id: generateId(), name: 'Front Desk' },
    { id: generateId(), name: 'Payment Counter' }
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  function generateId(): string {
    return `CTR-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  function addCounter() {
    const newCounter: Counter = {
      id: generateId(),
      name: `Counter ${counters.length + 1}`
    };
    setCounters([...counters, newCounter]);
  }

  function deleteCounter(id: string) {
    setCounters(counters.filter(c => c.id !== id));
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
  }

  const qrUrl = (counterId: string) => `https://app.com/q/${counterId}`;

  return (
    <div className="min-h-screen bg-gradient from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Service Counter QR Management
          </h1>
          <p className="text-slate-300">
            Manage QR codes for customer service counters
          </p>
        </div>

        {/* Add Counter Button */}
        <button
          onClick={addCounter}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium shadow-lg shadow-emerald-900/50"
        >
          <Plus className="w-5 h-5" />
          Add Counter
        </button>

        {/* Counters Grid */}
        {counters.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/50 rounded-xl border border-slate-700">
            <p className="text-slate-400 text-lg">No counters yet. Add your first counter to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {counters.map((counter) => (
              <div
                key={counter.id}
                className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
              >
                {/* Card Header */}
                <div className="bg-slate-900/50 p-4 border-b border-slate-700">
                  {editingId === counter.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit();
                          if (e.key === 'Escape') cancelEdit();
                        }}
                        className="flex-1 px-3 py-1.5 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-emerald-500"
                        autoFocus
                      />
                      <button
                        onClick={saveEdit}
                        className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-1.5 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">
                        {counter.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEdit(counter)}
                          className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-700 rounded-lg transition-colors"
                          title="Edit name"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCounter(counter.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                          title="Delete counter"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* QR Code Display */}
                <div className="p-6 flex flex-col items-center">
                  <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
                    <QRCodeSVG
                      id={`qr-${counter.id}`}
                      value={qrUrl(counter.id)}
                      size={180}
                      level="H"
                      includeMargin={true}
                    />
                  </div>

                  {/* Counter ID */}
                  <div className="w-full mb-4">
                    <p className="text-xs text-slate-400 mb-1">Counter ID</p>
                    <code className="block w-full px-3 py-2 bg-slate-900 text-emerald-400 rounded-lg text-xs font-mono break-all border border-slate-700">
                      {counter.id}
                    </code>
                  </div>

                  {/* QR URL */}
                  <div className="w-full mb-4">
                    <p className="text-xs text-slate-400 mb-1">Scan URL</p>
                    <code className="block w-full px-3 py-2 bg-slate-900 text-slate-300 rounded-lg text-xs font-mono break-all border border-slate-700">
                      {qrUrl(counter.id)}
                    </code>
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={() => downloadQR(counter.id, counter.name)}
                    className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Download QR Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Counter Stats */}
        {counters.length > 0 && (
          <div className="mt-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <p className="text-slate-300">
              <span className="font-semibold text-emerald-400">{counters.length}</span>
              {' '}active counter{counters.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
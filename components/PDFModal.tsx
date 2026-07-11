'use client';

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { X, ChevronLeft, ChevronRight, Loader2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set worker path from CDN using the identical version (v8 uses .js, not .mjs)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export default function PDFModal({ isOpen, onClose, pdfUrl, title }: PDFModalProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setLoading(false);
    setPageNumber(1); // reset to page 1 on load
    setScale(1); // reset zoom on load
  }

  const zoomIn = () => setScale(s => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale(s => Math.max(s - 0.25, 0.5));
  const resetZoom = () => setScale(1);

  const prevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const nextPage = () => setPageNumber((prev) => (numPages ? Math.min(prev + 1, numPages) : prev));

  // Prevent right click on context menu to deter downloading
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onContextMenu={handleContextMenu}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-50 border border-slate-900/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-900/10 bg-white">
            <h3 className="text-slate-900 font-medium">{title}</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-900/10 text-slate-900/70 hover:text-slate-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className={`flex-1 overflow-auto p-4 relative custom-scrollbar ${scale === 1 ? 'flex items-center justify-center min-h-[50vh]' : ''}`}>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
              </div>
            )}
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div />} // Custom loader handled above
              className={`w-fit mx-auto ${scale === 1 ? 'flex justify-center w-full pdf-fit-to-screen' : ''}`}
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-xl flex justify-center w-full"
              />
            </Document>
          </div>

          {/* Footer (Pagination & Zoom) */}
          <div className="flex items-center justify-between p-4 border-t border-slate-900/10 bg-white flex-wrap gap-4">
            
            {/* Zoom Controls */}
            <div className="flex items-center gap-2 bg-slate-900/5 rounded-lg p-1 border border-slate-900/10">
              <span className="text-xs font-medium text-slate-900/60 px-2 w-12 text-center">
                {Math.round(scale * 100)}%
              </span>
              <button onClick={zoomOut} className="p-1.5 hover:bg-slate-900/10 rounded text-slate-900/70 hover:text-slate-900 transition" title="Zoom Out">
                <ZoomOut className="w-4 h-4" />
              </button>
              <button onClick={zoomIn} className="p-1.5 hover:bg-slate-900/10 rounded text-slate-900/70 hover:text-slate-900 transition" title="Zoom In">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button onClick={resetZoom} className="px-3 py-1.5 hover:bg-slate-900/10 rounded text-xs font-medium text-slate-900/70 hover:text-slate-900 transition border-l border-slate-900/10 ml-1" title="Reset Zoom">
                Reset
              </button>
            </div>
            {numPages && (
              <div className="flex items-center gap-4">
                <button
                  onClick={prevPage}
                  disabled={pageNumber <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900/5 hover:bg-slate-900/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-900" />
                </button>
                <span className="text-sm font-medium text-slate-900/80">
                  {pageNumber} / {numPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={pageNumber >= numPages}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900/5 hover:bg-slate-900/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight className="w-4 h-4 text-slate-900" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

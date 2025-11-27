"use client";

import { QrCode } from "lucide-react";
import { useEffect, useState } from "react";

interface QRCodeModalProps {
  websiteUrl: string;
}

export function QRCodeModal({ websiteUrl }: QRCodeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    // Generate QR code using an API service
    const generateQR = async () => {
      // Using QR Server API (free, no API key needed)
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(websiteUrl)}`;
      setQrCodeUrl(qrUrl);
    };
    
    generateQR();
  }, [websiteUrl]);

  return (
    <>
      {/* Small QR Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="ml-3 p-2 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 rounded-lg transition-all duration-300 hover:scale-110 group"
        aria-label="Show QR Code"
      >
        <QrCode className="h-6 w-6 text-muted-foreground group-hover:text-purple-500 transition-colors" />
      </button>

      {/* Simple custom modal overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-24"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative mx-4 w-full max-w-md rounded-2xl bg-background p-6 shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 rounded-full px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Close QR code"
            >
              ×
            </button>

            <div className="text-center mb-4 mt-2">
              <h2 className="text-xl font-semibold">Scan QR Code</h2>
              <p className="text-sm text-muted-foreground">
                Scan this code to visit the website
              </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              {/* QR Code Image */}
              <div className="relative w-64 h-64 bg-white p-4 rounded-lg shadow-lg flex items-center justify-center">
                {qrCodeUrl && (
                  // Use regular img to avoid Next.js remote image config
                  // This is a static 400x400 PNG from a trusted QR API
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>

              {/* Website URL */}
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline"
              >
                {websiteUrl}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


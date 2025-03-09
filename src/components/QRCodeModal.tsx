"use client";

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import QRCode from 'react-qr-code';
import { FaDownload, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface QRCodeModalProps {
  url: string;
  shortUrl: string;
}

export default function QRCodeModal({ url, shortUrl }: QRCodeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code');
    if (!svg) return;
    
    try {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        
        // Download the PNG file
        const downloadLink = document.createElement('a');
        downloadLink.download = `qrcode-${shortUrl.split('/').pop()}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
        toast.success('QR Code downloaded successfully!');
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    } catch (error) {
      toast.error('Failed to download QR Code');
    }
  };

  return (
    <>
      <div 
        className="w-10 h-10 bg-white p-1 rounded cursor-pointer hover:shadow-lg transition-shadow duration-300"
        onClick={openModal}
      >
        <QRCode
          value={url}
          size={32}
          style={{ height: "100%", width: "100%" }}
        />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-4 sm:p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <Dialog.Title
                      as="h3"
                      className="text-base sm:text-lg font-medium leading-6 text-white"
                    >
                      QR Code for {shortUrl}
                    </Dialog.Title>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-white"
                      onClick={closeModal}
                    >
                      <FaTimes className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg flex justify-center">
                    <QRCode
                      id="qr-code"
                      value={url}
                      size={200}
                      level="H"
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    />
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-xs sm:text-sm text-gray-300 mb-2">
                      Original URL: <span className="text-blue-400 break-all">{url}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-gray-300 mb-4">
                      Short URL: <span className="text-blue-400">{shortUrl}</span>
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={downloadQRCode}
                      >
                        <FaDownload className="mr-2 h-4 w-4" />
                        Download QR Code
                      </button>
                      
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
} 
"use client"
import React, { useRef, useState } from 'react';
import { Printer, Download, Mail, Phone, MapPin, CreditCard } from 'lucide-react';
import moment from 'moment';
import html2canvas from 'html2canvas';

const CreateInvoice = () => {
  const divRef = useRef<HTMLDivElement>(null);

  // Initial state with the requested items
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `AC-E-2026-001`,
    date: moment().format("Do, MMMM YYYY"),
    dueDate: moment().add(4, "days").format("Do, MMMM YYYY"),
    client: {
      name: "Awabah NG",
      address: "Edge water estate, 2 Obi Achebe Drive, Eti-Osa, Lagos 106104, Lagos",
      email: "contact@awabah.ng"
    },
    items: [
      { id: 0, description: "RENTALS", quantity: 1, unitPrice: 0, type: "section" },
      { id: 1, description: "Rubber Chairs", quantity: 30, unitPrice: 300, type: "item" },
      { id: 2, description: "Rectangular Rubber Tables", quantity: 6, unitPrice: 2000, type: "item" },
      { id: 3, description: "Mini Canopies", quantity: 2, unitPrice: 12000, type: "item" },
      { id: 4, description: "Logistics", quantity: 1, unitPrice: 20000, type: "item" },
      { id: 5, description: "Sub Total", quantity: 1, unitPrice: 0, type: "subtotal" },
      { id: 6, description: "ENTERTAINMENT", quantity: 1, unitPrice: 0, type: "section" },
      { id: 7, description: "RICE <small>(Jumbo pack of Rice, Sizable peppered chicken, Bottle water and can malt)</small>", quantity: 30, unitPrice: 7500, type: "item" },
      { id: 8, description: "SMALL CHOPS <small>(A Plate of small chops containing 1 spring roll, 1 samosa and 5 puff puff with sizable peppered chicken, bottle water and can malt)</small>", quantity: 30, unitPrice: 6500, type: "item" },
      { id: 9, description: "Logistics", quantity: 1, unitPrice: 20000, type: "item" },
      { id: 10, description: "Sub Total", quantity: 1, unitPrice: 0, type: "subtotal" },
    ],
    taxRate: 0.075, // 7.5% VAT
  });

  const calculateSubtotal = () => {
    return invoiceData.items
      .filter(item => item.type === "item")
      .reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const calculateSectionSubtotal = (upToIndex: number) => {
    return invoiceData.items
      .filter((item, index) => index <= upToIndex && item.type === "item")
      .reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * invoiceData.taxRate;
  const total = subtotal + tax;

  const handleDownloadReceipt = async () => {
    if (!divRef.current) return;

    try {
      const canvas = await html2canvas(divRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const dataURL = canvas.toDataURL('image/png');
      
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `Proforma-Invoice-${invoiceData.invoiceNumber}-${moment().format("YYYY-MM-DD")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating invoice image:', error);
      alert('Failed to generate invoice. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-5">
      {/* Action Bar - Hidden during print */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <h1 className="text-2xl font-bold text-gray-800">
          Proforma Invoice
        </h1>
        <div className="flex space-x-3">
          <button 
            onClick={handlePrint}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </button>
          <button 
            onClick={handleDownloadReceipt}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PNG
          </button>
        </div>
      </div>

      {/* Invoice Document */}
      <div className="p-5">
        <div 
          ref={divRef}
          className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none print:rounded-none"
        >
          {/* Header */}
          <div className="p-10 flex flex-col md:flex-row justify-between" style={{ backgroundColor: "#0f172a", color: "white" }}>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">
                Anizee <span style={{ color: "#60a5fa" }}>Koncept</span>
              </h2>
              <div className="mt-4 space-y-1 text-sm" style={{ color: "#cbd5e1" }}>
                <p className="flex items-center">
                  <MapPin className="w-3 h-3 mr-2" /> 
                  Plot 1 Sir Alex Ameachina, Trans-engineering Estate Abuja, Nigeria
                </p>
                <p className="flex items-center">
                  <Phone className="w-3 h-3 mr-2" /> +2348034148857
                </p>
                <p className="flex items-center">
                  <Mail className="w-3 h-3 mr-2" /> aniekutt@gmail.com
                </p>
              </div>
            </div>
            <div className="mt-8 md:mt-0 text-right">
              <h3 className="text-4xl font-light uppercase tracking-widest" style={{ color: "#60a5fa" }}>
                Proforma
              </h3>
              <div className="mt-4 text-sm">
                <p>
                  <span style={{ color: "#94a3b8" }}>Invoice No:</span> {invoiceData.invoiceNumber}
                </p>
                <p>
                  <span style={{ color: "#94a3b8" }}>Date:</span> {invoiceData.date}
                </p>
                <p>
                  <span style={{ color: "#94a3b8" }}>Valid Until:</span> {invoiceData.dueDate}
                </p>
              </div>
            </div>
          </div>

          <div className="p-10">
            {/* Client Details */}
            <div className="mb-10">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#60a5fa" }}>
                Bill To:
              </h4>
              <p className="text-lg font-bold" style={{ color: "#1f2937" }}>
                {invoiceData.client.name}
              </p>
              <p style={{ color: "#4b5563" }}>
                {invoiceData.client.address}
              </p>
              {invoiceData.client.email && (
                <p style={{ color: "#4b5563" }}>
                  {invoiceData.client.email}
                </p>
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left mb-8">
                <thead>
                  <tr className="border-b-2" style={{ borderBottomColor: "#e5e7eb" }}>
                    <th className="py-4 font-bold" style={{ color: "#374151" }}>
                      Description
                    </th>
                    <th className="py-4 font-bold text-center" style={{ color: "#374151" }}>
                      Qty
                    </th>
                    <th className="py-4 font-bold text-left ps-5" style={{ color: "#374151" }}>
                      Unit Price
                    </th>
                    <th className="py-4 font-bold text-right" style={{ color: "#374151" }}>
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item, index) => {
                    if (item.type === "subtotal") {
                      const sectionTotal = calculateSectionSubtotal(index);
                      return (
                        <tr 
                          key={item.id} 
                          className="border-b"
                          style={{ 
                            borderBottomColor: "#d1d5db",
                            backgroundColor: "#fafafa" 
                          }}
                        >
                          <td colSpan={3} className="py-4 pe-5 font-semibold ps-3 text-right"
                          style={{ color: "#1f2937" }}
                          >
                            Sub Total
                          </td>
                          <td className="py-4 font-bold text-right" style={{ color: "#1f2937" }}>
                            ₦{sectionTotal.toLocaleString()}
                          </td>
                        </tr>
                      );
                    }
                    
                    if (item.type === "section") {
                      return (
                        <tr 
                          key={item.id} 
                          className="border-b"
                          style={{ 
                            borderBottomColor: "#d1d5db",
                            backgroundColor: "#f3f4f6" 
                          }}
                        >
                          <td 
                            colSpan={4} 
                            className="py-4 font-bold ps-3" 
                            style={{ color: "#1f2937" }}
                          >
                            <div dangerouslySetInnerHTML={{ __html: item.description }} />
                          </td>
                        </tr>
                      );
                    }
                    
                    // Regular item
                    return (
                      <tr 
                        key={item.id} 
                        className="border-b hover:bg-gray-50 transition-colors"
                        style={{ 
                          borderBottomColor: "#f3f4f6",
                          backgroundColor: "#ffffff" 
                        }}
                      >
                        <td className="py-4 font-medium" style={{ color: "#1f2937" }}>
                          <div dangerouslySetInnerHTML={{ __html: item.description }} />
                        </td>
                        <td className="py-4 text-center" style={{ color: "#4b5563" }}>
                          {item.quantity}
                        </td>
                        <td className="py-4 text-left ps-5" style={{ color: "#4b5563" }}>
                          ₦{item.unitPrice.toLocaleString()}
                        </td>
                        <td className="py-4 font-bold text-right" style={{ color: "#1f2937" }}>
                          ₦{(item.quantity * item.unitPrice).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-full md:w-64 space-y-3">
                <div className="flex justify-between" style={{ color: "#4b5563" }}>
                  <span>Subtotal:</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between" style={{ color: "#4b5563" }}>
                  <span>VAT (7.5%):</span>
                  <span>₦{tax.toLocaleString()}</span>
                </div>
                <div 
                  className="flex justify-between text-xl font-bold pt-3 border-t"
                  style={{ borderTopColor: "#e5e7eb" }}
                >
                  <span style={{ color: "#1f2937" }}>Total:</span>
                  <span style={{ color: "#2563eb" }}>₦{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Footer / Payment Info */}
            <div 
              className="mt-16 pt-10 border-t flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0"
              style={{ borderTopColor: "#e5e7eb" }}
            >
              <div className="max-w-xs">
                <h4 
                  className="flex items-center text-sm font-bold mb-2"
                  style={{ color: "#1f2937" }}
                >
                  <CreditCard className="w-4 h-4 mr-2" /> Payment Terms
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>
                  Please make 70% deposit to confirm booking. Balance is due 24 hours before the event date.
                </p>
                <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm" style={{ color: "#374151" }}>
                  <p><strong>Bank:</strong> Monie Point</p>
                  <p><strong>Acc No:</strong> 8034148857</p>
                  <p><strong>Name:</strong> Anizee Koncept</p>
                </div>
              </div>
              <div className="text-right italic text-sm" style={{ color: "#9ca3af" }}>
                Thank you for choosing Anizee Koncept!
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body { 
            background-color: white; 
            padding: 0; 
            margin: 0;
          }
          .print\\:hidden { 
            display: none !important; 
          }
          .print\\:shadow-none { 
            box-shadow: none !important; 
          }
          .print\\:rounded-none { 
            border-radius: 0 !important; 
          }
          @page {
            margin: 0.5cm;
          }
        }
        
        small {
          font-size: 0.75em;
          color: #6b7280;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
};

export default CreateInvoice;
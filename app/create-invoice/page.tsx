"use client"
import React, { useRef, useState } from 'react';
import { Printer, Download, Mail, Phone, MapPin, CreditCard } from 'lucide-react';
import moment from 'moment';
import html2canvas from 'html2canvas';

const CreateInvoice = () => {
  // Initial state with the requested items
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `AC-E-2026-001`,
    date: moment().format("Do, MMMM YYYY"),
    dueDate:moment().add(4,"days").format("Do, MMMM YYYY") ,
    client: {
      name: "Awabah NG",
      address: "Edge water estate Edge water estate, 2 Obi Achebe Drive, Eti-Osa, Lagos 106104, Lagos",
      email: ""
    },
    items: [
      { id: 1, description: "Rubber Chairs", quantity: 30, unitPrice: 300,type:"item" },
      { id: 2, description: "Rectangular Rubber Tables", quantity: 6, unitPrice: 2000,type:"item" },
      { id: 3, description: "Mini Canopies", quantity: 2, unitPrice: 12000,type:"item" },
      { id: 3, description: "Logistics", quantity: 1, unitPrice: 20000,type:"item" },
      { id: 3, description: "ENTERTAINMENT", quantity: 1, unitPrice: 0,type:"section" },
      { id: 3, description: "RICE (Jumbo pack of Rice, Sizable peppered chicken, Bottle water and can malt)", quantity: 30, unitPrice: 7500,type:"item" },
      { id: 4, description: "SMALL CHOPS (A Plate of small chops containing 1 spring roll, 1 samosa and 5 puff puff with sizable peppered chicken, bottle water and can malt)", quantity: 30, unitPrice: 6500,type:"item" },
      { id: 3, description: "Logistics", quantity: 1, unitPrice: 20000,type:"item" },
    ],
    taxRate: 0.075, // 7.5% VAT
  });

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * invoiceData.taxRate;
  const total = subtotal + tax;

  const handlePrint = () => {
    window.print();
  };
const divRef = useRef(null)
const HandleDownloadReceipt = async()=>{
    const canvas = await html2canvas(divRef.current!);
    const dataURL = canvas.toDataURL('image/png');
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `Proforma-invoice-${moment().format("YYYY-MM-DD")}`;
    link.click();
    setTimeout(()=>{
    },500)

}
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-5">
      {/* Action Bar - Hidden during print */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <h1 className="text-2xl font-bold "
        style={{color:"#1e2939"}}
        >Proforma Invoice</h1>
        <div className="flex space-x-3">
          <button 
            onClick={HandleDownloadReceipt}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print / PDF
          </button>
        </div>
      </div>

      {/* Invoice Document */}
      <div ref={divRef}
       className="p-5"
       >
      <div 
       className="max-w-4xl mx-auto shadow-xl rounded-xl overflow-hidden print:shadow-none print:rounded-none"
       style={{backgroundColor:"white"}}
       >
        {/* Header */}
        <div  className="p-10 flex flex-col md:flex-row justify-between"
        style={{backgroundColor:"#0f172a",color:"white"}}
        >
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Anizee <span 
            style={{color:"#60a5fa"}}
            >Koncept</span></h2>
            <div className="mt-4 space-y-1 text-sm "
            style={{color:"#cbd5e1"}}
            >
              <p className="flex items-center"><MapPin className="w-3 h-3 mr-2" /> Plot 1 Sir Alex Ameachina, Trans-engineering Estate Abuja, Nigeria</p>
              <p className="flex items-center"><Phone className="w-3 h-3 mr-2" /> +2348034148857</p>
              <p className="flex items-center"><Mail className="w-3 h-3 mr-2" /> aniekutt@gmail.com</p>
            </div>
          </div>
          <div className="mt-8 md:mt-0 text-right">
            <h3 className="text-4xl font-light uppercase tracking-widest "
             style={{color:"#60a5fa"}}
            >Proforma</h3>
            <div className="mt-4 text-sm">
              <p><span 
              style={{color:"#90a1b9"}}
              >Invoice No:</span> {invoiceData.invoiceNumber}</p>
              <p><span 
              style={{color:"#90a1b9"}}>Date:</span> {invoiceData.date}</p>
              <p><span style={{color:"#90a1b9"}}>Valid Until:</span> {invoiceData.dueDate}</p>
            </div>
          </div>
        </div>

        <div className="p-10">
          {/* Client Details */}
          <div className="mb-10">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-2"
            style={{color:"#60a5fa"}}
            >Bill To:</h4>
            <p className="text-lg font-bold "
            style={{color:"#1f2937"}}
            >{invoiceData.client.name}</p>
            <p 
             style={{color:"#4b5563"}}
            >{invoiceData.client.address}</p>
            <p 
            style={{color:"#1f2937"}}
            >{invoiceData.client.email}</p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left mb-8">
              <thead>
                <tr className="border-b-2 "
                style={{borderBottomColor:"#f3f4f6"}}
                >
                  <th className="py-4 font-bold "
                  style={{color:"#364153"}}
                  >Description</th>
                  <th className="py-4 font-boldtext-center"
                  style={{color:"#364153"}}
                  >Qty</th>
                  <th className="py-4 font-boldtext-left ps-5"
                  style={{color:"#364153"}}
                  >Unit Price</th>
                  <th className="py-4 font-bold text-right"
                  style={{color:"#364153"}}
                  >Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item,index) =>{
                return item.type === "section"?<tr key={index} className="border-b transition-colors"
                style={{borderBottomColor:"#d1d5dc",backgroundColor:"#f3f4f6"}}
                >
                    <td colSpan={4} className="py-4 font-bold ps-3"
                    style={{color:"#1e2939"}}
                    >{item.description}</td>
                  </tr>:
                  <tr key={index} className="border-b  transition-colors"
                   style={{borderBottomColor:"#d1d5dc",backgroundColor:"#ffffff"}}
                  >
                    <td className="py-4 font-medium"
                       style={{color:"#1e2939"}}>{item.description}</td>
                    <td className="py-4 text-center w-[30px]"
                       style={{color:"#4a5565"}}
                    >{item.quantity}</td>
                    <td className="py-4 text-left ps-5 min-w-[120px]"
                    style={{color:"#4a5565"}}
                    >₦{item.unitPrice.toLocaleString()}</td>
                    <td className="py-4 font-bold text-right"
                    style={{color:"#1e2939"}}
                    >₦{(item.quantity * item.unitPrice).toLocaleString()}</td>
                  </tr>}
                )}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-full md:w-64 space-y-3">
              <div className="flex justify-between "
               style={{color:"#4a5565"}}
              >
                <span>Subtotal:</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between "
               style={{color:"#4a5565"}}
              >
                <span>VAT (7.5%):</span>
                <span>₦{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-3 border-t"
              style={{color:"#1e2939"}}
              >
                <span>Total:</span>
                <span 
                style={{color:"#155dfc"}}
                >₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer / Payment Info */}
          <div className="mt-16 pt-10 border-t flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0"
          style={{border:"#f3f4f6"}}
          >
            <div className="max-w-xs">
              <h4 className="flex items-center text-sm font-bold  mb-2"
              style={{color:"#1e2939"}}
              >
                <CreditCard className="w-4 h-4 mr-2" /> Payment Terms
              </h4>
              <p className="text-xs leading-relaxed"
              style={{color:"#6a7282"}}
              >
                Please make 70% deposit to confirm booking. Balance is due 24 hours before the event date.
                <p className='p-2 text-[16px]'>
                <b>Bank:</b> Monie Point <br/><b>Acc No:</b> 8034148857 <br/><b>Name:</b> Anizee Koncept
                </p>
              </p>
            </div>
            <div className="text-right italic text-sm"
            style={{color:"#99a1af"}}
            >
              Thank you for choosing Anizee Concept!
            </div>
          </div>
        </div>
      </div>
      </div>
      <style>{`
        @media print {
          body { background-color: white; padding: 0; }
          .print\\:hidden { display: none; }
          .shadow-xl { box-shadow: none; }
        }
      `}</style>
    </div>
  );
};

export default CreateInvoice;
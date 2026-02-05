"use client"
import React, { useRef, useState } from 'react';
import { Printer, Download, Mail, Phone, MapPin, CreditCard, DownloadIcon } from 'lucide-react';
import moment from 'moment';
import html2canvas from 'html2canvas';

const CreateInvoice = () => {
  // Initial state with the requested items
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `AC-E-2026-004`,
    date: moment().format("Do, MMMM YYYY"),
    dueDate:moment().add(4,"days").format("Do, MMMM YYYY") ,
    client: {
      name: "Awabah NG",
      address: "Edge water estate Edge water estate, 2 Obi Achebe Drive, Eti-Osa, Lagos 106104, Lagos",
      email: ""
    },
    items: [
      { id: 0, description: "ENTERTAINMENT", quantity: 0, unitPrice: 0,type:"section" },
      { id: 1, description: "SMALL CHOPS  (<small>A Plate of small chops containing 1 spring roll, 1 samosa and 5 puff puff with sizable peppered chicken, bottle water and can malt</small>)", quantity: 30, unitPrice: 6500,type:"item" },
      { id: 1, description: "Logistics", quantity: 1, unitPrice: 35000,type:"item" },
    ],
    taxRate: 0.75, // 7.5% VAT
  });

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const calculateSectionSubtotal = (upToIndex: number) => {
    return invoiceData.items
      .filter((item, index) => index <= upToIndex && item.type === "item")
      .reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * invoiceData.taxRate;
  const total = subtotal + tax;

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
    <div className="lg:min-h-screen bg-gray-100 lg:py-10  overflow-x-scroll">
      {/* Action Bar - Hidden during print */}
      <div className="w-full mx-auto mb-6 flex justify-between items-center px-5 fixed top-[0px] left-[0px] bg-white p-3 ">
        <div className="text-[18px] lg:text-2xl font-bold px-3 flex-grow"
        style={{color:"#1e2939"}}
        >Proforma Invoice</div>
        <div className="flex ">
          <button 
            onClick={HandleDownloadReceipt}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
        <DownloadIcon className="w-4 h-4 " />
         Download
          </button>
        </div>
      </div>

      {/* Invoice Document */}
      <div ref={divRef}
       className="p-3 lg:p-5 mt-20"
       >
      <div 
       className="lg:max-w-4xl mx-auto shadow-xl rounded-xl overflow-hidden print:shadow-none print:rounded-none"
       style={{backgroundColor:"white"}}
       >
        {/* Header */}
        <div  className="p-5 lg:p-10 flex flex-col md:flex-row justify-between"
        style={{backgroundColor:"#0f172a",color:"white"}}
        >
          <div>
            <h2 className="text-xl lg:text-3xl font-extrabold tracking-tight">Anizee <span 
            style={{color:"#60a5fa"}}
            >Koncept</span></h2>
            <div className="flex items-center gap-1 text-[12px]">RC No.:<b>4006488</b></div>
            <div className="mt-4 space-y-1 text-sm "
            style={{color:"#cbd5e1"}}
            >
            
              <p className="flex items-center"><MapPin className="w-3 h-3 mr-2" size={30} /> Plot 1 Sir Alex Ameachina, Trans-engineering Estate Abuja, Nigeria</p>
              <p className="flex items-center"><Phone className="w-3 h-3 mr-2" /> +2348034148857</p>
              <p className="flex items-center"><Mail className="w-3 h-3 mr-2" /> aniekutt@gmail.com</p>
            </div>
          </div>
          <div className="mt-8 md:mt-0 text-right">
            <h3 className="text-xl lg:text-4xl font-light uppercase tracking-widest "
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

        <div className="p-5 lg:p-10">
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
                 if (item.type === "subtotal") {
                const sectionTotal = calculateSectionSubtotal(index);
                return <tr key={index} className="border-b transition-colors"
                style={{color:"white"}}
                >
                    <td colSpan={3} className="py-4 pe-5 font-semibold ps-3 text-right"
                    >Sub Total</td>
                    <td className="py-4 font-bold ps-3"
                    >₦{sectionTotal.toLocaleString()}</td>
                  </tr>
                 }
                 if (item.type === "section") {
                return <tr key={index} className="border-b transition-colors"
                style={{borderBottomColor:"#d1d5dc",backgroundColor:"#f3f4f6"}}
                >
                    <td colSpan={4} className="py-4 font-bold ps-3"
                    style={{color:"#1e2939"}}
                    ><div dangerouslySetInnerHTML={{__html:item.description}} /></td>
                  </tr>
                 }
                  return <tr key={index} className="border-b  transition-colors"
                   style={{borderBottomColor:"#d1d5dc",backgroundColor:"#ffffff"}}
                  >
                    <td className="py-4 font-medium"
                       style={{color:"#1e2939"}}><div dangerouslySetInnerHTML={{__html:item.description}} /></td>
                    <td className="py-4 text-center w-[30px]"
                       style={{color:"#4a5565"}}
                    >{item.quantity}</td>
                    <td className="py-4 text-left ps-5 lg:min-w-[120px]"
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
                <p className='p-3 text-[14px] mt-3'
                style={{backgroundColor:"#bebebe38",color:"#000000"}}
                >
                <b>Bank:</b> Monie Point <br/><b>Acc No:</b> 8034148857 <br/><b>Name:</b> Anizee Koncept
                <br/><b>Tax ID.:</b> 2620358085416
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
    </div>
  );
};

export default CreateInvoice;
// import { useState, useEffect } from "react";
// import { FaTimes, FaUser, FaShoppingCart, FaTruck, FaPlus } from "react-icons/fa";

// interface CashTallyProps {
//   isOpen?: boolean;
//   onClose?: () => void;
//   counter?: number;
//   initialData?: any;
// }

// export default function CashTally({
//   isOpen = true,
//   onClose = () => {},
//   counter = 1,
//   initialData,
// }: CashTallyProps) {
//   const [formData, setFormData] = useState({
//     date: new Date().toISOString().split("T")[0],
//     name: "",
//     retailScanAmount: "",
//     retail500: "",
//     retail200: "",
//     retail100: "",
//     retail50: "",
//     retail20: "",
//     retail10: "",
//     retail1: "",
//     retailGpay: "",
//     retailCard: "",
//     expense: "",
//     wsCashBillingAmount: "",
//     wsCreditBillingAmount: "",
//     wsCreditReceipt: "",
//     ws500: "",
//     ws200: "",
//     ws100: "",
//     ws50: "",
//     ws20: "",
//     ws10: "",
//     ws1: "",
//     wsGpayCard: "",
//     homeDelivery: "",
//     retail1500: "",
//     retail2200: "",
//     retail3100: "",
//     retail450: "",
//     retail520: "",
//     retail610: "",
//     retail71: "",
//     voidSale: "",
//   });

//   const [totalAmount, setTotalAmount] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);


//   useEffect(() => {
//     if (isOpen) {
//       if (initialData) {
//         setFormData(initialData);
//       } else {
//         setFormData({
//           date: new Date().toISOString().split("T")[0],
//           name: "",
//           retailScanAmount: "",
//           retail500: "",
//           retail200: "",
//           retail100: "",
//           retail50: "",
//           retail20: "",
//           retail10: "",
//           retail1: "",
//           retailGpay: "",
//           retailCard: "",
//           expense: "",
//           wsCashBillingAmount: "",
//           wsCreditBillingAmount: "",
//           wsCreditReceipt: "",
//           ws500: "",
//           ws200: "",
//           ws100: "",
//           ws50: "",
//           ws20: "",
//           ws10: "",
//           ws1: "",
//           wsGpayCard: "",
//           homeDelivery: "",
//           retail1500: "",
//     retail2200: "",
//     retail3100: "",
//     retail450: "",
//     retail520: "",
//     retail610: "",
//     retail71: "",
//           voidSale: "",
//         });
//       }
//     }
//   }, [isOpen, initialData]);

//   useEffect(() => {
//     const sum = [
//       parseFloat(formData.retailScanAmount) || 0,
//       parseFloat(formData.retail500) || 0,
//       parseFloat(formData.retail200) || 0,
//       parseFloat(formData.retail100) || 0,
//       parseFloat(formData.retail50) || 0,
//       parseFloat(formData.retail20) || 0,
//       parseFloat(formData.retail10) || 0,
//       parseFloat(formData.retail1) || 0,
//       parseFloat(formData.retailGpay) || 0,
//       parseFloat(formData.retailCard) || 0,
//       parseFloat(formData.expense) || 0,
//       parseFloat(formData.wsCashBillingAmount) || 0,
//       parseFloat(formData.wsCreditBillingAmount) || 0,
//       parseFloat(formData.wsCreditReceipt) || 0,
//       parseFloat(formData.ws500) || 0,
//       parseFloat(formData.ws200) || 0,
//       parseFloat(formData.ws100) || 0,
//       parseFloat(formData.ws50) || 0,
//       parseFloat(formData.ws20) || 0,
//       parseFloat(formData.ws10) || 0,
//       parseFloat(formData.ws1) || 0,
//       parseFloat(formData.wsGpayCard) || 0,
//       parseFloat(formData.homeDelivery) || 0,
//       parseFloat(formData.retail1500) || 0,
//       parseFloat(formData.retail2200) || 0,
//       parseFloat(formData.retail3100) || 0,
//       parseFloat(formData.retail450) || 0,
//       parseFloat(formData.retail520) || 0,
//       parseFloat(formData.retail610) || 0,
//       parseFloat(formData.retail71) || 0,
//       parseFloat(formData.voidSale) || 0,
//     ].reduce((acc, val) => acc + val, 0);
//     setTotalAmount(sum);
//   }, [formData]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setIsLoading(true);
  
//   try {
//     // Get current timestamp
//     const timestamp = new Date().toLocaleString('en-IN', { 
//       timeZone: 'Asia/Kolkata',
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: true
//     });

//     // Prepare the row data array - Column A to AI
//     const rowData = [
//       timestamp,                          // Column A - Timestamp
//       formData.date,                      // Column B - Date
//       formData.name,                      // Column C - Employee Name
//       formData.retailScanAmount,          // Column D - Scan Amount
//       formData.retail500,                 // Column E - ₹500
//       formData.retail200,                 // Column F - ₹200
//       formData.retail100,                 // Column G - ₹100
//       formData.retail50,                  // Column H - ₹50
//       formData.retail20,                  // Column I - ₹20
//       formData.retail10,                  // Column J - ₹10
//       formData.retail1,                   // Column K - ₹1
//       formData.retailGpay,                // Column L - GPay/UPI
//       formData.retailCard,                // Column M - Card Payments
//       formData.wsCashBillingAmount,       // Column N - Cash Billing
//       formData.wsCreditBillingAmount,     // Column O - Credit Billing
//       formData.wsCreditReceipt,           // Column P - Credit Receipt
//       formData.ws500,                     // Column Q - ₹500
//       formData.ws200,                     // Column R - ₹200
//       formData.ws100,                     // Column S - ₹100
//       formData.ws50,                      // Column T - ₹50
//       formData.ws20,                      // Column U - ₹20
//       formData.ws10,                      // Column V - ₹10
//       formData.ws1,                       // Column W - ₹1
//       formData.wsGpayCard,                // Column X - GPay/Card
//       formData.expense,                   // Column Y - General Expense
//       formData.homeDelivery,              // Column Z - Home Delivery
//       formData.retail1500,                 // Column AA - ₹500 (repeat for another section)
//       formData.retail2200,                 // Column AB - ₹200
//       formData.retail3100,                 // Column AC - ₹100
//       formData.retail450,                  // Column AD - ₹50
//       formData.retail520,                  // Column AE - ₹20
//       formData.retail610,                  // Column AF - ₹10
//       formData.retail71,                   // Column AG - ₹1
//       formData.wsGpayCard,                // Column AH - GPay/Card
//       formData.voidSale                   // Column AI - Void Sale
//     ];

//     // Dynamic sheet name based on counter prop
//     const sheetName = `Cash Tally Counter ${counter}`;

//     const scriptUrl = "https://script.google.com/macros/s/AKfycbx5dryxS1R5zp6myFfUlP1QPimufTqh5hcPcFMNcAJ-FiC-hyQL9mCkgHSbLkOiWTibeg/exec";
    
//     const formDataToSend = new URLSearchParams({
//       sheetName: sheetName,
//       action: "insert",
//       rowData: JSON.stringify(rowData)
//     });

//     const response = await fetch(scriptUrl, {
//       method: "POST",
//       body: formDataToSend
//     });

//     const result = await response.json();
    
//     if (result.success) {
//       // Update localStorage
//       const existingEntries = JSON.parse(
//         localStorage.getItem("cashTallyEntries") || "[]"
//       );
      
//       if (initialData) {
//         const updatedEntries = existingEntries.map((entry: any) => 
//           entry.id === initialData.id ? { ...formData, id: initialData.id } : entry
//         );
//         localStorage.setItem("cashTallyEntries", JSON.stringify(updatedEntries));
//       } else {
//         const newEntry = { id: Date.now().toString(), ...formData };
//         localStorage.setItem(
//           "cashTallyEntries",
//           JSON.stringify([newEntry, ...existingEntries])
//         );
//       }
      
//       onClose();
//       alert("Data saved successfully!");
//     } else {
//       console.error("Error:", result.error);
//       alert("Failed to save data: " + result.error);
//     }
//   } catch (error) {
//     console.error("Error submitting form:", error);
//     alert("Error submitting form. Please try again.");
//   } finally {
//     setIsLoading(false);
//   }
// };


//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
//       <div className="bg-[#f5f7fa] rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-[#f5f7fa] border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Cash Tally - Counter {counter}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <FaTimes className="text-gray-600 text-xl" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6">
//           <div className="space-y-8">
//             {/* Basic Information */}
//             <div className="bg-[#f5f7fa] rounded-lg p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="bg-[#2a5298] p-2 rounded-lg">
//                   <FaUser className="text-white text-lg" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* DATE */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Date <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all bg-white"
//                     required
//                   />
//                 </div>

//                 {/* NAME */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Employee Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Enter employee name"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all bg-white"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Retail Transactions */}
//             <div className="bg-[#f5f7fa] rounded-lg p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="bg-blue-600 p-2 rounded-lg">
//                   <FaShoppingCart className="text-white text-lg" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800">Retail Transactions</h3>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {/* RETAIL SCAN AMOUNT */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Scan Amount</label>
//                   <input
//                     type="number"
//                     name="retailScanAmount"
//                     value={formData.retailScanAmount}
//                     onChange={handleChange}
//                     placeholder="0.00"
//                     step="0.01"
//                     min="0"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
//                   />
//                 </div>

//                 {/* Retail Denominations */}
//                 <div className="md:col-span-2 lg:col-span-3">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Cash Denominations</label>
//                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
//                     <div>
//                       <label className="block text-xs text-gray-600 mb-1">₹500</label>
//                       <input
//                         type="number"
//                         name="retail500"
//                         value={formData.retail500}
//                         onChange={handleChange}
//                         placeholder="0"
//                         min="0"
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center bg-white"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs text-gray-600 mb-1">₹200</label>
//                       <input
//                         type="number"
//                         name="retail200"
//                         value={formData.retail200}
//                         onChange={handleChange}
//                         placeholder="0"
//                         min="0"
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center bg-white"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs text-gray-600 mb-1">₹100</label>
//                       <input
//                         type="number"
//                         name="retail100"
//                         value={formData.retail100}
//                         onChange={handleChange}
//                         placeholder="0"
//                         min="0"
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center bg-white"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs text-gray-600 mb-1">₹50</label>
//                       <input
//                         type="number"
//                         name="retail50"
//                         value={formData.retail50}
//                         onChange={handleChange}
//                         placeholder="0"
//                         min="0"
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center bg-white"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs text-gray-600 mb-1">₹20</label>
//                       <input
//                         type="number"
//                         name="retail20"
//                         value={formData.retail20}
//                         onChange={handleChange}
//                         placeholder="0"
//                         min="0"
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center bg-white"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs text-gray-600 mb-1">₹10</label>
//                       <input
//                         type="number"
//                         name="retail10"
//                         value={formData.retail10}
//                         onChange={handleChange}
//                         placeholder="0"
//                         min="0"
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center bg-white"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs text-gray-600 mb-1">₹1</label>
//                       <input
//                         type="number"
//                         name="retail1"
//                         value={formData.retail1}
//                         onChange={handleChange}
//                         placeholder="0"
//                         min="0"
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center bg-white"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* RETAIL GPAY */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">GPay/UPI</label>
//                   <input
//                     type="number"
//                     name="retailGpay"
//                     value={formData.retailGpay}
//                     onChange={handleChange}
//                     placeholder="0.00"
//                     step="0.01"
//                     min="0"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
//                   />
//                 </div>

//                 {/* RETAIL CARD */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Card Payments</label>
//                   <input
//                     type="number"
//                     name="retailCard"
//                     value={formData.retailCard}
//                     onChange={handleChange}
//                     placeholder="0.00"
//                     step="0.01"
//                     min="0"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
//                   />
//                 </div>
//               </div>
//             </div>
            

//             {/* Wholesale Transactions */}
//             <div className="bg-[#f5f7fa] rounded-lg p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="bg-green-600 p-2 rounded-lg">
//                   <FaTruck className="text-white text-lg" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800">Wholesale Transactions</h3>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {/* W/S CASH BILLING AMOUNT */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Cash Billing</label>
//                   <input
//                     type="number"
//                     name="wsCashBillingAmount"
//                     value={formData.wsCashBillingAmount}
//                     onChange={handleChange}
//                     placeholder="0.00"
//                     step="0.01"
//                     min="0"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
//                   />
//                 </div>

//                 {/* W/S CREDIT BILLING AMOUNT */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Credit Billing</label>
//                   <input
//                     type="number"
//                     name="wsCreditBillingAmount"
//                     value={formData.wsCreditBillingAmount}
//                     onChange={handleChange}
//                     placeholder="0.00"
//                     step="0.01"
//                     min="0"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
//                   />
//                 </div>

//                 {/* W/S CREDIT RECEIPT */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Credit Receipt</label>
//                   <input
//                     type="number"
//                     name="wsCreditReceipt"
//                     value={formData.wsCreditReceipt}
//                     onChange={handleChange}
//                     placeholder="0.00"
//                     step="0.01"
//                     min="0"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
//                   />
//                 </div>

//                 {/* W/S Denominations */}
//                 <div className="md:col-span-2 lg:col-span-3">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Cash Denominations</label>
//                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
//                     <div>
//                       <label className="block text-xs text-gray-600 mb-1">₹500</label>
//                       <input
//                         type="number"
//                         name="ws500"
//                         value={formData.ws500}
//                         onChange={handleChange}
//                         placeholder="0"
//                         min="0"
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-center bg-white"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs text-gray-600 mb-1">₹200</label>
//                       <input
//                         type="number"
//                         name="ws200"
//                         value={formData.ws200}
//                         onChange={handleChange}
//                         placeholder="0"
//                         min="0"
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-center bg-white"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs text-gray-600 mb-1">₹100</label>
//                       <input
//                         type="number"
//                         name="ws100"
//                         value={formData.ws100}
//                         onChange={handleChange}
//                         placeholder="0"
//                         min="0"
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-center bg-white"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs text-gray-600 mb-1">₹50</label>
//                       <input
//                         type="number"
//                         name="ws50"
//                         value={formData.ws50}
//                         onChange={handleChange}
//                         placeholder="0"
//                         min="0"
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-center bg-white"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs text-gray-600 mb-1">₹20</label>
//                       <input
//                         type="number"
//                         name="ws20"
//                         value={formData.ws20}
//                         onChange={handleChange}
//                         placeholder="0"
//                         min="0"
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-center bg-white"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs text-gray-600 mb-1">₹10</label>
//                       <input
//                         type="number"
//                         name="ws10"
//                         value={formData.ws10}
//                         onChange={handleChange}
//                         placeholder="0"
//                         min="0"
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-center bg-white"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs text-gray-600 mb-1">₹1</label>
//                       <input
//                         type="number"
//                         name="ws1"
//                         value={formData.ws1}
//                         onChange={handleChange}
//                         placeholder="0"
//                         min="0"
//                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-center bg-white"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* W/S GPAY/CARD */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">GPay/Card</label>
//                   <input
//                     type="number"
//                     name="wsGpayCard"
//                     value={formData.wsGpayCard}
//                     onChange={handleChange}
//                     placeholder="0.00"
//                     step="0.01"
//                     min="0"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Expenses & Other Transactions */}
//             <div className="bg-[#f5f7fa] rounded-lg p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="bg-purple-600 p-2 rounded-lg">
//                   <FaPlus className="text-white text-lg" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800">Expenses & Other Transactions</h3>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* EXPENSE */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">General Expense</label>
//                   <input
//                     type="number"
//                     name="expense"
//                     value={formData.expense}
//                     onChange={handleChange}
//                     placeholder="0.00"
//                     step="0.01"
//                     min="0"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
//                   />
//                 </div>

//                 {/* HOME DELIVERY */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Home Delivery</label>
//                   <input
//                     type="number"
//                     name="homeDelivery"
//                     value={formData.homeDelivery}
//                     onChange={handleChange}
//                     placeholder="0.00"
//                     step="0.01"
//                     min="0"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
//                   />
//                 </div>

//                 {/* VOID SALE */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Void Sale</label>
//                   <input
//                     type="number"
//                     name="voidSale"
//                     value={formData.voidSale}
//                     onChange={handleChange}
//                     placeholder="0.00"
//                     step="0.01"
//                     min="0"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 p-4 bg-[#f5f7fa] rounded-lg border border-gray-200">
//             <div className="flex items-center justify-between">
//               <span className="text-lg font-semibold text-gray-700">
//                 Total Amount:
//               </span>
//               <span className="text-2xl font-bold text-[#2a5298]">
//                 ₹{totalAmount.toFixed(2)}
//               </span>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
//             >
//               Cancel
//             </button>
//             <button
//   type="submit"
//   disabled={isLoading}
//   className="flex-1 px-6 py-3 bg-[#2a5298] text-white rounded-lg font-semibold hover:bg-[#1e3d70] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// >
//   {isLoading ? (
//     <>
//       <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//       </svg>
//       Saving...
//     </>
//   ) : (
//     "Save Entry"
//   )}
// </button>

//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { FaTimes, FaUser, FaShoppingCart, FaTruck, FaPlus } from "react-icons/fa";

interface CashTallyProps {
  isOpen?: boolean;
  onClose?: () => void;
  counter?: number;
  initialData?: any;
}

export default function CashTally({
  isOpen = true,
  onClose = () => {},
  counter = 1,
  initialData,
}: CashTallyProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    name: "",
    retailScanAmount: "",
    retail500: "",
    retail200: "",
    retail100: "",
    retail50: "",
    retail20: "",
    retail10: "",
    retail1: "",
    retailGpay: "",
    retailCard: "",
    expense: "",
    wsCashBillingAmount: "",
    wsCreditBillingAmount: "",
    wsCreditReceipt: "",
    ws500: "",
    ws200: "",
    ws100: "",
    ws50: "",
    ws20: "",
    ws10: "",
    ws1: "",
    wsGpayCard: "",
    homeDelivery: "",
    retail1500: "",
    retail2200: "",
    retail3100: "",
    retail450: "",
    retail520: "",
    retail610: "",
    retail71: "",
    voidSale: "",
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          date: new Date().toISOString().split("T")[0],
          name: "",
          retailScanAmount: "",
          retail500: "",
          retail200: "",
          retail100: "",
          retail50: "",
          retail20: "",
          retail10: "",
          retail1: "",
          retailGpay: "",
          retailCard: "",
          expense: "",
          wsCashBillingAmount: "",
          wsCreditBillingAmount: "",
          wsCreditReceipt: "",
          ws500: "",
          ws200: "",
          ws100: "",
          ws50: "",
          ws20: "",
          ws10: "",
          ws1: "",
          wsGpayCard: "",
          homeDelivery: "",
          retail1500: "",
          retail2200: "",
          retail3100: "",
          retail450: "",
          retail520: "",
          retail610: "",
          retail71: "",
          voidSale: "",
        });
      }
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    const sum = [
      parseFloat(formData.retailScanAmount) || 0,
      parseFloat(formData.retail500) || 0,
      parseFloat(formData.retail200) || 0,
      parseFloat(formData.retail100) || 0,
      parseFloat(formData.retail50) || 0,
      parseFloat(formData.retail20) || 0,
      parseFloat(formData.retail10) || 0,
      parseFloat(formData.retail1) || 0,
      parseFloat(formData.retailGpay) || 0,
      parseFloat(formData.retailCard) || 0,
      parseFloat(formData.expense) || 0,
      parseFloat(formData.wsCashBillingAmount) || 0,
      parseFloat(formData.wsCreditBillingAmount) || 0,
      parseFloat(formData.wsCreditReceipt) || 0,
      parseFloat(formData.ws500) || 0,
      parseFloat(formData.ws200) || 0,
      parseFloat(formData.ws100) || 0,
      parseFloat(formData.ws50) || 0,
      parseFloat(formData.ws20) || 0,
      parseFloat(formData.ws10) || 0,
      parseFloat(formData.ws1) || 0,
      parseFloat(formData.wsGpayCard) || 0,
      parseFloat(formData.homeDelivery) || 0,
      parseFloat(formData.retail1500) || 0,
      parseFloat(formData.retail2200) || 0,
      parseFloat(formData.retail3100) || 0,
      parseFloat(formData.retail450) || 0,
      parseFloat(formData.retail520) || 0,
      parseFloat(formData.retail610) || 0,
      parseFloat(formData.retail71) || 0,
      parseFloat(formData.voidSale) || 0,
    ].reduce((acc, val) => acc + val, 0);
    setTotalAmount(sum);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const timestamp = new Date().toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });

      const rowData = [
        timestamp,
        formData.date,
        formData.name,
        formData.retailScanAmount,
        formData.retail500,
        formData.retail200,
        formData.retail100,
        formData.retail50,
        formData.retail20,
        formData.retail10,
        formData.retail1,
        formData.retailGpay,
        formData.retailCard,
        formData.wsCashBillingAmount,
        formData.wsCreditBillingAmount,
        formData.wsCreditReceipt,
        formData.ws500,
        formData.ws200,
        formData.ws100,
        formData.ws50,
        formData.ws20,
        formData.ws10,
        formData.ws1,
        formData.wsGpayCard,
        formData.expense,
        formData.homeDelivery,
        formData.retail1500,
        formData.retail2200,
        formData.retail3100,
        formData.retail450,
        formData.retail520,
        formData.retail610,
        formData.retail71,
        formData.wsGpayCard,
        formData.voidSale
      ];

      const sheetName = `Cash Tally Counter ${counter}`;
      const scriptUrl = "https://script.google.com/macros/s/AKfycbx5dryxS1R5zp6myFfUlP1QPimufTqh5hcPcFMNcAJ-FiC-hyQL9mCkgHSbLkOiWTibeg/exec";
      
      const formDataToSend = new URLSearchParams({
        sheetName: sheetName,
        action: "insert",
        rowData: JSON.stringify(rowData)
      });

      const response = await fetch(scriptUrl, {
        method: "POST",
        body: formDataToSend
      });

      const result = await response.json();
      
      if (result.success) {
        const existingEntries = JSON.parse(
          localStorage.getItem("cashTallyEntries") || "[]"
        );
        
        if (initialData) {
          const updatedEntries = existingEntries.map((entry: any) => 
            entry.id === initialData.id ? { ...formData, id: initialData.id } : entry
          );
          localStorage.setItem("cashTallyEntries", JSON.stringify(updatedEntries));
        } else {
          const newEntry = { id: Date.now().toString(), ...formData };
          localStorage.setItem(
            "cashTallyEntries",
            JSON.stringify([newEntry, ...existingEntries])
          );
        }
        
        onClose();
        alert("Data saved successfully!");
      } else {
        console.error("Error:", result.error);
        alert("Failed to save data: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[#f5f7fa] rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#f5f7fa] border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold text-gray-800">
            Cash Tally - Counter {counter}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaTimes className="text-gray-600 text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-8">
            {/* Basic Information */}
            <div className="bg-[#f5f7fa] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#2a5298] p-2 rounded-lg">
                  <FaUser className="text-white text-lg" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Employee Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter employee name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all bg-white"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Retail Transactions */}
            <div className="bg-[#f5f7fa] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <FaShoppingCart className="text-white text-lg" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Retail Transactions</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Scan Amount</label>
                  <input
                    type="number"
                    name="retailScanAmount"
                    value={formData.retailScanAmount}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Cash Denominations</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">₹500</label>
                      <input
                        type="number"
                        name="retail500"
                        value={formData.retail500}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">₹200</label>
                      <input
                        type="number"
                        name="retail200"
                        value={formData.retail200}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">₹100</label>
                      <input
                        type="number"
                        name="retail100"
                        value={formData.retail100}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">₹50</label>
                      <input
                        type="number"
                        name="retail50"
                        value={formData.retail50}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">₹20</label>
                      <input
                        type="number"
                        name="retail20"
                        value={formData.retail20}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">₹10</label>
                      <input
                        type="number"
                        name="retail10"
                        value={formData.retail10}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">₹1</label>
                      <input
                        type="number"
                        name="retail1"
                        value={formData.retail1}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">GPay/UPI</label>
                  <input
                    type="number"
                    name="retailGpay"
                    value={formData.retailGpay}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Card Payments</label>
                  <input
                    type="number"
                    name="retailCard"
                    value={formData.retailCard}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Wholesale Transactions */}
            <div className="bg-[#f5f7fa] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <FaTruck className="text-white text-lg" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Wholesale Transactions</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Cash Billing</label>
                  <input
                    type="number"
                    name="wsCashBillingAmount"
                    value={formData.wsCashBillingAmount}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Credit Billing</label>
                  <input
                    type="number"
                    name="wsCreditBillingAmount"
                    value={formData.wsCreditBillingAmount}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Credit Receipt</label>
                  <input
                    type="number"
                    name="wsCreditReceipt"
                    value={formData.wsCreditReceipt}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Cash Denominations</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">₹500</label>
                      <input
                        type="number"
                        name="ws500"
                        value={formData.ws500}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-center bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">₹200</label>
                      <input
                        type="number"
                        name="ws200"
                        value={formData.ws200}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-center bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">₹100</label>
                      <input
                        type="number"
                        name="ws100"
                        value={formData.ws100}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-center bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">₹50</label>
                      <input
                        type="number"
                        name="ws50"
                        value={formData.ws50}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-center bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">₹20</label>
                      <input
                        type="number"
                        name="ws20"
                        value={formData.ws20}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-center bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">₹10</label>
                      <input
                        type="number"
                        name="ws10"
                        value={formData.ws10}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-center bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">₹1</label>
                      <input
                        type="number"
                        name="ws1"
                        value={formData.ws1}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-center bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">GPay/Card</label>
                  <input
                    type="number"
                    name="wsGpayCard"
                    value={formData.wsGpayCard}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Expenses & Other Transactions */}
            <div className="bg-[#f5f7fa] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <FaPlus className="text-white text-lg" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Expenses & Other Transactions</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">General Expense</label>
                  <input
                    type="number"
                    name="expense"
                    value={formData.expense}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Home Delivery</label>
                  <input
                    type="number"
                    name="homeDelivery"
                    value={formData.homeDelivery}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
                  />
                </div>

                {/* Conditional Cash Denominations - Shows when Home Delivery has value */}
                {formData.homeDelivery && parseFloat(formData.homeDelivery) > 0 && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Home Delivery Cash Denominations</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">₹500</label>
                        <input
                          type="number"
                          name="retail1500"
                          value={formData.retail1500}
                          onChange={handleChange}
                          placeholder="0"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">₹200</label>
                        <input
                          type="number"
                          name="retail2200"
                          value={formData.retail2200}
                          onChange={handleChange}
                          placeholder="0"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">₹100</label>
                        <input
                          type="number"
                          name="retail3100"
                          value={formData.retail3100}
                          onChange={handleChange}
                          placeholder="0"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">₹50</label>
                        <input
                          type="number"
                          name="retail450"
                          value={formData.retail450}
                          onChange={handleChange}
                          placeholder="0"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">₹20</label>
                        <input
                          type="number"
                          name="retail520"
                          value={formData.retail520}
                          onChange={handleChange}
                          placeholder="0"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">₹10</label>
                        <input
                          type="number"
                          name="retail610"
                          value={formData.retail610}
                          onChange={handleChange}
                          placeholder="0"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">₹1</label>
                        <input
                          type="number"
                          name="retail71"
                          value={formData.retail71}
                          onChange={handleChange}
                          placeholder="0"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Void Sale</label>
                  <input
                    type="number"
                    name="voidSale"
                    value={formData.voidSale}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-[#f5f7fa] rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-700">
                Total Amount:
              </span>
              <span className="text-2xl font-bold text-[#2a5298]">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-[#2a5298] text-white rounded-lg font-semibold hover:bg-[#1e3d70] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Entry"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

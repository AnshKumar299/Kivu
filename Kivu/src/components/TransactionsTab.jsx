import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import TransactionList from "./ui/TransactionList";
import Modal from "./ui/modal";
import SearchBar from "./ui/SearchBar";
import Footer from "./Footer";
import {
  fetchTransacs,
  addTransaction,
} from "../features/moneydata/transactionSlice";

const TransactionsTab = () => {
  const dispatch = useDispatch();
  const txnlist = useSelector((s) => s.transacs.data);
  const isLoading = useSelector((s) => s.transacs.isLoading);
  const error = useSelector((s) => s.transacs.error);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [txnName, setTxnName] = useState("");
  const [txnCategory, setTxnCategory] = useState("");
  const [txnType, setTxnType] = useState("");
  const [txnAmount, setTxnAmount] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { value: "food", label: "Food" },
    { value: "bills", label: "Bills" },
    { value: "clothing", label: "Clothing" },
    { value: "taxes", label: "Taxes" },
    { value: "rent", label: "Rent" },
    { value: "miscellaneous", label: "Misc." },
    { value: "savings", label: "Savings" },
  ];

  useEffect(() => {
    dispatch(fetchTransacs());
  }, [dispatch]);

  const filteredList =
    Array.isArray(txnlist) && txnlist.length > 0
      ? txnlist.filter((txn) => {
          const query = searchQuery.toLowerCase().trim();

          if (!query) return true;

          const noteMatch = txn.note?.toLowerCase().includes(query);
          const categoryMatch = txn.category?.toLowerCase().includes(query);
          const typeMatch = txn.type?.toLowerCase().includes(query);

          let amountMatch = false;
          const cleanQuery = query.replace(/[₹$,\s]/g, "");
          const queryAsNumber = parseFloat(cleanQuery);

          if (!isNaN(queryAsNumber)) {
            const amount = txn.amount;

            amountMatch =
              amount === queryAsNumber ||
              amount.toString().includes(cleanQuery) ||
              (queryAsNumber >= 100 &&
                Math.abs(amount - queryAsNumber) <= queryAsNumber * 0.05) ||
              Math.abs(amount - queryAsNumber) < 0.01;
          }

          return noteMatch || categoryMatch || typeMatch || amountMatch;
        })
      : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTxn = {
      note: txnName.trim(),
      amount: Number(txnAmount),
      category: txnCategory,
      type: txnType,
      timestamp: Date.now(),
    };
    try {
      await dispatch(addTransaction(newTxn)).unwrap();
      await dispatch(fetchTransacs());
      setIsModalOpen(false);
      setTxnName("");
      setTxnAmount("");
      setTxnCategory("");
      setTxnType("");
    } catch (err) {
      console.error("Failed to add transaction:", err);
    }
  };

  // Check if the API sent "no transaction found" or the list is empty
  const noTransactions =
    !isLoading &&
    !error &&
    (txnlist === "no transaction found" ||
      (Array.isArray(txnlist) && txnlist.length === 0));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        {/* header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <SearchBar query={searchQuery} setQuery={setSearchQuery} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition"
          >
            + Add Transaction
          </button>
        </div>

        {/* modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Transaction"
        >
          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* name */}
            <div>
              <label className="block font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={txnName}
                required
                onChange={(e) => setTxnName(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* amount */}
            <div>
              <label className="block font-medium text-gray-700">Amount</label>
              <input
                type="number"
                value={txnAmount}
                required
                onChange={(e) => setTxnAmount(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                min="0.01"
                step="0.01"
              />
            </div>

            {/* category */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setTxnCategory(cat.value)}
                    className={`px-2 py-1 text-sm text-center rounded-lg border ${
                      txnCategory === cat.value
                        ? "bg-blue-500 text-white border-blue-600"
                        : "bg-white text-gray-700 hover:border-blue-300"
                    } transition whitespace-normal break-words`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* type */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Type
              </label>
              <div className="flex gap-4">
                {["sent", "received"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTxnType(t)}
                    className={`flex-1 px-3 py-2 text-white rounded-lg text-sm ${
                      txnType === t
                        ? t === "sent"
                          ? "bg-red-600"
                          : "bg-green-600"
                        : t === "sent"
                        ? "bg-red-300"
                        : "bg-green-300"
                    } transition`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* submit */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </form>
        </Modal>

        {/* Loading */}
        {isLoading && (
          <p className="text-center py-8 text-gray-500">
            Loading transactions…
          </p>
        )}

        {/* Error */}
        {!isLoading && error && (
          <p className="text-center py-8 text-red-500">Error: {error}</p>
        )}

        {/* No transactions */}
        {noTransactions && (
          <div className="relative text-center py-16 px-8">
            {/* Decorative background elements */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-blue-100/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-8 left-8 w-12 h-12 bg-amber-100/30 rounded-full blur-lg animate-pulse delay-300"></div>
            <div className="absolute bottom-12 right-8 w-16 h-16 bg-green-100/30 rounded-full blur-lg animate-pulse delay-700"></div>

            {/* Main content */}
            <div className="relative z-10 max-w-md mx-auto">
              {/* Icon */}
              <div className="text-6xl mb-6 animate-bounce">📊</div>

              {/* Heading */}
              <h3 className="text-2xl font-bold text-slate-700 mb-4 font-robotoserif">
                No Transactions Yet
              </h3>

              {/* Description */}
              <p className="text-slate-600 text-lg font-quicksand mb-8 leading-relaxed">
                Start your financial journey by adding your first transaction
                and watch your money story unfold.
              </p>

              {/* Call-to-action button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold font-quicksand text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-blue-400/30"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                <div className="relative flex items-center gap-3">
                  <svg
                    className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Add Your First Transaction</span>
                </div>
              </button>

              {/* Motivational footer */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
                <p className="text-blue-700 font-medium font-quicksand text-sm">
                  🚀 Every financial expert started with their first transaction
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Transaction list */}
        {!isLoading && !error && !noTransactions && (
          <TransactionList list={filteredList} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TransactionsTab;

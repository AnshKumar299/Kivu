import React from "react";
import NavBar from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import Transaction from "./ui/Transaction";
import TransactionList from "./ui/TransactionList";
import Modal from "./ui/modal";
import { useState } from "react";
import SearchBar from "./ui/SearchBar";
import Footer from './Footer'

const TransactionsTab = () => {
  let txnlist = useSelector((state) => state.transacs.data);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lasttransacId, setLastTransacId] = useState("txn_023");
  const [txnName, setTxnName] = useState("");
  const [txnCategory, setTxnCategory] = useState("");
  const [txnType, setTxnType] = useState("");
  const [txnAmount, setTxnAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "food",
    "bills",
    "clothing",
    "taxes",
    "rent",
    "miscellaneous",
    "savings",
  ];

  const filteredList = txnlist.filter((txn) => {
    const query = searchQuery.toLowerCase();
    return (
      txn.note?.toLowerCase().includes(query) ||
      txn.category?.toLowerCase().includes(query)
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    const num = Number(lasttransacId.substring(4, 7)) + 1;
    const newId = `txn_${String(num).padStart(3, "0")}`;

    const newTxn = {
      note: txnName,
      amount: Number(txnAmount),
      category: txnCategory,
      type: txnType,
      id: newId,
      timestamp: Date.now(),
    };

    // Replace this with the correct action (not addSavings if it's general)
    dispatch({ type: "transacs/addTransaction", payload: newTxn });

    setLastTransacId(newId);
    setIsModalOpen(false); // close modal
    setTxnName("");
    setTxnAmount(0);
    setTxnCategory("");
    setTxnType("");
  };

  return (
    <div className="w-full">
      <div>
        <NavBar />
      </div>

      <div className="flex justify-center">
        <div className={`mb-0 m-9 p-3 grid w-8/9 max-w-3xl items-center ${isModalOpen?'grid-rows-[6fr_1fr]':'grid-cols-[1fr_3fr]'}`}>
        <div>
        {!isModalOpen && (
          <button
            className=" m-3 p-2 border-2 rounded-2xl font-bold font-quicksand bg-gradient-to-br border-amber-600 from-orange-600 to-amber-200 hover:bg-gradient-to-br hover:from-orange-500 hover:to-amber-100 hover:text-zinc-900"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Transaction
          </button>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          title={"Add Transaction"}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Name">Set Transaction Name: </label>
              <input
                type="text"
                onChange={(e) => setTxnName(e.target.value)}
                id="Name"
                className="border-1 ml-5 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="Name">Set Transaction Amount: </label>
              <input
                type="Number"
                onChange={(e) => setTxnAmount(e.target.value)}
                id="Name"
                className="border-1 ml-2 rounded-lg"
                required
              />
            </div>

            <div className="my-4">
              <label htmlFor="Category" className="my-2">
                Select Transaction Category:
              </label>
              <div className="grid grid-cols-2 m-4 sm:grid-cols-4 gap-4 mb-4">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    onClick={() => setTxnCategory(cat)}
                    className={`cursor-pointer rounded-xl border p-3 text-center transition-all duration-200 
              ${
                txnCategory === cat
                  ? "bg-blue-500 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-700 hover:border-blue-300"
              }`}
                  >
                    {cat}
                  </div>
                ))}
              </div>

              <div>
                <label htmlFor="Type">Select Transaction Type:</label>
                <div className="flex justify-evenly mt-2">
                  <div
                    onClick={() => setTxnType("sent")}
                    className={`p-4 text-white cursor-pointer rounded-3xl ${
                      txnType === "sent" ? "bg-red-700" : "bg-red-400"
                    }`}
                  >
                    Sent
                  </div>
                  <div
                    onClick={() => setTxnType("received")}
                    className={`p-4 text-white cursor-pointer rounded-3xl ${
                      txnType === "received" ? "bg-green-700" : "bg-green-400"
                    }`}
                  >
                    Received
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between p-3 m-4">
              <button
                type="submit"
                className="bg-green-800 text-white p-3 rounded-2xl hover:cursor-pointer"
              >
                Add Transaction
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-800 text-white p-3 rounded-2xl hover:cursor-pointer"
              >
                Cancel Transaction
              </button>
            </div>
          </form>
        </Modal>
      </div>
      <div className="w-full">
        <SearchBar query={searchQuery} setQuery={setSearchQuery} />
      </div>
      </div>
      </div>
      
      <div>
        <TransactionList list={filteredList} />
      </div>

      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default TransactionsTab;

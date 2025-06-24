import React from "react";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import Transaction from "./ui/Transaction";

const TransactionsTab = () => {
  let txnlist = useSelector((state) => state.transacs.data);
  const sortedList = [...txnlist].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  return (
    <div className="w-full">
      <div>
        <NavBar />
      </div>

      <div className="flex justify-center m-3">
        <div className=" border-1 p-8 m-12 mx-auto w-full max-w-3xl rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-300">
        <h1 className=" font-edu text-2xl pb-3 pl-2 text-yellow-200">List of Transactions:</h1>
        <div >
          {sortedList.map((txn) => (
            <Transaction transactionData={txn} />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default TransactionsTab;

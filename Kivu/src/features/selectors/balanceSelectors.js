import { createSelector } from "@reduxjs/toolkit";

export const selectTransactions = (state) => state.transacs.data;

export const selectBalanceByCategory = createSelector(
  [selectTransactions],
  (txns) => {
    const balance = {
      net: 0,
      rent: 0,
      food: 0,
      clothing: 0,
      taxes: 0,
      bills: 0,
      miscellaneous:0,
      savings:0,
      remaining:0,
    };

    for (const tx of txns) {
        if(tx.type==='received'){
            balance.net+=tx.amount;
        }
        else if(tx.category==='rent'){
            balance.rent+=tx.amount;
        }else if(tx.category==='clothing'){
            balance.clothing+=tx.amount;
        }
        else if(tx.category =='food'){
            balance.food+=tx.amount;
        }
        else if(tx.category==='taxes'){
            balance.taxes+=tx.amount;
        }else if(tx.category==='bills'){
            balance.bills+=tx.amount;
        }else if(tx.category==='savings'){
            balance.savings+=tx.amount;
        }else{
            balance.miscellaneous+=tx.amount;
        }
    }
    balance.remaining=balance.net-(balance.bills+balance.clothing+balance.food+balance.miscellaneous+balance.rent+balance.taxes+balance.savings);
    return balance;
  }
);

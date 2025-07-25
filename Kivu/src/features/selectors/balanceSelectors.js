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
      miscellaneous: 0,
      savings: 0,
      remaining: 0,
    };

    for (const tx of txns) {
      const amount = Number(tx.amount) || 0;

      if (tx.type === 'received') {
        balance.net += amount;
      } else {
        // Expense categories
        switch (tx.category) {
          case 'rent': balance.rent += amount; break;
          case 'food': balance.food += amount; break;
          case 'clothing': balance.clothing += amount; break;
          case 'taxes': balance.taxes += amount; break;
          case 'bills': balance.bills += amount; break;
          case 'savings': balance.savings += amount; break;
          default: balance.miscellaneous += amount; break;
        }
      }
    }

    balance.remaining = balance.net - (
      balance.rent +
      balance.food +
      balance.clothing +
      balance.taxes +
      balance.bills +
      balance.miscellaneous +
      balance.savings
    );

    return balance;
  }
);

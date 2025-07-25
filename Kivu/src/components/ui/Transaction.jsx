import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction, updateTransaction } from '../../features/moneydata/transactionSlice';

function toProperCase(str) {
  return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

const Transaction = ({ transactionData }) => {
  const category = transactionData.category;
  const categoryPallete = useSelector((state) => state.colors?.[category]);
  const bgcolor = categoryPallete?.bg;
  const textcolor = categoryPallete?.text;
  const icon = categoryPallete?.icon;
  const type = transactionData.type;

  const dispatch = useDispatch();

  // Local state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(transactionData.note || '');
  const [editedAmount, setEditedAmount] = useState(transactionData.amount);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showActions, setShowActions] = useState(false);

  // Reset edited values when editing mode changes
  useEffect(() => {
    if (!isEditing) {
      setEditedNote(transactionData.note || '');
      setEditedAmount(transactionData.amount);
    }
  }, [isEditing, transactionData]);

  // Delete transaction handler with confirmation
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setIsDeleting(true);
      dispatch(deleteTransaction(transactionData._id))
        .then(() => {
          // Transaction deleted successfully
        })
        .catch((error) => {
          console.error('Failed to delete transaction:', error);
          setIsDeleting(false);
        });
    }
  };

  // Save edits handler with validation
  const handleSave = async () => {
    if (!editedNote.trim()) {
      alert('Transaction note cannot be empty!');
      return;
    }

    if (editedAmount <= 0) {
      alert('Amount must be greater than 0!');
      return;
    }

    setIsSaving(true);
    try {
      await dispatch(updateTransaction({
        transactionId: transactionData._id,
        updatedData: {
          note: editedNote.trim(),
          amount: editedAmount,
          category: transactionData.category,
          type: transactionData.type,
        }
      })).unwrap();
      
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update transaction:', error);
      alert('Failed to update transaction. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedNote(transactionData.note || '');
    setEditedAmount(transactionData.amount);
    setIsEditing(false);
  };

  // Get relative time
  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const txnDate = new Date(timestamp);
    const diffInHours = Math.floor((now - txnDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Now';
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInHours < 48) return '1d';
    return txnDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div 
      className={`group relative rounded-xl shadow-md border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
        isDeleting ? 'opacity-50 pointer-events-none' : ''
      } ${
        type === 'sent' 
          ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-300 hover:border-red-400' 
          : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 hover:border-green-400'
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Colorful side indicator */}
      <div className={`absolute -left-1 top-2 w-1 h-8 rounded-r-full ${
        type === 'sent' 
          ? 'bg-gradient-to-b from-red-400 via-pink-500 to-red-600' 
          : 'bg-gradient-to-b from-green-400 via-emerald-500 to-green-600'
      }`} />

      {/* Loading overlay */}
      {(isSaving || isDeleting) && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 border-2 border-gray-300 rounded-full animate-spin ${
              type === 'sent' ? 'border-t-red-500' : 'border-t-green-500'
            }`}></div>
            <span className="text-gray-700 text-sm font-medium">
              {isSaving ? 'Saving...' : 'Deleting...'}
            </span>
          </div>
        </div>
      )}

      <div className="p-3">
        {/* Header Section - More Compact */}
        <div className="flex items-center gap-3 mb-2">
          {/* Transaction Note */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                type="text"
                value={editedNote}
                onChange={(e) => setEditedNote(e.target.value)}
                className="w-full text-gray-800 font-semibold text-sm font-quicksand bg-white border-2 border-blue-300 rounded-lg px-3 py-1.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                placeholder="Enter note..."
                autoFocus
              />
            ) : (
              <div className="text-gray-800 font-semibold text-sm font-quicksand truncate">
                {transactionData.note || 'No description'}
              </div>
            )}
          </div>

          {/* Beautifully Enhanced Category Badge */}
<div className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border-2 font-bold text-xs whitespace-nowrap transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
  bgcolor && textcolor 
    ? `${textcolor} ${bgcolor} border-current/30 hover:border-current/50` 
    : 'text-purple-700 bg-gradient-to-br from-purple-100 via-purple-50 to-purple-200 border-purple-300'
}`}>
  {/* Subtle shine effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
  
  {/* Enhanced icon */}
  {icon && (
    <span className="relative z-10 text-base drop-shadow-sm hover:scale-110 transition-transform duration-200">
      {icon}
    </span>
  )}
  
  {/* Enhanced text */}
  <span className="relative z-10 font-quicksand font-semibold tracking-wide">
    {toProperCase(transactionData.category)}
  </span>
</div>
</div>

        {/* Amount and Time Section - Compact */}
        <div className="flex items-center justify-between">
          {/* Amount */}
          <div>
            {isEditing ? (
              <div className="relative">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  value={editedAmount}
                  onChange={(e) => setEditedAmount(Number(e.target.value))}
                  className="w-24 pl-6 pr-2 py-1.5 text-gray-800 font-bold text-sm font-robotoserif bg-white border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  min="0.01"
                  step="0.01"
                />
              </div>
            ) : (
              <div className={`font-bold text-lg font-robotoserif flex items-center gap-1 ${
                type === 'sent' ? 'text-red-600' : 'text-green-600'
              }`}>
                <span className={`text-sm ${type === 'sent' ? 'text-red-500' : 'text-green-500'}`}>
                  {type === 'sent' ? '−' : '+'}
                </span>
                <span>₹{transactionData.amount.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Compact Time Display */}
          <div className="text-right">
            <div className={`text-xs font-medium px-2 py-1 rounded-full ${
              type === 'sent' 
                ? 'text-red-600 bg-red-100' 
                : 'text-green-600 bg-green-100'
            }`}>
              {getRelativeTime(transactionData.timestamp)}
            </div>
          </div>
        </div>

        {/* Compact Action Buttons */}
        <div className={`flex justify-end gap-2 mt-2 transition-all duration-300 ${
          showActions || isEditing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}>
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg text-xs font-medium hover:from-emerald-600 hover:to-green-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save
              </button>
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg text-xs font-medium hover:from-orange-600 hover:to-red-600 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-xs font-medium hover:from-blue-600 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-pink-500 to-red-600 text-white rounded-lg text-xs font-medium hover:from-pink-600 hover:to-red-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;

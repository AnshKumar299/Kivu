const Transaction = require('../models/transactionModel');


module.exports.addTransaction = async(req,res)=>{
    try{
        const { amount,type,category,note,timestamp}=req.body;

        if(!amount || !type || !category || !timestamp){
            return res.status(400).json({
                message:"Missing required fields"
            })
        }

        const transaction = new Transaction({
            userId : req.user._id,
            amount,
            type,
            category,
            note:note||'',
            timestamp
        })

        await transaction.save();
        res.status(201).json({
            success:true,
            message:"transaction added",
            transaction
        })
    }catch(err){
        res.status(500).json({message:'Server error',error:err.message});
    }
};

module.exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id })
      .sort({ timestamp: -1 }); // latest first

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found' });
    }

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports.updateTransaction = async(req,res)=>{
    try{
        const transaction = await Transaction.findOneAndUpdate(
            {
                _id:req.params.id,
                userId:req.user._id
            },req.body,
            {
                new:true  //return updated doc
            }
        );

        if(!transaction) return res.status(404).json({
            success:false,
            message:"transaction not found"
        });

        res.json({
            success:true,
            message:"Transaction updated",
            transaction
        })
    }catch(err){
        res.status(500).json({
            message:"Server error",
            error: err.message,
        })
    }
};


module.exports.deleteTransaction = async(req,res)=>{
    try{
        const transaction = await Transaction.findOneAndDelete({
            _id:req.params.id,
            userId:req.user._id
        });

        if(!transaction){
            return res.status(404).json({
                message:'Transaction not found'
            })
        }
        res.json({
            success:true,
            message:'Transaction deleted'
        })
    }catch(err){
        res.status(500).json({
            message:'Server error',
            error:err.message
        })
    }
};
const Borrower = require('../models/borrower')

exports.createBorrower = async (req,res) =>{
   try {
    const {name,email,registeredDate,membershipId} =req.body;
    if (!name || !membershipId){
        return res.status(400).json("name and membershipId are required");
    }
    const borrower = await Borrower.create(
        {name,
        email,
        registeredDate: Date.now(),
        }

    );
    res.status(200).json(borrower);
}
catch(err){
        res.status(500).json({ error: err.message });

}

}
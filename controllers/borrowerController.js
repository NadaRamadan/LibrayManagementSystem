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

exports.UpdateBorrower = async (req,res)=>{
    try{
    const {id} = req.params;
    const {name,email,membershipId} = req.body;
        if (!id ){
            res.status(400).json({message:"Id is required"})
        }
    const borrower = await Borrower.findByPk(id);
    if (!borrower){
        res.status(404).json({message:"Borrower not found"});
    }

    await borrower.update({name,email,membershipId});


    }
    catch(err){
        res.status(500).json({error: err.message})
    }


}

exports.DeleteBorrower = async(req,res) =>{
try{const {id} = req.params;
if(!id){
    res.status(400).json({message:"ID is required"});
}
const borrower = Borrower.findByPk(id);

if (!borrower){
    res.status(404).json({message:"Borrower not found"});
}
await borrower.destroy();

res.status(200).json({message:"borrower deleted successful"})
}


 catch(err){
        res.status(500).json({error: err.message})
    }

}

exports.GetAllBorrowers = async(req,res) => {
try {const borrowers = await Borrower.findAll();
res.status(200).json(borrowers);
} catch(err){
    res.status(500).json({error:err.message})
}

}
import User from '../models/User.js';

const userControllerApi = {
	updateUser: async (req, res, next) => {
		let id = req.params.id;
		let updatedBody = req.body;

	    try{
	        const updatedUser = await User.findByIdAndUpdate(
	        	id, 
	        	{ $set: updatedBody },
	        	{ new: true }
	        );
	        res.status(200).json(updatedUser)
	    } catch(err) {
	       next(err);
	    }
	},

	listUser: async (req, res, next) => {
	let id = req.params.id;
	console.log("id: ", id);

    try{
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(err) {
        next(err);
    	}
	},

	listAllUser: async (req, res, next) => {
	try{
        const allUser = await User.find();
        res.status(200).json(allUser);
    } catch(err) {
    	next(err);
    	}
	},

	deteteUser: async (req, res, next) => {
	let id = req.params.id;

    try{
        await User.findByIdAndDelete(id);
        res.status(200).json("User has been deleted");
    } catch(err) {
        next(err);
    	}
	},


};

export default userControllerApi;
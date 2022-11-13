import Hotel from '../models/Hotel.js';

var hotelControllerApi = {
	createHotel: async (req, res, next) => {
		const body = req.body;
		const newHotel = new Hotel(body);

		try {
			const saveHotel = await newHotel.save();
			res.status(200).json(saveHotel);
		} catch (err) {
			next(err);
		}
	},

	updateHotel: async (req, res, next) => {
		let id = req.params.id;
		let updatedBody = req.body;

	    try{
	        const updatedHotel = await Hotel.findByIdAndUpdate(
	        	id, 
	        	{ $set: updatedBody },
	        	{ new: true }
	        );
	        res.status(200).json(updatedHotel)
	    } catch(err) {
	       next(err);
	    }
	},

	listHotel: async (req, res, next) => {
	let id = req.params.id;
	console.log("id: ", id);

    try{
        const hotel = await Hotel.findById(id);
        res.status(200).json(hotel);
    } catch(err) {
        next(err);
    	}
	},

	listAllHotel: async (req, res, next) => {
	try{
        const allHotel = await Hotel.find();
        res.status(200).json(allHotel);
    } catch(err) {
    	next(err);
    	}
	},

	deleteHotel: async (req, res, next) => {
	let id = req.params.id;

    try{
        await Hotel.findByIdAndDelete(id);
        res.status(200).json("Hotel has been deleted");
    } catch(err) {
        next(err);
    	}
	},


};

export default hotelControllerApi;
import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL);
		console.log('MongoDB Connect: ' + conn.connection.host);
		console.log('You successfully connected to MongoDB!');
	} catch (error) {
		console.log('Error: ' + error.message);
		process.exit(1);
	}
};
export default connectDB;

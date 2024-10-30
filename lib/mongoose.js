// import mongoose from "mongoose";

// export function mongooseConnect(){
//     if(mongoose.connection.readyState === 1) {
//      return mongoose.connection.asPromise();
//     }else {
//         const url = process.env.MONGODB_URI
//         return mongoose.connect(uri);

//     }
// }


import mongoose from "mongoose";

export async function mongooseConnect() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    } else {
        const url = process.env.MONGODB_URI; // Correctly use 'url'
        return mongoose.connect(url); // Use 'url' instead of 'uri'
    }
}

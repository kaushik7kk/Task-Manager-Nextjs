import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/models/User";

export async function PUT(request: Request) {
    // Connect to database.
    await dbConnect();

    try {
        // Data from api call.
        const {fname, mname, lname, email, username, imgUrl} = await request.json();

        const userByUsername = await UserModel.findOneAndUpdate(
            {username},
            {
                fname,
                mname,
                lname,
                email,
                username,
                imgUrl
            }
        )
    }
}
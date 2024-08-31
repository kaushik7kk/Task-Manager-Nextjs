import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/models/User";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { fname, mname, lname, username, email, password } = await request.json();
        
        const existingUserByEmail = await UserModel.findOne({
            email
        })

        

        const newUser = new UserModel({
            fname,
            mname,
            lname,
            username,

        })

    } catch(error) {

    }
}
import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import bcryptjs from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { fname, mname, lname, username, email, password } =
      await request.json();

    const existingUserByUsername = await UserModel.findOne({
      username,
    });

    if (existingUserByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        {
          status: 400,
        }
      );
    }

    const existingUserByEmail = await UserModel.findOne({
      email,
    });

    if (existingUserByEmail) {
      return Response.json(
        {
          success: false,
          message: "Email already in use",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new UserModel({
      fname,
      mname,
      lname,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return Response.json(
      {
        success: true,
        message: "Signup successful",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error signing up", error);
    return Response.json(
      {
        success: false,
        message: "Error signing up",
      },
      {
        status: 500,
      }
    );
  }
}

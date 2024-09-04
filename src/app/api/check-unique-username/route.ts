import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { usernameValidation } from "@/schemas/signupSchema";
import { z } from "zod";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    const result = UsernameQuerySchema.safeParse(queryParam);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters.",
        },
        {
          status: 400,
        }
      );
    }
    const { username } = result.data;

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        {
          status: 400,
        }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "Valid username",
        },
        {
          status: 200,
        }
      );
    }
  } catch (err) {
    console.error("Error checking username", err);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      {
        status: 500,
      }
    );
  }
}

import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { usernameValidation } from "@/schemas/signupSchema";
import { z } from "zod";

// Validation for username.
const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  // Connect to database.
  await dbConnect();

  try {
    // Get username from url query.
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    // Validate username from query.
    const result = UsernameQuerySchema.safeParse(queryParam);
    // If username doesn't satisfy validation.
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

    // See if user with username already exists in database.
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

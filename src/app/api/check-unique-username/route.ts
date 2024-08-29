import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { usernameValidation } from "@/schemas/signupSchema";
import { z } from "zod";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const queryParam = {
    username: searchParams.get("username"),
  };

  const result = UsernameQuerySchema.safeParse(queryParam);
  if (!result.success) {
    console.log(result.error.format().username?._errors[0]);
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
  console.log(existingUser);
  if (existingUser) {
    return Response.json({
      message: "Username exists",
    });
  } else {
    return Response.json({
      message: "Valid username",
    });
  }
}

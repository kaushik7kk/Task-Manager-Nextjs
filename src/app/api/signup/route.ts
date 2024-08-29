import { dbConnect } from "@/lib/dbConnect";


export async function POST(request: Request) {
    await dbConnect();

    const obj = await request.json();

    return Response.json({
        success: true,
        message: "Works",
        user: obj
    })
}
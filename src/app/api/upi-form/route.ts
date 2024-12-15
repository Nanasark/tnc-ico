import { NextRequest, NextResponse } from "next/server";

const { SHEETURL } = process.env;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, address, phone, upiId, moneyPaid } = body;
  if (!address || !email || !upiId) {
    throw "Email and address missing";
  }

  try {
    const url = `${SHEETURL}`;
    const tx = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `Name=${name}&Email=${email}&Address=${address}&Phone=${phone}&Upi=${upiId}&Money=${moneyPaid}`,
    });

    const body = tx.json();
    if (tx.ok) {
      return NextResponse.json({
        message: "success",
        details: body,
      });
    }
    if (!tx.ok) {
      throw "purchase failed";
    }
  } catch (error) {
    console.log(error);
  }
}

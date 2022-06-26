import { Request, Response } from "express";
import express from "express";
const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/alive", (req: Request, res: Response) => {
  res.status(200);
  res.send("I'm Alive");
});

app.post("/convert", (req: Request, res: Response) => {
  const body = req.body;
  const data: string = body?.data;
  if (!data) {
    res.status(400);
    res.send("data cannot be empty");
  }
  let result = "";

  const codes = data.split(" ");

  for (let code of codes) {
    console.log({ code });
    const ascii = getNumerical(code);
    console.log({ ascii });
    const rot13Ascii = getRot13(ascii);
    console.log({ rot13Ascii });
    result += (`00000000` + getUTF8(rot13Ascii)).slice(-8) + " ";
  }
  res.status(201);
  res.send({ result: result.trim() });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});

function getNumerical(code: string): number {
  const length = code.length;
  if (length === 0) {
    return 0;
  }
  const character = code.charAt(0);
  const value = getNumerical(code.slice(1));
  return value + (character === "0" ? 0 : Math.pow(2, length - 1));
}

function getUTF8(ascii: number): string {
  if (ascii === 0) {
    return "";
  }
  const remainder = ascii % 2;
  const qoutient = ascii >> 1;
  const value = getUTF8(qoutient);
  return value + remainder;
}

function getRot13(ascii: number): number {
  const isAlphabet =
    (ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122);
  if (!isAlphabet) {
    return ascii;
  }

  const getShiftedAscii = (shift: number, start: number, ascii: number) => {
    const diff = (ascii - start + shift) % 26;
    return start + diff;
  };
  const getRot13ShiftedAscii = getShiftedAscii.bind(this, 13);
  const getUppercaseRot13Ascii = getRot13ShiftedAscii.bind(this, 65);
  const getLowercaseRot13Ascii = getRot13ShiftedAscii.bind(this, 97);
  return ascii < 97
    ? getUppercaseRot13Ascii(ascii)
    : getLowercaseRot13Ascii(ascii);
}

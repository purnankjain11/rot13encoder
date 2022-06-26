import { Request, Response } from "express";
import express from "express";
import { convertUtf8BinaryToRot13, convertUtf8ToRot13 } from "./src/rot13";
const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/alive", (req: Request, res: Response) => {
  res.status(200);
  res.send("I'm Alive");
});

app.post("/convert-binary", (req: Request, res: Response) => {
  const body = req.body;
  const data: string = body?.data;
  if (!data) {
    res.status(400);
    res.send("data cannot be empty");
  }
  let result = convertUtf8BinaryToRot13(data);
  res.status(201);
  res.send({ result });
});

app.post("/convert-string", (req: Request, res: Response) => {
  const body = req.body;
  const data: string = body?.data;
  if (!data) {
    res.status(400);
    res.send("data cannot be empty");
  }
  let result = convertUtf8ToRot13(data);
  res.status(201);
  res.send({ result });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});

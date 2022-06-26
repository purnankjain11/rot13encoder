export function convertUtf8ToRot13(data: string) {
  let result = "";

  const codes = data.split(" ");

  for (let code of codes) {
    const ascii = getNumerical(code);
    const rot13Ascii = getRot13(ascii);
    result += (`00000000` + getUTF8(rot13Ascii)).slice(-8) + " ";
  }
  return result.trim();
}

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

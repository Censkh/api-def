// polyfill from https://github.com/anonyco/FastestSmallestTextEncoderDecoder/blob/master/EncoderDecoderTogether.src.js
export const textDecode = (inputArrayOrBuffer: any, options?: any): string => {
  if (typeof TextDecoder !== "undefined") {
    return new TextDecoder("utf-8").decode(inputArrayOrBuffer);
  }

  const fromCharCode = String.fromCharCode;
  const Object_prototype_toString = {}.toString;
  const sharedArrayBufferString = Object_prototype_toString.call(window.SharedArrayBuffer);
  const undefinedObjectString = Object_prototype_toString();
  const NativeUint8Array = window.Uint8Array;
  const patchedU8Array = NativeUint8Array || Array;
  const nativeArrayBuffer = NativeUint8Array ? ArrayBuffer : patchedU8Array;
  const arrayBuffer_isView = (nativeArrayBuffer as any).isView || ((x: any) => x && "length" in x);
  const arrayBufferString = Object_prototype_toString.call(nativeArrayBuffer.prototype);
  const tmpBufferU16 = new (NativeUint8Array ? Uint16Array : patchedU8Array)(32);

  let inputAs8 = inputArrayOrBuffer;
  let asObjectString: string;
  if (!arrayBuffer_isView(inputAs8)) {
    asObjectString = Object_prototype_toString.call(inputAs8);
    if (
      asObjectString !== arrayBufferString &&
      asObjectString !== sharedArrayBufferString &&
      asObjectString !== undefinedObjectString
    )
      throw TypeError(
        "Failed to execute 'decode' on 'TextDecoder': The provided value is not of type '(ArrayBuffer or ArrayBufferView)'",
      );
    inputAs8 = NativeUint8Array ? new patchedU8Array(inputAs8) : inputAs8 || [];
  }

  let resultingString = "";
  let tmpStr = "";
  let index = 0;
  const len = inputAs8.length | 0;
  const lenMinus32 = (len - 32) | 0;
  let nextEnd = 0;
  let cp0 = 0;
  let codePoint = 0;
  let minBits = 0;
  let cp1 = 0;
  let pos = 0;
  let tmp = -1;
  // Note that tmp represents the 2nd half of a surrogate pair incase a surrogate gets divided between blocks
  while (index < len) {
    nextEnd = index <= lenMinus32 ? 32 : (len - index) | 0;
    for (; pos < nextEnd; index = (index + 1) | 0, pos = (pos + 1) | 0) {
      cp0 = inputAs8[index] & 0xff;
      switch (cp0 >> 4) {
        // biome-ignore lint: optimised code
        case 15:
          cp1 = inputAs8[(index = (index + 1) | 0)] & 0xff;
          if (cp1 >> 6 !== 0b10 || 0b11110111 < cp0) {
            index = (index - 1) | 0;
            break;
          }
          codePoint = ((cp0 & 0b111) << 6) | (cp1 & 0b00111111);
          minBits = 5; // 20 ensures it never passes -> all invalid replacements
          cp0 = 0x100; //  keep track of th bit size
        // biome-ignore lint: optimised code
        case 14:
          cp1 = inputAs8[(index = (index + 1) | 0)] & 0xff;
          codePoint <<= 6;
          codePoint |= ((cp0 & 0b1111) << 6) | (cp1 & 0b00111111);
          minBits = cp1 >> 6 === 0b10 ? (minBits + 4) | 0 : 24; // 24 ensures it never passes -> all invalid replacements
          cp0 = (cp0 + 0x100) & 0x300; // keep track of th bit size
        case 13:
        // biome-ignore lint: optimised code
        case 12:
          cp1 = inputAs8[(index = (index + 1) | 0)] & 0xff;
          codePoint <<= 6;
          codePoint |= ((cp0 & 0b11111) << 6) | (cp1 & 0b00111111);
          minBits = (minBits + 7) | 0;

          // Now, process the code point
          if (index < len && cp1 >> 6 === 0b10 && codePoint >> minBits && codePoint < 0x110000) {
            cp0 = codePoint;
            codePoint = (codePoint - 0x10000) | 0;
            if (0 <= codePoint /*0xffff < codePoint*/) {
              // BMP code point
              //nextEnd = nextEnd - 1|0;

              tmp = ((codePoint >> 10) + 0xd800) | 0; // highSurrogate
              cp0 = ((codePoint & 0x3ff) + 0xdc00) | 0; // lowSurrogate (will be inserted later in the switch-statement)

              if (pos < 31) {
                // notice 31 instead of 32
                tmpBufferU16[pos] = tmp;
                pos = (pos + 1) | 0;
                tmp = -1;
              } else {
                // else, we are at the end of the inputAs8 and let tmp0 be filled in later on
                // NOTE that cp1 is being used as a temporary variable for the swapping of tmp with cp0
                cp1 = tmp;
                tmp = cp0;
                cp0 = cp1;
              }
            } else nextEnd = (nextEnd + 1) | 0; // because we are advancing i without advancing pos
          } else {
            // invalid code point means replacing the whole thing with null replacement characters
            cp0 >>= 8;
            index = (index - cp0 - 1) | 0; // reset index  back to what it was before
            cp0 = 0xfffd;
          }

          // Finally, reset the variables for the next go-around
          minBits = 0;
          codePoint = 0;
          nextEnd = index <= lenMinus32 ? 32 : (len - index) | 0;
        /*case 11:
        case 10:
        case 9:
        case 8:
          codePoint ? codePoint = 0 : cp0 = 0xfffd; // fill with invalid replacement character
        case 7:
        case 6:
        case 5:
        case 4:
        case 3:
        case 2:
        case 1:
        case 0:
          tmpBufferU16[pos] = cp0;
          continue;*/
        // biome-ignore lint: optimised code
        default: // fill with invalid replacement character
          tmpBufferU16[pos] = cp0;
          continue;
        case 11:
        case 10:
        case 9:
        case 8:
      }
      tmpBufferU16[pos] = 0xfffd; // fill with invalid replacement character
    }
    tmpStr += fromCharCode(
      tmpBufferU16[0],
      tmpBufferU16[1],
      tmpBufferU16[2],
      tmpBufferU16[3],
      tmpBufferU16[4],
      tmpBufferU16[5],
      tmpBufferU16[6],
      tmpBufferU16[7],
      tmpBufferU16[8],
      tmpBufferU16[9],
      tmpBufferU16[10],
      tmpBufferU16[11],
      tmpBufferU16[12],
      tmpBufferU16[13],
      tmpBufferU16[14],
      tmpBufferU16[15],
      tmpBufferU16[16],
      tmpBufferU16[17],
      tmpBufferU16[18],
      tmpBufferU16[19],
      tmpBufferU16[20],
      tmpBufferU16[21],
      tmpBufferU16[22],
      tmpBufferU16[23],
      tmpBufferU16[24],
      tmpBufferU16[25],
      tmpBufferU16[26],
      tmpBufferU16[27],
      tmpBufferU16[28],
      tmpBufferU16[29],
      tmpBufferU16[30],
      tmpBufferU16[31],
    );
    if (pos < 32) tmpStr = tmpStr.slice(0, (pos - 32) | 0); //-(32-pos));
    if (index < len) {
      //fromCharCode.apply(0, tmpBufferU16 : NativeUint8Array ?  tmpBufferU16.subarray(0,pos) : tmpBufferU16.slice(0,pos));
      tmpBufferU16[0] = tmp;
      pos = ~tmp >>> 31; //tmp !== -1 ? 1 : 0;
      tmp = -1;

      if (tmpStr.length < resultingString.length) continue;
    } else if (tmp !== -1) {
      tmpStr += fromCharCode(tmp);
    }

    resultingString += tmpStr;
    tmpStr = "";
  }

  return resultingString;
};

import { Injectable } from "@nestjs/common";
import * as pdfjs from "pdfjs-dist";
import mammoth from "mammoth";
import axios from "axios";
import fs from "fs";
// import * as textract from "textract";

type PDFSource = Buffer | string;

@Injectable()
export class ParserService {
  async extractTextFromPDF(source: PDFSource): Promise<string> {
    const doc = await pdfjs.getDocument(source).promise;
    let pageTexts = Array.from({ length: doc.numPages }, async (v, i) => {
      return (await (await doc.getPage(i + 1)).getTextContent()).items
        .map((token) => {
          if ("str" in token) {
            return token.str;
          } else {
            return "";
          }
        })
        .join("");
    });
    return (await Promise.all(pageTexts)).join("");
  }

  async extractTextFromDocx(url: string): Promise<string> {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "utf-8");
    const result = await mammoth.extractRawText({ buffer: buffer });
    return result.value;
  }

  async extractTextFromTxt(url: string): Promise<string> {
    const response = await fetch(url);
    return await response.text();
  }

  // async extractTextFromDoc(url: string): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     fetch(url).then(async (res) => {
  //       const buffer = await res.buffer();
  //       textract.fromBufferWithMime(
  //         "application/msword",
  //         buffer,
  //         (error, text) => {
  //           if (error) reject(error);
  //           else resolve(text);
  //         }
  //       );
  //     });
  //   });
  // }
}

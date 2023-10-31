import { Injectable } from "@nestjs/common";
import * as pdfjs from "pdfjs-dist";
import mammoth from "mammoth";
import axios from "axios";

import { MimeTypes } from "@/common/constants";
import { Parser } from "@/common/types";

@Injectable()
export class ParserService {

  private readonly parsers = {
    [MimeTypes.APPLICATION_PDF]: this.extractFromPDF,
    [MimeTypes.APPLICATION_DOCX]: this.extractFromDocx,
    [MimeTypes.APPLICATION_TXT]: this.extractFromTxt,
  };

  getParser(mimeType: string): Parser {
    return this.parsers[mimeType]
  }

  private async extractFromPDF(url: string): Promise<string> {
    const doc = await pdfjs.getDocument(url).promise;
    let pageTexts = Array.from({ length: doc.numPages }, async (_, i) => {
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

  private async extractFromDocx(url: string): Promise<string> {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "utf-8");
    const result = await mammoth.extractRawText({ buffer: buffer });
    return result.value;
  }

  private async extractFromTxt(url: string): Promise<string> {
    const response = await fetch(url);
    return await response.text();
  }
}

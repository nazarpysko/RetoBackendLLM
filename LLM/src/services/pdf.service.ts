import {
    DocumentAnalysisClient,
    AzureKeyCredential
  } from '@azure/ai-form-recognizer';
import fs from 'fs';
import path from 'path';
  
const endpoint = process.env.DOC_INTELLIGENCE_ENDPOINT!;
const apiKey = process.env.DOC_INTELLIGENCE_API_KEY!;

const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

const extractTextFromPDF = async (pdfPath: string): Promise<string[]> => {
    const date = getDateFromPdfName(pdfPath);
    if (!date) {
        console.log('No date found in pdf name');
        return [];
    }

    const filePath = path.resolve(pdfPath);
    const fileData = fs.readFileSync(filePath);

    const poller = await client.beginAnalyzeDocument("prebuilt-layout", fileData);
    const result = await poller.pollUntilDone();

    const fragments: string[] = [];

    if (result.pages) {
        result.pages.forEach((page: any) => {
            const lines = page.lines?.map((line: any) => line.content).join(' ') ?? '';
            fragments.push(lines);
        });
    }

    return fragments;
}

const getDateFromPdfName = (pdfName: string) => {
    const date = pdfName.match(/(\d{2}-\d{2}-\d{4})/);
    return date ? date[1] : null;
}

export { extractTextFromPDF, getDateFromPdfName };


  
import dotenv from 'dotenv';
dotenv.config();

import { extractTextFromPDF } from '../src/services/pdf.service';
import { uploadDocument } from '../src/services/search.service';
import fs from 'fs';

const usage = () => {
  console.log('❗ Usage: npm run upload-doc -- <relative/path/to/pdf>');
  process.exit(1);
};

// Extraer argumentos correctamente cuando se usa con npm run
const args = process.argv.slice(2);
const pdfPath = args[0];

(async () => {
    if (!pdfPath || !pdfPath.endsWith('.pdf') || !fs.existsSync(pdfPath)) {
        usage();
    }

    try {
        console.log(`📄 Reading PDF: ${pdfPath}`);
        const fragments = await extractTextFromPDF(pdfPath);

        if (!fragments.length) {
            console.log('⚠️ No fragments extracted. Aborting.');
            process.exit(1);
        }

        console.log(`📦 Extracted ${fragments.length} fragments. Uploading to Azure Search...`);
        await uploadDocument(fragments, pdfPath);
    } catch (error) {
        console.error('Error uploading document:', error);
        process.exit(-1);
    }

    console.log('✅ Upload complete!');
    process.exit(0);
})();

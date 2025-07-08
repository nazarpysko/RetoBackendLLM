import {
  SearchIndexClient,
  AzureKeyCredential,
  SearchClient,
  SearchIndex,
  SearchDocumentsResult,
} from '@azure/search-documents';
import { getDateFromPdfName } from './pdf.service';

const endpoint = process.env.AZURE_SEARCH_ENDPOINT!;
const apiKey = process.env.AZURE_SEARCH_API_KEY!;
const indexName = 'actas-index';

const adminClient = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
const searchClient = new SearchClient(endpoint, indexName, new AzureKeyCredential(apiKey));

const indexDefinition: SearchIndex = {
  name: indexName,
  fields: [
    { name: 'id', type: 'Edm.String', key: true },
    { name: 'actaId', type: 'Edm.String', filterable: true },
    { name: 'date', type: 'Edm.String', filterable: true },
    { name: 'chunk', type: 'Edm.String', searchable: true }
  ]  
};

const createIndexIfNotExists = async () => {
  const indexes = adminClient.listIndexes();
  const exists = (await indexes.next()).value?.name === indexName;
  if (!exists) {
    console.log(`Creating index: ${indexName}`);
    await adminClient.createIndex(indexDefinition);
  } else {
    console.log(`Index ${indexName} already exists.`);
  }
}

const uploadDocument = async (fragments: string[], pdfPath: string) => {
  if (fragments.length === 0) {
    console.log('No fragments to upload');
    return;
  }

  const actaId = pdfPath.split('/').pop()?.split('.')[0];

  if (!actaId) {
    console.log('No actaId provided');
    return;
  }


  const date = getDateFromPdfName(actaId);

  if (!date) {
    console.log('No date provided');
    return;
  }

  const chunks = fragments.map((fragment, index) => ({
    id: `${actaId}-${index}`,
    actaId: `${actaId}`,
    date: `${date}`,
    chunk: fragment
  }));
  
  try {
    await createIndexIfNotExists();
    const result = await searchClient.uploadDocuments(chunks);
    console.log('Upload result:', result);
  } catch (error) {
    console.error('Error uploading documents:', error);
  }
}

const search = async (query: string): Promise<any[]> => {
  const resultsArray: any[] = [];
  try {
    const results: SearchDocumentsResult<any> = await searchClient.search(query, {
      searchFields: ['chunk'],
      top: 5,
      queryType: 'semantic',
      semanticSearchOptions: {
        configurationName: 'MySemanticSearchConfig',
      },
      select: ['chunk'],
    });
    
    for await (const result of results.results) {
      resultsArray.push(result.document.chunk);
    }
    
    return resultsArray;
  } catch (error) {
    console.error('Error searching documents:', error);
    return [];
  }
}

export { createIndexIfNotExists, uploadDocument, search };

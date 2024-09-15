import { VoyageEmbeddings } from "@langchain/community/embeddings/voyage";

const embeddings = new VoyageEmbeddings({
  apiKey: "Your API Key", // In Node.js defaults to process.env.VOYAGEAI_API_KEY
  inputType: "query", // Optional: specify input type as 'query', 'document', or omit for None / Undefined / Null
});

export const embed = async (descriptionQuery: string) => {
  const embedding = await embeddings.embedQuery(descriptionQuery);
  return embedding;
};

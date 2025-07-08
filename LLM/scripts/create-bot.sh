#!/bin/bash

# Initial configuration
RESOURCE_GROUP="LLM-Challenge"
LOCATION="westeurope"

FORM_RECOGNIZER_NAME="docintelligence"
SEARCH_SERVICE_NAME="communitysearch-llm-challenge"
OPENAI_NAME="openaiassistant"

# Login
echo "🔐 Logging in to Azure..."
az login

# Create resource group
echo "📦 Creating resource group: $RESOURCE_GROUP in $LOCATION..."
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create Azure Document Intelligence (Form Recognizer)
echo "📄 Creating Azure Document Intelligence: $FORM_RECOGNIZER_NAME..."
az cognitiveservices account create \
  --name $FORM_RECOGNIZER_NAME \
  --resource-group $RESOURCE_GROUP \
  --kind FormRecognizer \
  --sku S0 \
  --location $LOCATION \
  --yes

# Create Azure AI Search
echo "🔎 Creating Azure AI Search: $SEARCH_SERVICE_NAME..."
az search service create \
  --name $SEARCH_SERVICE_NAME \
  --resource-group $RESOURCE_GROUP \
  --sku basic \
  --location $LOCATION

# Create Azure OpenAI (if access is approved)
echo "🤖 Creating Azure OpenAI: $OPENAI_NAME..."
az cognitiveservices account create \
  --name $OPENAI_NAME \
  --resource-group $RESOURCE_GROUP \
  --kind OpenAI \
  --sku S0 \
  --location $LOCATION \
  --yes

# Show results
echo ""
echo "✅ Resources created:"
echo "  - Resource Group: $RESOURCE_GROUP"
echo "  - Document Intelligence: $FORM_RECOGNIZER_NAME"
echo "  - AI Search: $SEARCH_SERVICE_NAME"
echo "  - Azure OpenAI: $OPENAI_NAME"
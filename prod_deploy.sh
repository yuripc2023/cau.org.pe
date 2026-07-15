#!/bin/bash
# el archivo se llama:
# deploy.sh

set -euo pipefail

declare -A sites=(
  ["cau.org.pe"]="s3://XXX|XXXXXX|XXXXX"
)

# Asegura que el script se ejecute siempre desde la raiz del proyecto
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_ROOT"

handle_error() {
  echo "Error: $1"
  exit 1
}

for site in "${!sites[@]}"; do
  echo "Desplegando sitio: $site"

  IFS='|' read -r s3_bucket access_key_id secret_access_key cloudfront_distribution_id <<< "${sites[$site]}"

  export AWS_ACCESS_KEY_ID="$access_key_id"
  export AWS_SECRET_ACCESS_KEY="$secret_access_key"
  export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-us-east-1}"

  echo "Bucket S3: $s3_bucket"
  echo "Region AWS: $AWS_DEFAULT_REGION"

  aws s3 cp "$PROJECT_ROOT/" "$s3_bucket" \
    --recursive \
    --acl public-read \
    --exclude ".git/*" \
    --exclude ".agents/*" \
    --exclude ".codex/*" \
    --exclude "deploy.sh" \
    --exclude "MAPEO-SITIO.md" \
    || handle_error "No se pudieron subir los archivos al bucket S3 para $site."

  cloudfront_distribution_id="${cloudfront_distribution_id:-${CLOUDFRONT_DISTRIBUTION_ID:-}}"
  if [ -n "$cloudfront_distribution_id" ]; then
    if aws cloudfront create-invalidation \
      --distribution-id "$cloudfront_distribution_id" \
      --paths "/*"; then
      echo "Invalidacion de CloudFront solicitada para $site."
    else
      echo "Advertencia: no se pudo invalidar CloudFront para $site. Los archivos ya fueron subidos a S3."
    fi
  else
    echo "CloudFront no fue invalidado porque no se configuro CLOUDFRONT_DISTRIBUTION_ID."
  fi

  echo "Despliegue para $site completado."
done

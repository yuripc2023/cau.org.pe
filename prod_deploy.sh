#!/bin/bash
# Uso: ./prod_deploy.sh (requiere una sesion AWS activa, por ejemplo: aws login).

set -euo pipefail

declare -A sites=(
  ["cau.org.pe"]="s3://cau.org.pe/|E63OM53ZBCO1W"
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

  IFS='|' read -r s3_bucket cloudfront_distribution_id <<< "${sites[$site]}"

  export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-us-east-1}"

  echo "Bucket S3: $s3_bucket"
  echo "Region AWS: $AWS_DEFAULT_REGION"

  aws s3 cp "$PROJECT_ROOT/" "$s3_bucket" \
    --recursive \
    --cache-control "max-age=0, must-revalidate" \
    --exclude "*" \
    --include "*.html" \
    --include "assets/*" \
    --include "robots.txt" \
    --include "sitemap.xml" \
    --exclude ".*" \
    --exclude "*/.*" \
    --no-progress \
    || handle_error "No se pudieron subir los archivos al bucket S3 para $site."

  cloudfront_distribution_id="${CLOUDFRONT_DISTRIBUTION_ID:-$cloudfront_distribution_id}"
  if [ -n "$cloudfront_distribution_id" ]; then
    if aws cloudfront create-invalidation \
      --distribution-id "$cloudfront_distribution_id" \
      --paths "/*"; then
      echo "Invalidacion de CloudFront solicitada para $site."
    else
      handle_error "Los archivos se subieron a S3, pero fallo la invalidacion de CloudFront para $site."
    fi
  else
    echo "CloudFront no fue invalidado porque no se configuro CLOUDFRONT_DISTRIBUTION_ID."
  fi

  echo "Despliegue para $site completado."
done

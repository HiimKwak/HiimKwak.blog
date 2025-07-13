#!/bin/bash

# .md 파일을 .mdx 파일로 변환하는 스크립트

set -e

echo "🔄 .md 파일들을 .mdx 파일로 변환합니다..."

# content 디렉토리에서 .md 파일들을 찾아서 .mdx로 변환 (template 디렉토리 제외)
find content -name "*.md" -type f -not -path "content/template/*" | while read -r file; do
    # .md 확장자를 .mdx로 변경
    new_file="${file%.md}.mdx"
    
    if [ -f "$new_file" ]; then
        echo "⏭️  $file (이미 .mdx 파일이 존재함 - 스킵)"
    else
        echo "✅ $file -> $new_file"
        mv "$file" "$new_file"
    fi
done

echo ""
echo "📊 변환 완료!"
echo "  - .md 파일들이 .mdx 파일로 변환되었습니다"
echo "" 
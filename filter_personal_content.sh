#!/bin/bash

# personal 속성에 따라 content를 필터링하는 스크립트
# personal: "0"인 파일들만 원격 리포지터리로 보내고, personal: "1"인 파일들은 로컬에만 유지

set -e

echo "🔍 personal 속성을 확인하여 content를 분류합니다..."

# 발행물 디렉토리 생성
PUBLISH_DIR="content_publish"
mkdir -p "$PUBLISH_DIR"

# personal: "0"인 파일들을 찾아서 발행물 디렉토리로 복사
echo "📁 personal: '0'인 파일들을 찾는 중..."
find content -name "*.mdx" -type f | while read -r file; do
    if grep -q 'personal: "0"' "$file"; then
        # content/ 부분을 제거하고 복사
        relative_path="${file#content/}"
        target_file="$PUBLISH_DIR/$relative_path"
        
        # 이미 존재하는 파일인지 확인
        if [ -f "$target_file" ]; then
            echo "⏭️  $file (이미 존재함 - 스킵)"
        else
            echo "✅ $file (public)"
            dir=$(dirname "$target_file")
            mkdir -p "$dir"
            cp "$file" "$target_file"
        fi
    elif grep -q 'personal: "1"' "$file"; then
        echo "🔒 $file (private - 로컬에만 유지)"
    else
        # personal 속성이 없는 파일들도 public으로 간주 (diary 폴더 등)
        relative_path="${file#content/}"
        target_file="$PUBLISH_DIR/$relative_path"
        
        # 이미 존재하는 파일인지 확인
        if [ -f "$target_file" ]; then
            echo "⏭️  $file (이미 존재함 - 스킵)"
        else
            echo "✅ $file (public - personal 속성 없음)"
            dir=$(dirname "$target_file")
            mkdir -p "$dir"
            cp "$file" "$target_file"
        fi
    fi
done

# 이미지 파일들도 복사 (public 파일들과 함께)
echo "🖼️  이미지 파일들을 복사하는 중..."
find content -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.webp" -o -name "*.mov" | while read -r file; do
    relative_path="${file#content/}"
    target_file="$PUBLISH_DIR/$relative_path"
    
    # 이미 존재하는 파일인지 확인
    if [ -f "$target_file" ]; then
        echo "⏭️  $file (이미지 - 이미 존재함 - 스킵)"
    else
        echo "🖼️  $file (이미지 복사)"
        dir=$(dirname "$target_file")
        mkdir -p "$dir"
        cp "$file" "$target_file"
    fi
done

echo ""
echo "📊 분류 결과:"
echo "  - 발행물: $PUBLISH_DIR"
echo "  - public 글들 (personal: '0' 또는 속성 없음)이 발행물 디렉토리에 복사되었습니다"
echo "  - private 파일들 (personal: '1')은 로컬에 그대로 유지됩니다"
echo ""
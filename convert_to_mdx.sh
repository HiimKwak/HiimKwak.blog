#!/bin/bash

# .md 파일을 .mdx 파일로 변환하고, 이미지 링크와 유튜브 링크를 변환하는 통합 스크립트

set -e

echo "🔄 콘텐츠 변환 작업을 시작합니다..."

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1단계: .md 파일을 .mdx 파일로 변환
echo " 1단계: .md 파일들을 .mdx 파일로 변환합니다..."

find content -name "*.md" -type f -not -path "content/template/*" | while read -r file; do
    # .md 확장자를 .mdx로 변경
    new_file="${file%.md}.mdx"
    
    if [ -f "$new_file" ]; then
        echo "  ⏭️  $file (이미 .mdx 파일이 존재함 - 스킵)"
    else
        echo "  ✅ $file -> $new_file"
        mv "$file" "$new_file"
    fi
done

echo ""

# 2단계: 콘텐츠 분류 및 content_publish로 복사
echo "📁 2단계: 콘텐츠를 분류하여 content_publish로 복사합니다..."

# 발행물 디렉토리 생성
PUBLISH_DIR="content_publish"
mkdir -p "$PUBLISH_DIR"

# personal: "0"인 파일들을 찾아서 발행물 디렉토리로 복사
echo "  🔍 personal: '0'인 파일들을 찾는 중..."
find content -name "*.mdx" -type f | while read -r file; do
    if grep -q 'personal: "0"' "$file"; then
        # content/ 부분을 제거하고 복사
        relative_path="${file#content/}"
        target_file="$PUBLISH_DIR/$relative_path"
        
        # 이미 존재하는 파일인지 확인
        if [ -f "$target_file" ]; then
            echo "    ⏭️  $file (이미 존재함 - 스킵)"
        else
            echo "    ✅ $file (public)"
            dir=$(dirname "$target_file")
            mkdir -p "$dir"
            cp "$file" "$target_file"
        fi
    elif grep -q 'personal: "1"' "$file"; then
        echo "    $file (private - 로컬에만 유지)"
    else
        # personal 속성이 없는 파일들도 public으로 간주 (diary 폴더 등)
        relative_path="${file#content/}"
        target_file="$PUBLISH_DIR/$relative_path"
        
        # 이미 존재하는 파일인지 확인
        if [ -f "$target_file" ]; then
            echo "    ⏭️  $file (이미 존재함 - 스킵)"
        else
            echo "    ✅ $file (public - personal 속성 없음)"
            dir=$(dirname "$target_file")
            mkdir -p "$dir"
            cp "$file" "$target_file"
        fi
    fi
done

echo ""

# 3단계: content_publish의 MDX 파일들에서 옵시디언 이미지 링크를 Next.js Image 컴포넌트로 변환
echo "️ 3단계: 옵시디언 이미지 링크를 Next.js Image 컴포넌트로 변환합니다..."

find content_publish -name "*.mdx" -type f | while read -r file; do
    echo "  처리 중: $file"
    
    # 변환 전 이미지 링크 개수 확인
    BEFORE_COUNT=$(grep -o '!\[\[[^]]*\]\]' "$file" 2>/dev/null | wc -l)
    
    if [ "$BEFORE_COUNT" -eq 0 ]; then
        echo "    ⏭️  변환할 이미지 링크가 없음"
        continue
    fi
    
    echo "    🔍 발견된 이미지 링크: $BEFORE_COUNT개"
    
    # 임시 파일 생성
    TEMP_FILE=$(mktemp)
    
    # 정규식을 사용하여 이미지 링크 변환
    # ![[public/images/notes/2025/07/28/1.png]] -> <Image src='/images/notes/2025/07/28/1.png' alt='' width={1000} height={1000} />
    sed -E 's/!\[\[public\/images\/([^]]+)\]\]/<Image src="\/images\/\1" alt="" width={1000} height={1000} \/>/g' "$file" > "$TEMP_FILE"
    
    # 변환 후 이미지 링크 개수 확인
    AFTER_COUNT=$(grep -o '!\[\[[^]]*\]\]' "$TEMP_FILE" 2>/dev/null | wc -l)
    
    if [ "$AFTER_COUNT" -eq 0 ]; then
        # 변환 성공 시 원본 파일 교체
        mv "$TEMP_FILE" "$file"
        echo -e "    ${GREEN}✅ 변환 완료! ($((BEFORE_COUNT - AFTER_COUNT))개 변환됨)${NC}"
    else
        echo -e "    ${RED}❌ 일부 이미지 링크가 변환되지 않음 (남은 개수: $AFTER_COUNT)${NC}"
        rm "$TEMP_FILE"
    fi
done

echo ""

# 4단계: content_publish의 MDX 파일들에서 유튜브 링크를 Youtube 컴포넌트로 변환
echo "📺 4단계: 유튜브 링크를 Youtube 컴포넌트로 변환합니다..."

# 모든 MDX 파일을 배열에 저장하여 누락 방지
MDX_FILES=()
while IFS= read -r -d '' file; do
    MDX_FILES+=("$file")
done < <(find content_publish -name "*.mdx" -type f -print0)

echo "  총 ${#MDX_FILES[@]}개의 MDX 파일을 처리합니다."

for file in "${MDX_FILES[@]}"; do
    echo "  처리 중: $file"
    
    # 임시 파일 생성
    TEMP_FILE=$(mktemp)
    
    # 1. 기존에 잘못 변환된 중복 Youtube 컴포넌트 정리
    perl -pe 's/<Youtube url="<Youtube url="([^"]+)"[^>]*>([^<]*)<\/Youtube>/<Youtube url="$1" caption="$2" \/>/g' "$file" > "$TEMP_FILE"
    
    # 2. 일반 유튜브 링크 변환: https://youtube.com/watch?v=... 또는 https://www.youtube.com/watch?v=... -> <Youtube url="..." />
    perl -i -pe 's/https:\/\/(www\.)?youtube\.com\/watch\?v=([^>\s]+)/<Youtube url="https:\/\/youtube.com\/watch?v=$2" \/>/g' "$TEMP_FILE"
    
    # 3. 일반 유튜브 단축 링크 변환: https://youtu.be/... -> <Youtube url="https://youtube.com/watch?v=..." />
    perl -i -pe 's/https:\/\/youtu\.be\/([^>\s]+)/<Youtube url="https:\/\/youtube.com\/watch?v=$1" \/>/g' "$TEMP_FILE"
    
    # 변환 전후 유튜브 링크 개수 확인 (www 포함/미포함 모두 체크)
    BEFORE_LINKS=$(grep -o 'https://[^>]*youtube\.com/watch\?v=[^>\s]*' "$file" 2>/dev/null | wc -l)
    BEFORE_SHORT_LINKS=$(grep -o 'https://youtu\.be/[^>\s]*' "$file" 2>/dev/null | wc -l)
    TOTAL_BEFORE=$((BEFORE_LINKS + BEFORE_SHORT_LINKS))
    
    # 변환 후 결과 확인
    YOUTUBE_COMPONENTS=$(grep -o '<Youtube url="[^"]*"' "$TEMP_FILE" 2>/dev/null | wc -l)
    REMAINING_LINKS=$(grep -o 'https://[^>]*youtube\.com/watch\?v=[^>\s]*' "$TEMP_FILE" 2>/dev/null | wc -l)
    REMAINING_SHORT_LINKS=$(grep -o 'https://youtu\.be/[^>\s]*' "$TEMP_FILE" 2>/dev/null | wc -l)
    TOTAL_REMAINING=$((REMAINING_LINKS + REMAINING_SHORT_LINKS))
    
    if [ "$TOTAL_BEFORE" -eq 0 ]; then
        echo "    ⏭️  변환할 유튜브 링크가 없음"
        rm "$TEMP_FILE"
    elif [ "$TOTAL_REMAINING" -eq 0 ]; then
        # 변환 성공 시 원본 파일 교체
        mv "$TEMP_FILE" "$file"
        echo -e "    ${GREEN}✅ 변환 완료! ($TOTAL_BEFORE개 유튜브 링크를 $YOUTUBE_COMPONENTS개 컴포넌트로 변환)${NC}"
    else
        echo -e "    ${RED}❌ 일부 유튜브 링크가 변환되지 않음 (남은 개수: $TOTAL_REMAINING)${NC}"
        rm "$TEMP_FILE"
    fi
done

echo ""
echo -e "${GREEN}📊 모든 변환 작업 완료!${NC}"
echo "  - .md 파일들이 .mdx 파일로 변환되었습니다"
echo "  - public 콘텐츠가 content_publish 디렉토리로 복사되었습니다"
echo "  - 옵시디언 이미지 링크가 Next.js Image 컴포넌트로 변환되었습니다"
echo "  - 유튜브 링크가 Youtube 컴포넌트로 변환되었습니다"
echo ""

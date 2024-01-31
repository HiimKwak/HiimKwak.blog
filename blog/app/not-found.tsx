import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>요청하신 페이지를 찾지 못했습니다.</p>
      <Link href='/'>홈으로 돌아가기</Link>
    </div>
  );
}

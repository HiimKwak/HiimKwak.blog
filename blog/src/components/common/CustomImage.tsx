import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

type CustomImage = {
  src: string | StaticImport;
  alt: string;
  height?: number;
  width?: number;
  caption?: string;
};

export default function CustomImage({
  src,
  alt,
  width = 700,
  height = 400,
  caption,
}: CustomImage) {
  return (
    <section className='flex flex-col items-center justify-center gap-4 my-4 not-prose'>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className='not-prose'
      />
      <div className='text-sm italic opacity-80'>{caption}</div>
    </section>
  );
}
// onClick => 이미지 확대 팝업
// alt 문구 캡션 기능 : ✅

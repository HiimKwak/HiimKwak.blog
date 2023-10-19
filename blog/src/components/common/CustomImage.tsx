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
  width = 350,
  height = 350,
  caption,
}: CustomImage) {
  return caption ? (
    <section className='flex flex-col items-center justify-center gap-4 my-4 not-prose'>
      <Image src={src} alt={alt} width={width} height={height} />
      <div className='text-sm italic opacity-80'>{caption}</div>
    </section>
  ) : (
    <Image src={src} alt={alt} width={width} height={height} />
  );
}
// onClick => 이미지 확대 팝업
// alt 문구 캡션 기능 : ✅

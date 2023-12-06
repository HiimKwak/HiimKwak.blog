import { ImageProps } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

interface CustomImage extends ImageProps {
  caption?: string;
}

export default function CustomImage({ caption, ...props }: CustomImage) {
  return (
    <div className='flex flex-col items-center justify-center gap-4 my-4 rounded-lg not-prose'>
      <Image {...props} className='not-prose' />
      <div className='text-sm italic opacity-80'>{caption}</div>
    </div>
  );
}
// TODO: onClick => 이미지 확대 팝업

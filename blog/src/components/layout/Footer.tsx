import pkg from '@/package.json';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='flex items-center justify-center h-10 text-neutral-400 dark:text-neutral-600'>
      Copyright {year} HiimKwak. @{pkg.version}
    </footer>
  );
}

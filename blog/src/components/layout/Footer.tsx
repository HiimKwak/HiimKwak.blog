export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex items-center justify-center">
      Copyright {year} HiimKwak.
    </footer>
  );
}

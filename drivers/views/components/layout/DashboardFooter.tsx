import Link from 'next/link';

const DashboardFooter = () => {
  return (
    <footer className="flex grow-0 flex-col items-center bg-black p-8 text-center">
      <Link href="/">
        <button>return to top</button>
      </Link>
    </footer>
  );
};
export default DashboardFooter;

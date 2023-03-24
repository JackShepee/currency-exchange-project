import useAxios from 'axios-hooks';
import CurrencyDisplay from './CurrencyDisplay';

function Header() {
  const [{ data, loading }] = useAxios({
    url: '/latest',
    params: { base: 'UAH', symbols: 'USD,EUR' },
  }, {
    autoCancel: false,
  });
  return (
    <>
      {loading && (
        <div className="mx-auto my-0 mt-5 flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-zinc-800 p-1.5 text-white sm:flex-row sm:items-center">
          {[1, 2].map((key) => (<CurrencyDisplay key={key} skeleton />))}
        </div>
      )}
      {!loading && (
        <div className="mx-auto my-0 mt-5 flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-zinc-800 p-1.5 text-white sm:flex-row sm:items-center">
          {Object.entries(data.rates).map(([key, value]) => (
            <CurrencyDisplay key={key} currency={key} price={value} />
          ))}
        </div>
      )}
    </>
  );
}

export default Header;

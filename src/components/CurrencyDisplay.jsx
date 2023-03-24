function CurrencyDisplay({ currency, price, skeleton }) {
  const symbolsMap = {
    USD: '$',
    EUR: '€',
  };
  return (
    <div className={`flex flex-wrap items-center p-1 text-white ${skeleton && 'animate-pulse'}`}>
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-700 p-1">{symbolsMap[currency]}</div>
      {skeleton ? (<div className="ml-3 h-2 w-20 rounded bg-zinc-700" />) : (
        <>
          <div className="ml-3">{currency}</div>
          <div className="ml-3">{Number.parseFloat(1 / price).toFixed(2)}</div>
        </>
      )}
    </div>
  );
}

export default CurrencyDisplay;

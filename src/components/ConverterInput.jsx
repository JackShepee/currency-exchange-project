const AVAILABLE_CURRENCIES = ['UAH', 'USD', 'EUR'];

function ConverterInput({
  onValueChange,
  onCurrencyChange,
  amountValue,
  codeValue,
  readOnly,
}) {
  return (
    <div className="flex text-lg text-white">
      <select
        onChange={onCurrencyChange}
        value={codeValue}
        className="h-14 rounded-l-lg bg-zinc-800 pl-2"
      >
        {AVAILABLE_CURRENCIES.map((curr) => (
          <option key={curr}>{curr}</option>
        ))}
      </select>
      <input
        type="number"
        onChange={onValueChange}
        value={amountValue}
        readOnly={readOnly}
        className="h-14 w-full rounded-r-lg bg-zinc-800 pl-2"
        placeholder="8.88"
      />
    </div>
  );
}

export default ConverterInput;

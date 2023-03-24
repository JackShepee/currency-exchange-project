import useAxios from 'axios-hooks';
import React, { useState } from 'react';
import ConverterInput from './ConverterInput';

function Converter() {
  const [converterValues, setConverterValues] = useState({
    from: { code: 'UAH', value: null },
    to: { code: 'EUR', value: null },
  });
  const [{ loading }, refetch] = useAxios(
    { url: '/convert' },
    { manual: true, autoCancel: true },
  );

  const swapCurrency = async () => {
    setConverterValues({
      from: { ...converterValues.to },
      to: { ...converterValues.from },
    });
  };

  const convertCurrency = async (params) => {
    let response = null;
    try {
      response = await refetch({ params });
    } catch (error) {
      console.log(error);
    }
    const newValue = { ...converterValues };
    newValue.to.value = response?.data.result || 0;
    setConverterValues(newValue);
  };

  const handleCurrencyChange = async (event, target) => {
    const newValue = { ...converterValues };
    if (
      event.target.value === converterValues.from.code
      || event.target.value === converterValues.to.code
    ) {
      swapCurrency();
    } else {
      newValue[target].code = event.target.value;
      await convertCurrency({
        from: converterValues.from.code,
        to: converterValues.to.code,
        [target]: event.target.value,
        amount: converterValues.from.value,
      });
    }
  };

  const handleValueChange = async (event) => {
    const newValue = { ...converterValues };
    newValue.from.value = event.target.value;
    await convertCurrency({
      from: converterValues.from.code,
      to: converterValues.to.code,
      amount: event.target.value,
    });
  };

  return (
    <div className="mt-5 w-full">
      <ConverterInput
        onCurrencyChange={(event) => handleCurrencyChange(event, 'from')}
        onValueChange={handleValueChange}
        amountValue={converterValues.from.value}
        codeValue={converterValues.from.code}
      />
      <button
        type="button"
        className={`my-2 flex ${loading && 'opacity-70'} rounded-lg bg-zinc-800 p-2 text-white`}
        onClick={swapCurrency}
        disabled={loading}
      >
        <div className="flex content-center items-center justify-center">
          <span>SWAP</span>
          {loading && (
          <div className="relative ml-3 h-3 w-3 transition-opacity">
            <span className="absolute block h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
            <span className="block h-3 w-3 rounded-full bg-sky-500" />
          </div>
          )}
        </div>
      </button>

      <ConverterInput
        onCurrencyChange={(event) => handleCurrencyChange(event, 'to')}
        onValueChange={handleValueChange}
        amountValue={converterValues.to.value}
        codeValue={converterValues.to.code}
        readOnly
      />
    </div>
  );
}

export default Converter;

import useAxios from 'axios-hooks';
import React, { useState } from 'react';
import ConverterInput from './ConverterInput';

function Converter() {
  const [converterValues, setConverterValues] = useState({
    from: { code: 'UAH', value: '' },
    to: { code: 'EUR', value: '' },
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
    if (params.from === converterValues.from.code) {
      newValue.to.value = response?.data.result || 0;
    } else {
      newValue.from.value = response?.data.result || 0;
    }
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

  const handleValueChange = async (event, target) => {
    const newValue = { ...converterValues };
    if (target === 'from') {
      newValue.from.value = event.target.value;
      await convertCurrency({
        from: converterValues.from.code,
        to: converterValues.to.code,
        amount: event.target.value,
      });
    } else {
      newValue.to.value = event.target.value;
      await convertCurrency({
        from: converterValues.to.code,
        to: converterValues.from.code,
        amount: event.target.value,
      });
    }
  };

  return (
    <div className="mt-5 w-full">
      <ConverterInput
        onCurrencyChange={(event) => handleCurrencyChange(event, 'from')}
        onValueChange={(event) => handleValueChange(event, 'from')}
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
        onValueChange={(event) => handleValueChange(event, 'to')}
        amountValue={converterValues.to.value}
        codeValue={converterValues.to.code}
      />
    </div>
  );
}

export default Converter;

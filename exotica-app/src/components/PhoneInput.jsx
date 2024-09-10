import React, { useState } from 'react';

const countries = [
  { code: '+1', name: 'United States' },
  { code: '+91', name: 'India' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+20', name: 'Egypt' },
  
];

function CustomPhoneInput({ value, onChange }) {
  const [countryCode, setCountryCode] = useState('+20');

  const handleCountryChange = (e) => {
    const newCountryCode = e.target.value;
    setCountryCode(newCountryCode);
    onChange(`${newCountryCode}${value.replace(countryCode, '')}`);
  };

  const handlePhoneChange = (e) => {
    const newPhoneNumber = e.target.value;
    onChange(`${countryCode}${newPhoneNumber.replace(countryCode, '')}`);
  };

  return (
    <div className="custom-phone-input">
      <div className="field">
        <label htmlFor="countryCode">Country Code</label>
        <select
          name="countryCode"
          value={countryCode}
          onChange={handleCountryChange}
          required
        >
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name} ({country.code})
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={value.replace(countryCode, '')}
          onChange={handlePhoneChange}
          required
        />
      </div>
    </div>
  );
}

export default CustomPhoneInput;

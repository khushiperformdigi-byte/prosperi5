import React, { useState, useEffect, useRef } from 'react';

export const COUNTRIES = [
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳', digits: 10, format: '98765-43210' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', digits: 10, format: '99999-99999' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', digits: 10, format: '99999-99999' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', digits: 10, format: '7123-456789' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪', digits: 9, format: '50-1234567' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬', digits: 8, format: '8123-4567' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', digits: 9, format: '51-2345678' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', digits: 9, format: '412-345678' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪', digits: 10, format: '151-23456789' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦', digits: 8, format: '3312-3456' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼', digits: 8, format: '9123-4567' },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲', digits: 8, format: '9123-4567' },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭', digits: 8, format: '3912-3456' },
  { code: 'NP', name: 'Nepal', dialCode: '+977', flag: '🇳🇵', digits: 10, format: '9801-234567' },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩', digits: 10, format: '1712-345678' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰', digits: 10, format: '300-1234567' },
  { code: 'LK', name: 'Sri Lanka', dialCode: '+94', flag: '🇱🇰', digits: 9, format: '71-2345678' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾', digits: 10, format: '12-3456789' },
];

export default function PhoneInput({
  value = '',
  onChange,
  countryCode = '+91',
  onCountryCodeChange,
  placeholder = '',
  required = true,
  className = '',
  id,
  name,
}) {
  const [selectedDialCode, setSelectedDialCode] = useState(countryCode || '+91');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (countryCode && countryCode !== selectedDialCode) {
      setSelectedDialCode(countryCode);
    }
  }, [countryCode]);

  // Click outside listener to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentCountry =
    COUNTRIES.find((c) => c.dialCode === selectedDialCode) || COUNTRIES[0];

  const maxDigits = currentCountry.digits || 10;

  const handleSelectCountry = (country) => {
    setSelectedDialCode(country.dialCode);
    setIsOpen(false);
    setSearchQuery('');
    if (onCountryCodeChange) {
      onCountryCodeChange(country.dialCode);
    }
    if (value && value.length > country.digits) {
      const trimmed = value.slice(0, country.digits);
      if (onChange) onChange(trimmed);
    }
  };

  const handlePhoneChange = (e) => {
    const rawDigits = e.target.value.replace(/\D/g, '');
    const limitedDigits = rawDigits.slice(0, maxDigits);
    if (onChange) {
      onChange(limitedDigits);
    }
  };

  const filteredCountries = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
    c.dialCode.includes(searchQuery.trim()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="flex items-center rounded-xl border border-[#EBE8EF] bg-white overflow-hidden focus-within:border-[#7C1FA8] focus-within:ring-1 focus-within:ring-[#7C1FA8] transition-all shadow-2xs">
        
        {/* Flag Trigger Button (Left Side) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#FAF8FC] hover:bg-[#F3EBF9] border-r border-[#EBE8EF] transition-colors cursor-pointer shrink-0 select-none"
          aria-label="Select Country"
        >
          <img
            src={`https://flagcdn.com/w40/${currentCountry.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w80/${currentCountry.code.toLowerCase()}.png 2x`}
            width="24"
            height="16"
            alt={currentCountry.name}
            className="w-6 h-4 object-cover rounded-xs border border-black/10 shadow-2xs shrink-0"
          />
          <svg
            className={`w-3 h-3 text-[#544F66] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dial Code Prefix + Phone Digits Input */}
        <div className="flex items-center flex-1 px-3 py-2">
          <span className="text-xs sm:text-sm font-extrabold text-[#1E1B2E] mr-2 shrink-0 select-none">
            {currentCountry.dialCode}
          </span>

          <input
            type="tel"
            id={id}
            name={name}
            required={required}
            value={value}
            onChange={handlePhoneChange}
            maxLength={maxDigits}
            pattern="[0-9]*"
            inputMode="numeric"
            placeholder={placeholder || currentCountry.format || '98765-43210'}
            className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#1E1B2E] placeholder-[#B5B1C2] focus:outline-none"
          />
        </div>
      </div>

      {/* Floating Searchable Country Picker Popup */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-full sm:w-80 bg-white rounded-2xl border border-[#EBE8EF] shadow-2xl p-2.5 z-[3000] animate-in fade-in zoom-in-95 duration-150">
          {/* Search Bar inside Popup */}
          <div className="relative mb-2">
            <svg
              className="w-4 h-4 text-[#8E8A9D] absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country..."
              className="w-full bg-[#FAF8FC] border border-[#EBE8EF] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#1E1B2E] placeholder-[#8E8A9D] focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all"
            />
          </div>

          {/* Scrollable Country Options List */}
          <div className="max-h-48 overflow-y-auto space-y-0.5 pr-1 divide-y divide-gray-50">
            {filteredCountries.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">No countries found</p>
            ) : (
              filteredCountries.map((c) => {
                const isSelected = currentCountry.code === c.code && currentCountry.dialCode === c.dialCode;
                return (
                  <button
                    key={`${c.code}-${c.dialCode}`}
                    type="button"
                    onClick={() => handleSelectCountry(c)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#FAF5FD] text-[#7C1FA8] font-bold'
                        : 'hover:bg-[#FAF8FC] text-[#1E1B2E]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w80/${c.code.toLowerCase()}.png 2x`}
                        width="24"
                        height="16"
                        alt={c.name}
                        className="w-6 h-4 object-cover rounded-xs border border-black/10 shadow-2xs shrink-0"
                      />
                      <div>
                        <p className="text-xs font-bold leading-tight">{c.name}</p>
                        <p className="text-[11px] text-[#8E8A9D] font-medium">{c.dialCode}</p>
                      </div>
                    </div>

                    {isSelected && (
                      <svg className="w-4 h-4 text-[#7C1FA8] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}


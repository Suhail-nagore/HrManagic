import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchInput({ value, onChange, placeholder = "Search...", className = "" }) {
  return (
    <div className="relative">

      {/* Icon */}
      <MagnifyingGlassIcon
        className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
      />

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded-md pl-9 pr-3 py-1 text-sm w-[220px]
        focus:outline-none focus:ring-2 focus:ring-gray-400 ${className}`}
      />

    </div>
  );
}

export default SearchInput;
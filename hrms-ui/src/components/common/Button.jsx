function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) {

  const baseStyle =
    "px-4 py-2 rounded-md text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border bg-white hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
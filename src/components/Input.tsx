import clsx from "clsx"
type InputProps<T> = {
  name: string;
  type?: string;
  onChange: React.ChangeEventHandler<T>;
  value: string | number;
  placeholder: string;
  error?: string;
  length: number;
};

export const Input: React.FC<InputProps<HTMLInputElement>> = ({
  name,
  onChange,
  placeholder,
  value,
  error,
  type = "text",
  length = 200,
}) => {
  return (
    <input
      autoComplete="off"
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      type={type}
      maxLength={length}

        className={clsx("p-2 border w-full h-12 bg-gray-50 rounded", {
        "border-red-500 border-2": error
    })}
    />
  );
};

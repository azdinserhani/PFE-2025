const InputField = ({ label, type, id, placeholder }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold text-[15px]">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="border border-gray-200 p-2 rounded-lg focus:border-purple-700 outline-none duration-300 pl-4"
      />
    </div>
  );
};

export default InputField;

import { forwardRef } from 'react'; 

const Input = forwardRef(
  (
    {
      type = "text",
      id,
      placeholder,
      variant,
      labelText,
      variantLabel,
      name,
      iconRight,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="">
        {labelText && (
          <label htmlFor={id} className={variantLabel}>
            {labelText}
          </label>
        )}

        <div className="relative">
          <input
            type={type}
            id={id}
            name={name} 
            placeholder={placeholder}
            className={`${variant} ${iconRight ? "pr-10" : "pr-4"}`} 
            ref={ref}
            {...rest} 
          />
          {iconRight && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {iconRight}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default Input;
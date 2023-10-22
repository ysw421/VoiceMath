import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export default function Button(
  props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) {
  const { disabled, className } = props;
  const alteredProps = { ...props };
  delete alteredProps.className;

  const defaultClasses =
    'tw-flex tw-min-w-fit tw-justify-center tw-items-center tw-px-3 tw-py-1 tw-h-11 tw-text-base tw-rounded-md tw-border-2 tw-text-opacity-50 hover:tw-text-opacity-100 hover:tw-border-4';

  const disabledClasses = disabled ? 'tw-opacity-50 tw-cursor-not-allowed' : '';

  return (
    <button
      {...alteredProps}
      className={`${defaultClasses} ${disabledClasses} ${className ?? ''}`}
    />
  );
}

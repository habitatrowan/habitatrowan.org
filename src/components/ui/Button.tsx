type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'accent'|'ghost' };
export function Button({ variant='primary', className='', ...rest }: Props) {
  const common = 'px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 hover:scale-[1.02] shadow-card';
  const variants = {
    primary: 'bg-brand-blue text-white hover:bg-[#00407e]',
    accent:  'bg-brand-green text-white hover:bg-[#3aa53e]',
    ghost:   'bg-white text-black hover:bg-gray-100 dark:bg-surface dark:text-app dark:hover:bg-[#151515]',
  } as const;
  return <button className={`${common} ${variants[variant]} ${className}`} {...rest} />;
}

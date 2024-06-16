interface Props {
  children: string;
}

export function Empty({ children }: Props) {
  return (
    <div className="text-center text-slate-300 dark:text-zinc-600">
      {children}
    </div>
  );
}

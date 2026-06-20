// Template-ul se remontează la fiecare navigare → declanșează animația de tranziție.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}

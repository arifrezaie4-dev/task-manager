export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <main>
        <h3>Auth layout</h3>
        {children}
      </main>
    );
  }
// page.tsx
import Base from "./base";

export default function Page() {
  return (
    <main className="min-h-dvh w-full p-4 sm:p-6 grid gap-6 lg:grid-cols-2">
      <Base
        title="Basic Store Info"
        subtitle="Let's start with the basics for your storefront"
        image="/image/login.jpg"
      />
    </main>
  );
}

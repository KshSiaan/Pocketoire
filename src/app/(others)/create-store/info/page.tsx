import Base from "./base";
export default function Page() {
  return (
    <main className="h-dvh w-dvw p-6 grid grid-cols-2 gap-6">
      <Base
        title={"Basic Store Info"}
        subtitle={"Let's start with the basics for your storefront"}
        image="/image/login.jpg"
      />
    </main>
  );
}

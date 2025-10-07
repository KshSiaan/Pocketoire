import Base from "./base";
export default function Page() {
  return (
    <main className="h-dvh w-dvw p-6 grid grid-cols-2 gap-6">
      <Base
        title={"Welcome Back!"}
        subtitle={"Please enter the below information to logged in."}
        image="/image/login.jpg"
      />
    </main>
  );
}

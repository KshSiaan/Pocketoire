import Base from "./base";
export default function Page() {
  return (
    <main className="h-dvh w-dvw p-6 bg-white flex justify-center items-center">
      <div className="w-1/2 h-fit bg-background p-6 shadow-lg rounded-2xl py-12">
        <Base
          title={"Verify your email address"}
          subtitle={"Enter the code sent to your email address"}
        />
      </div>
    </main>
  );
}

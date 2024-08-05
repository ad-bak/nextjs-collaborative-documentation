import AddDocumentBtn from "@/components/AddDocumentBtn";
import Header from "@/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

async function Home() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const documents = [];
  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          Notification
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      <div>
        {documents.length > 0 ? (
          <div></div>
        ) : (
          <div className="document-list-empty">
            <Image src="/assets/icons/doc.svg" width={40} height={40} alt="Document icon" className="mx-auto" />
            <AddDocumentBtn userId={user.id} email={user.emailAddresses[0].emailAddress} />
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;

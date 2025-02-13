import AddDocumentBtn from "@/components/AddDocumentBtn";
import { DeleteModal } from "@/components/DeleteModal";
import Header from "@/components/Header";
import Notifications from "@/components/Notifications";
import { getDocuments } from "@/lib/actions/room.actions";
import { dateConverter } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Home() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const roomDocuments = await getDocuments(user.emailAddresses[0].emailAddress);

  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      <div>
        {roomDocuments.data.length > 0 ? (
          <div className="document-list-container">
            <div className="document-list-title">
              <h3 className="text-28-semibold">All Documents</h3>
              <AddDocumentBtn userId={user.id} email={user.emailAddresses[0].emailAddress} />
            </div>
            <ul className="document-ul">
              {roomDocuments.data.map((document: any) => (
                <li key={document.id} className="document-list-item">
                  <Link href={`/documents/${document.id}`} className="flex flex-1 items-center gap-4">
                    <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                      <Image src="/assets/icons/doc.svg" width={40} height={40} alt="Document icon" />
                    </div>
                    <div className="space-y-1">
                      <p className="line-clmap-1 text-lg">{document.metadata.title}</p>
                      <p className="text-sm font-light text-blue-100">Created: {dateConverter(document.createdAt)}</p>
                    </div>
                  </Link>
                  <DeleteModal roomId={document.id} />
                </li>
              ))}
            </ul>
          </div>
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

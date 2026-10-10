"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      alert("লগ আউট করা যায়নি। আবার চেষ্টা করো।");
      return;
    }

    router.push("/sign-in");
    router.refresh();
  };

  return (
    <header className="flex items-center justify-between p-4">
      <Link href="/" className="flex items-center gap-2">
        <Image
          className="rounded-xl bg-green-600"
          src="/logo-icon.png"
          alt="বাজার দর লোগো"
          width={40}
          height={40}
        />

        <div className="flex flex-col">
          <h2>বাজার দর</h2>
          <p>{date}</p>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        {isPending ? (
          <p className="text-sm text-gray-500">লোড হচ্ছে...</p>
        ) : session?.user ? (
          <>
            <span className="hidden text-sm sm:inline">
              {session.user.name || session.user.email}
            </span>

            <Button
              onPress={handleSignOut}
              className="rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              লগ আউট
            </Button>
          </>
        ) : (
          <>
            <Link href="/sign-in">
              <Button className="rounded-xl border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition hover:border-green-500 hover:text-green-700">
                সাইন ইন
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button className="rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700">
                সাইন আপ
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;

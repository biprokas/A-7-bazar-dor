
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UpdateNameForm from "../components/profile/UpdateNameForm";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const user = session.user;

  return (
    <main className="min-h-[70vh] bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              আমার প্রোফাইল
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>
          </div>

          <form action="/api/auth/sign-out" method="POST">
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              লগ আউট
            </button>
          </form>
        </div>

        {/* Profile Information */}
        <section className="pt-6">
          <h2 className="mb-5 text-lg font-semibold text-gray-800">
            তথ্য
          </h2>

          <div className="mb-5">
            <p className="text-sm text-gray-500">নাম</p>
            <p className="mt-1 font-medium text-gray-900">
              {user.name || "নাম দেওয়া হয়নি"}
            </p>
          </div>

          <UpdateNameForm currentName={user.name || ""} />
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
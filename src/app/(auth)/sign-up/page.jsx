"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toastQueue } from "@/app/components/ui/AppToast";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingState, setLoadingState] = useState(null); // 'email' | 'google' | null

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const showError = (title, message) => {
    setErrorMessage(message);
    toastQueue.add({ title, description: message, variant: "default" });
  };

  const handleGoogleSignUp = async () => {
    setErrorMessage("");
    setLoadingState("google");

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      if (error)
        showError(
          "Google Sign Up ব্যর্থ",
          error.message || "Google দিয়ে সাইন আপ করা যায়নি।",
        );
    } catch {
      showError(
        "Google Sign Up ব্যর্থ",
        "Google দিয়ে সাইন আপ করা যায়নি। আবার চেষ্টা করো।",
      );
    } finally {
      setLoadingState(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (formData.password !== formData.confirmPassword) {
      return showError("পাসওয়ার্ড মিলছে না", "দুটি পাসওয়ার্ড মিলছে না।");
    }
    if (formData.password.length < 8) {
      return showError(
        "পাসওয়ার্ড সঠিক নয়",
        "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।",
      );
    }

    setLoadingState("email");

    try {
      const { error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        return showError(
          "সাইন আপ ব্যর্থ",
          error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করো।",
        );
      }

      toastQueue.add({
        title: "অ্যাকাউন্ট তৈরি সফল!",
        description: "বাজার দর-এ তোমাকে স্বাগতম।",
        variant: "default",
      });
      router.push("/");
      router.refresh();
    } catch {
      showError(
        "সাইন আপ ব্যর্থ",
        "অ্যাকাউন্ট তৈরি করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করো।",
      );
    } finally {
      setLoadingState(null);
    }
  };

  const isSubmitting = Boolean(loadingState);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            id="name"
            label="নাম"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="পুরো নাম"
            autoComplete="name"
            minLength={2}
          />
          <InputField
            id="email"
            label="ইমেইল"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
          />
          <InputField
            id="password"
            label="পাসওয়ার্ড"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="কমপক্ষে ৮ অক্ষর"
            autoComplete="new-password"
            minLength={8}
          />
          <InputField
            id="confirmPassword"
            label="পাসওয়ার্ড নিশ্চিত করো"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="আবার লিখুন"
            autoComplete="new-password"
          />

          {errorMessage && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingState === "email"
              ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
              : "অ্যাকাউন্ট তৈরি করুন"}
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingState === "google" ? (
              "Google-এর সঙ্গে সংযোগ হচ্ছে..."
            ) : (
              <>
                <GoogleIcon />
                Google দিয়ে সাইন আপ করুন
              </>
            )}
          </button>
        </form>

        <p className="mt-6 flex justify-center gap-2 text-center text-sm text-gray-600">
          অ্যাকাউন্ট আছে?
          <Link
            href="/sign-in"
            className="font-semibold text-green-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
}

// Sub-components to keep clean JSX
function InputField({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  minLength,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        minLength={minLength}
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
      />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.06 13.22l7.98 6.19C12.93 13.72 18.02 9.5 24 9.5Z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.43 38.04 46.98 31.88 46.98 24.55Z"
      />
      <path
        fill="#FBBC05"
        d="M10.04 28.59A14.4 14.4 0 0 1 9.27 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.58 10.78l7.46-6.19Z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.44-4.88 2.3-8.18 2.3-5.98 0-11.07-4.22-12.96-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48Z"
      />
    </svg>
  );
}

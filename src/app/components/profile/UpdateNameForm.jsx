"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Input } from "@heroui/react";

const UpdateNameForm = ({ currentName }) => {
  const [name, setName] = useState(currentName || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();

    setMessage("");
    setError("");

    if (!trimmedName) {
      setError("নাম খালি রাখা যাবে না।");
      return;
    }

    if (trimmedName === currentName) {
      setMessage("নামে কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        setError(error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      setName(trimmedName);
      setMessage("নাম সফলভাবে আপডেট হয়েছে!");

      // Navbar এবং profile-এর server-rendered তথ্য refresh করবে।
      window.location.reload();
    } catch {
      setError("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <Input
        label="তোমার নাম"
        value={name}
        onChange={(value) => setName(value.target ? value.target.value : value)}
        placeholder="নতুন নাম লিখো"
        required
      />

      {message && <p className="text-sm text-green-600">{message}</p>}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        Disabled={loading}
        className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white"
      >
        {loading ? "আপডেট হচ্ছে..." : "নাম আপডেট করো"}
      </Button>
    </form>
  );
};

export default UpdateNameForm;

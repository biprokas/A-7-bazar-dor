"use client";

import { Button } from "@heroui/react";
import { toastQueue } from "./AppToast";

export default function ToastTest() {
  return (
    <Button
      onPress={() => {
        toastQueue.add({
          title: "সফল হয়েছে!",
          description: "Bazar Dor Toast কাজ করছে।",
          variant: "default",
        });
      }}
    >
      Test Toast
    </Button>
  );
}

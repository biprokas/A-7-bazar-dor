"use client";

import { Toast, ToastQueue } from "@heroui/react";

export const toastQueue = new ToastQueue({
  maxVisibleToasts: 3,
});

export function AppToast() {
  return <Toast.Provider placement="top" queue={toastQueue} />;
}

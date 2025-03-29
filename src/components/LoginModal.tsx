import Link from "next/link";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";

export default function LoginModal({
  isOpen,
  toClose,
  action,
}: {
  isOpen: boolean;
  toClose: string;
  action: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center pointer-events-none">
      <div className="bg-background  rounded-lg shadow-lg max-w-sm w-full p-1 pointer-events-auto">
        <header className="flex flex-row justify-between">
          <div />
          <Button isIconOnly as={Link} href={toClose} variant="light" color="primary">
            <Icon icon="ic:round-close" fontSize={24} />
          </Button>
        </header>
        <div className="p-6">
          {action === "login" ? (
            <h1 className="text-2xl font-medium text-primary font-serif text-center">
              Welcome bact to <span className="font-brand font-bold">Inkwells.</span>
            </h1>
          ) : (
            <h1 className="text-2xl font-medium text-primary font-serif text-center">
              Join to <span className="font-brand font-bold">Inkwells.</span>
            </h1>
          )}

          <Button
            as={Link}
            href={toClose}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

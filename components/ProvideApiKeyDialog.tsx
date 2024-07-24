import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export function ProvideApiKeyDialog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const publicApiKey = searchParams.get("publicApiKey");
  const [apiKey, setApiKey] = useState((publicApiKey as string) || "");
  const [showDialog, setShowDialog] = useState(!apiKey);

  const renderTopBar = () => {
    if (!apiKey) {
      return null;
    }

    return (
      <div className="absolute top-0 bg-neutral-900 flex justify-center items-center text-sm font-medium text-neutral-100 h-10 w-full gap-x-2">
        <span>Copilot Cloud API key is set.</span>{" "}
        <Button
          variant="link"
          size="sm"
          className="mx-0 px-0 underline text-neutral-100"
          onClick={() => setShowDialog(true)}
        >
          Change
        </Button>
      </div>
    );
  };

  const handleSubmit = (publicApiKey: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("publicApiKey", publicApiKey);
    router.replace(url.toString());
    setShowDialog(false);
  };

  return (
    <>
      {renderTopBar()}
      <Dialog open={showDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Provide Copilot Cloud Public API key</DialogTitle>
            <DialogDescription>
              <span>Don{"'"}t have an API key?</span>{" "}
              <Button variant="link" size="sm" className="mx-0 px-0 underline">
                <Link
                  href="https://cloud.copilotkit.com/signup?ref=example-todos-app-provide-api-key"
                  target="_blank"
                >
                  Sign up for free
                </Link>
                .
              </Button>
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="ck_pub_..."
            />
            <Button
              disabled={apiKey === ""}
              type="submit"
              onClick={() => handleSubmit(apiKey)}
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

"use client";

import { ProvideApiKeyDialog } from "@/components/ProvideApiKeyDialog";
import { TasksList } from "@/components/TasksList";
import { TasksProvider } from "@/lib/hooks/use-tasks";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const publicApiKey = searchParams.get("publicApiKey");

  return (
    <>
      <ProvideApiKeyDialog />
      <CopilotKit publicApiKey={(publicApiKey as string) || "undefined"}>
        <TasksProvider>
          <TasksList />
        </TasksProvider>
        <CopilotPopup />
      </CopilotKit>
    </>
  );
}

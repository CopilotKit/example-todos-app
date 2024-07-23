"use client";

import { TasksList } from "@/components/TasksList";
import { TasksProvider } from "@/lib/hooks/use-tasks";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function Home() {
  return (
    <CopilotKit
      showDevConsole={false}
      publicApiKey="ck_pub_2dd3dbae0941c54d73536cec77f47b5a"
    >
      <CopilotSidebar
        labels={{
          title: "Todos Copilot",
          initial: "Hi! 👋 I'm here to help you get stuff done.",
        }}
        defaultOpen={true}
        clickOutsideToClose={false}
      >
        <TasksProvider>
          <TasksList />
        </TasksProvider>
      </CopilotSidebar>
    </CopilotKit>
  );
}
